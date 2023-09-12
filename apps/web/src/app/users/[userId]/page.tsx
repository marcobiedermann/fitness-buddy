import { getAuthUser, getUserById } from '@/app/repositories/user';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';
import { Database } from '../../../../../../packages/supabase/database.types';
import UserDetails from '../../_components/UserDetails';
import {
  followUserById,
  getFollowersAndCountById,
  getFollowing,
  getFollowingsAndCountById,
  unfollowUserById,
} from '../../repositories/following';

export const dynamic = 'force-dynamic';

const formDataSchema = z.object({
  followingId: z.string(),
  followedId: z.string(),
});

async function follow(data: FormData) {
  'use server';

  const { followingId, followedId } = formDataSchema.parse(Object.fromEntries(data.entries()));
  const supabase = createServerActionClient<Database>({
    cookies,
  });

  await followUserById(supabase, followingId, followedId);

  redirect(`/users/${followedId}`);
}

async function unfollow(data: FormData) {
  'use server';

  const { followingId, followedId } = formDataSchema.parse(Object.fromEntries(data.entries()));
  const supabase = createServerActionClient<Database>({
    cookies,
  });

  await unfollowUserById(supabase, followingId, followedId);

  redirect(`/users/${followedId}`);
}

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
  const authUser = await getAuthUser(supabase);

  if (!authUser) {
    redirect('/login');
  }

  const [
    user,
    { followings, count: followingsCount },
    { followers, count: followersCount },
    following,
  ] = await Promise.all([
    getUserById(supabase, userId),
    getFollowingsAndCountById(supabase, userId),
    getFollowersAndCountById(supabase, userId),
    getFollowing(supabase, authUser.id, userId),
  ]);

  if (!user) {
    notFound();
  }

  const isOwnProfile = userId === authUser.id;
  const isFollowing = following !== null;

  return (
    <div>
      <UserDetails {...user} />
      {!isOwnProfile && (
        <div>
          {isFollowing ? (
            <form action={unfollow}>
              <input type="hidden" name="followingId" value={authUser.id} />
              <input type="hidden" name="followedId" value={userId} />
              <button type="submit" className="button button--secondary">
                Unfollow
              </button>
            </form>
          ) : (
            <form action={follow}>
              <input type="hidden" name="followingId" value={authUser.id} />
              <input type="hidden" name="followedId" value={userId} />
              <button type="submit" className="button button--primary">
                Follow
              </button>
            </form>
          )}
        </div>
      )}

      {followings && (
        <>
          <h3>
            <strong>{followingsCount}</strong> Following
          </h3>
          <ul>
            {followings.map((following) => {
              const { name, id } = following.followed_id;

              return (
                <li key={id}>
                  <Link href={`/users/${id}`}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {followers && (
        <>
          <h3>
            <strong>{followersCount}</strong> Followers
          </h3>
          <ul>
            {followers.map((follower) => {
              const { name, id } = follower.following_id;

              return (
                <li key={id}>
                  <Link href={`/users/${id}`}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default UserPage;
