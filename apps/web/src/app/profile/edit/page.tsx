import { getAuthUser, updateUserById, getUserById, deleteUserById } from '@/app/repositories/user';
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

const deleteUserFormDataSchema = z.object({
  userId: z.string(),
});

async function deleteUser(data: FormData) {
  'use server';

  const { userId } = deleteUserFormDataSchema.parse(Object.fromEntries(data.entries()));
  const supabase = createServerActionClient<Database>({
    cookies,
  });

  await deleteUserById(supabase, userId);
  await supabase.auth.signOut();

  redirect('/');
}

const updateUserFormDataSchema = z.object({
  dateOfBirth: z.string(),
  gender: z.string(),
  name: z.string(),
  userId: z.string(),
});

async function updateUser(data: FormData) {
  'use server';

  const { dateOfBirth, gender, name, userId } = updateUserFormDataSchema.parse(
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
  const authUser = await getAuthUser(supabase);

  if (!authUser) {
    return redirect('/login');
  }

  const user = await getUserById(supabase, authUser.id);

  if (!user) {
    return redirect('/');
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <form action={updateUser} className="form">
        <input type="hidden" name="userId" value={user.id} />
        <div className="form__field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={user.name}
            className="form__input"
          />
        </div>
        <div>
          <fieldset>
            <legend>Gender</legend>
            <div className="form__fields">
              <div className="form__field">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  defaultChecked={user.gender === 'male'}
                />
              </div>
              <div className="form__field">
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  defaultChecked={user.gender === 'female'}
                />
              </div>
              <div className="form__field">
                <label htmlFor="other">Other</label>
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  defaultChecked={user.gender === 'other'}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="form__field">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            {...(user.date_of_birth && {
              defaultValue: user.date_of_birth,
            })}
            className="form__input"
          />
        </div>
        <div>
          <button type="submit" className="button button--primary">
            Save
          </button>
        </div>
      </form>

      <form action={deleteUser}>
        <input type="hidden" name="userId" value={user.id} />
        <button type="submit">Delete Profile</button>
      </form>
      <p>
        <Link href="..">back</Link>
      </p>
    </div>
  );
}

export default EditProfilePage;
