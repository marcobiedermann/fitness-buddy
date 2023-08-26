import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Database } from '../../../../../../packages/supabase/database.types';
import User from '../../_components/User';

export const dynamic = 'force-dynamic';

interface UserPageProps {
  params: {
    userId: string;
  };
}

async function UserPage(props: UserPageProps) {
  const {
    params: { userId },
  } = props;
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const { data: user } = await supabase.from('users').select().eq('id', userId).single();

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>User</h1>
      <User {...user} />
    </div>
  );
}

export default UserPage;
