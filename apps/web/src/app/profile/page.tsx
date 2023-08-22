import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function Profile() {
  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('users').select().eq('id', user!.id).single();

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <p>
        <Link href="/profile/edit">Edit profile</Link>
      </p>
    </div>
  );
}

export default Profile;
