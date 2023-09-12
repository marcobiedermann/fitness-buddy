import Link from 'next/link';

interface UserProps {
  id: string;
  name: string | null;
}

function User(props: UserProps) {
  const { id, name } = props;

  return (
    <div className="user">
      <h3>
        <Link href={`/users/${id}`}>{name}</Link>
      </h3>
    </div>
  );
}

export type { UserProps };
export default User;
