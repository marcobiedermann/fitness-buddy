import dayjs from 'dayjs';

interface UserDetailsProps {
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  name: string;
}

function UserDetails(props: UserDetailsProps) {
  const { avatar_url, date_of_birth, gender, name } = props;

  return (
    <div>
      <ul>
        <li>Name: {name}</li>
        {avatar_url && (
          <li>
            <img src={avatar_url} alt={name} width="64" />
          </li>
        )}
        {gender && <li>Gender: {gender}</li>}
        {date_of_birth && <li>Age: {dayjs().diff(date_of_birth, 'year')}</li>}
      </ul>
    </div>
  );
}

export type { UserDetailsProps };
export default UserDetails;
