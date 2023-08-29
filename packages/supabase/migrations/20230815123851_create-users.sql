create table public.users (
  id uuid not null references auth.users on delete cascade,
  name varchar not null,
  avatar_url text,
  date_of_birth date,
  gender varchar,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  primary key (id)
);

alter table public.users enable row level security;

create policy "Public users are viewable by everyone."
  on users for select
  using ( true );

create policy "Users can insert their own data."
  on users for insert
  with check ( auth.uid() = id );

create policy "Users can update own data."
  on users for update
  using ( auth.uid() = id );

-- inserts a row into public.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger handle_users_updated_at before update on users
  for each row execute procedure moddatetime (updated_at);
