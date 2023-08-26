import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Database } from '../../../../../../packages/supabase/database.types';

export const dynamic = 'force-dynamic';

const formDataSchema = z.object({
  name: z.string(),
});

async function updateUser(data: FormData) {
  'use server';

  const { name } = formDataSchema.parse(Object.fromEntries(data.entries()));
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  await supabase
    .from('users')
    .update({
      name,
    })
    .eq('id', user!.id);

  redirect('/profile');
}

async function EditProfilePage() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: profile } = await supabase.from('users').select().eq('id', user.id).single();

  if (!profile) {
    return redirect('/');
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form action={updateUser}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" defaultValue={profile.name} />
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
