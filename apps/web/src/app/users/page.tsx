import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function UsersPage() {
  const supabase = createServerComponentClient({
    cookies,
  });
  const { data: users } = await supabase.from('users').select();

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default UsersPage;
