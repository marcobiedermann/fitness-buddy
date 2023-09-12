import User from './User';
import type { UserProps } from './User';

interface UsersProps {
  users: UserProps[];
}

function Users(props: UsersProps) {
  const { users } = props;

  return (
    <ul className="users">
      {users.map((user) => {
        const { id } = user;

        return (
          <li key={id}>
            <User {...user} />
          </li>
        );
      })}
    </ul>
  );
}

export type { UsersProps };
export default Users;
