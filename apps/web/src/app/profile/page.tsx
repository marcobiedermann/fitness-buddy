import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function Profile() {
  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profiles } = await supabase.from('users').select().eq('id', user!.id);
  const profile = profiles?.at(0);

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}

export default Profile;
