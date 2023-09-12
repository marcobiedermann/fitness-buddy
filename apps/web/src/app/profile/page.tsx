import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Database } from '../../../../../packages/supabase/database.types';
import UserDetails from '../_components/UserDetails';
import { getAuthUser, getUserById } from '../repositories/user';

export const dynamic = 'force-dynamic';

async function Profile() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const authUser = await getAuthUser(supabase);

  if (!authUser) {
    redirect('/login');
  }

  const user = await getUserById(supabase, authUser.id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <UserDetails {...user} />
      <p>
        <Link href="/profile/edit">Edit profile</Link>
      </p>
    </div>
  );
}

export default Profile;
