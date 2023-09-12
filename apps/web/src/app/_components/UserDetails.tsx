import dayjs from 'dayjs';

interface UserDetailsProps {
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  name: string;
}

function UserDetails(props: UserDetailsProps) {
  const { avatar_url, date_of_birth, name } = props;
  const age = dayjs().diff(date_of_birth, 'year');

  return (
    <div className="user-details">
      {avatar_url && (
        <figure className="user-details__avatar">
          <img src={avatar_url} alt={name} width="128" height="128" />
        </figure>
      )}
      <h1 className="user-details__name">{[name, age].filter(Boolean).join(', ')}</h1>
    </div>
  );
}

export type { UserDetailsProps };
export default UserDetails;
