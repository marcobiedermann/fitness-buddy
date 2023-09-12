import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../../../packages/supabase/database.types';

async function getAuthUser(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

async function getUsers(
  supabase: SupabaseClient<Database>,
  where: { gender?: string } = {},
  props: { limit?: number } = {},
) {
  const { gender } = where;
  const { limit = 20 } = props;

  const query = supabase.from('users').select();

  if (gender !== 'all') {
    query.eq('gender', gender);
  }

  const { data: users } = await query.limit(limit);

  return users;
}

async function deleteUserById(supabase: SupabaseClient<Database>, userId: string) {
  await supabase.from('users').delete().eq('id', userId);
}

async function getUserById(supabase: SupabaseClient<Database>, userId: string) {
  const { data: user } = await supabase.from('users').select().eq('id', userId).single();

  return user;
}

async function updateUserById(
  supabase: SupabaseClient<Database>,
  userId: string,
  props: {
    dateOfBirth: string;
    gender: string;
    name: string;
  },
) {
  const { dateOfBirth, gender, name } = props;

  await supabase
    .from('users')
    .update({
      date_of_birth: dateOfBirth,
      gender,
      name,
    })
    .eq('id', userId);
}

export { getAuthUser, getUsers, deleteUserById, getUserById, updateUserById };
