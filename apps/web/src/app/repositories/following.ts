import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../../../packages/supabase/database.types';

async function followUserById(
  supabase: SupabaseClient<Database>,
  followingId: string,
  followedId: string,
) {
  await supabase.from('following').insert({
    following_id: followingId,
    followed_id: followedId,
  });
}

async function getFollowing(
  supabase: SupabaseClient<Database>,
  followingId: string,
  followedId: string,
) {
  const { data: following } = await supabase
    .from('following')
    .select('*')
    .match({
      following_id: followingId,
      followed_id: followedId,
    })
    .single();

  return following;
}

async function getFollowingsAndCountById(supabase: SupabaseClient<Database>, userId: string) {
  const { data: followings, count } = await supabase
    .from('following')
    .select('followed_id (id, name)', {
      count: 'exact',
    })
    .eq('following_id', userId);

  return {
    followings: followings as unknown as { followed_id: { id: string; name: string } }[],
    count,
  };
}

async function getFollowersAndCountById(supabase: SupabaseClient<Database>, userId: string) {
  const { data: followers, count } = await supabase
    .from('following')
    .select('following_id (id, name)', {
      count: 'exact',
    })
    .eq('followed_id', userId);

  return {
    followers: followers as unknown as { following_id: { id: string; name: string } }[],
    count,
  };
}

async function unfollowUserById(
  supabase: SupabaseClient<Database>,
  followingId: string,
  followedId: string,
) {
  await supabase.from('following').delete().match({
    following_id: followingId,
    followed_id: followedId,
  });
}

export {
  followUserById,
  getFollowing,
  getFollowersAndCountById,
  getFollowingsAndCountById,
  unfollowUserById,
};
