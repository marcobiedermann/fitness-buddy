import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Database } from '../../../../../packages/supabase/database.types';
import { notFound, redirect } from 'next/navigation';
import User from '../_components/User';

export const dynamic = 'force-dynamic';

async function Profile() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase.from('users').select().eq('id', user!.id).single();

  if (!profile) {
    notFound();
  }

  return (
    <div>
      <h1>Profile</h1>
      <User {...profile} />
      <p>
        <Link href="/profile/edit">Edit profile</Link>
      </p>
    </div>
  );
}

export default Profile;
