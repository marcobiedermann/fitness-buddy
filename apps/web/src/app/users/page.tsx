import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Database } from '../../../../../packages/supabase/database.types';
import Users from '../_components/Users';
import { getUsers } from '../repositories/user';

export const dynamic = 'force-dynamic';

const formDataSchema = z.object({
  gender: z.string().optional(),
});

type FormData = z.infer<typeof formDataSchema>;
interface UsersPageProps {
  searchParams: FormData;
}

async function UsersPage(props: UsersPageProps) {
  const { gender = 'all' } = formDataSchema.parse(props.searchParams);
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const users = await getUsers(supabase, {
    gender,
  });

  if (!users) {
    redirect('/');
  }

  return (
    <div>
      <h1>Community</h1>
      <form method="GET" className="form">
        <fieldset>
          <legend>Gender</legend>
          <div className="form__fields">
            <div className="form__field">
              <label htmlFor="all">All</label>
              <input
                type="radio"
                id="all"
                value="all"
                name="gender"
                defaultChecked={gender === 'all'}
              />
            </div>
            <div className="form__field">
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                defaultChecked={gender === 'male'}
              />
            </div>
            <div className="form__field">
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                defaultChecked={gender === 'female'}
              />
            </div>
            <div className="form__field">
              <label htmlFor="other">Other</label>
              <input
                type="radio"
                id="other"
                value="other"
                name="gender"
                defaultChecked={gender === 'other'}
              />
            </div>
          </div>
        </fieldset>
        <div>
          <button type="submit" className="button button--secondary">
            Filter
          </button>
        </div>
      </form>
      <Users users={users} />
    </div>
  );
}

export default UsersPage;
