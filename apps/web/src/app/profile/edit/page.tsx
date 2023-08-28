import { getAuthUser, getProfileById, updateUserById } from '@/app/repositories/user';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Database } from '../../../../../../packages/supabase/database.types';

export const dynamic = 'force-dynamic';

const formDataSchema = z.object({
  name: z.string(),
  userId: z.string(),
});

async function updateUser(data: FormData) {
  'use server';

  const { name, userId } = formDataSchema.parse(Object.fromEntries(data.entries()));
  const supabase = createServerActionClient<Database>({
    cookies,
  });

  await updateUserById(supabase, userId, {
    name,
  });

  redirect('/profile');
}

async function EditProfilePage() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const user = await getAuthUser(supabase);

  if (!user) {
    return redirect('/login');
  }

  const profile = await getProfileById(supabase, user.id);

  if (!profile) {
    return redirect('/');
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form action={updateUser}>
        <input type="hidden" name="userId" value={user.id} />
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" defaultValue={profile.name!} />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
      <p>
        <Link href="..">back</Link>
      </p>
    </div>
  );
}

export default EditProfilePage;
