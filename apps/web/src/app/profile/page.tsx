import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Database } from '../../../../../packages/supabase/database.types';
import { getAuthUser, getProfileById } from '../repositories/user';

export const dynamic = 'force-dynamic';

async function Profile() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const user = await getAuthUser(supabase);

  if (!user) {
    redirect('/login');
  }

  const profile = await getProfileById(supabase, user.id);

  if (!profile) {
    notFound();
  }

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <ul>
          <li>Name: {profile.name}</li>
          <li>Gender: {profile.gender}</li>
        </ul>
      </div>
      <p>
        <Link href="/profile/edit">Edit profile</Link>
      </p>
    </div>
  );
}

export default Profile;
