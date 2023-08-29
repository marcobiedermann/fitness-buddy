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
  dateOfBirth: z.string(),
  gender: z.string(),
  name: z.string(),
  userId: z.string(),
});

async function updateUser(data: FormData) {
  'use server';

  const { dateOfBirth, gender, name, userId } = formDataSchema.parse(
    Object.fromEntries(data.entries()),
  );
  const supabase = createServerActionClient<Database>({
    cookies,
  });

  await updateUserById(supabase, userId, {
    dateOfBirth,
    gender,
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
          <input type="text" id="name" name="name" defaultValue={profile.name} />
        </div>
        <div>
          <fieldset>
            <legend>Gender</legend>
            <div>
              <div>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  defaultChecked={profile.gender === 'male'}
                />
              </div>
              <div>
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  defaultChecked={profile.gender === 'female'}
                />
              </div>
              <div>
                <label htmlFor="other">Other</label>
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  defaultChecked={profile.gender === 'other'}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            {...(profile.date_of_birth && {
              defaultValue: profile.date_of_birth,
            })}
          />
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
