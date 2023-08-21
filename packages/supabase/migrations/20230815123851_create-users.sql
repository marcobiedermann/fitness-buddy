create table public.users (
  id uuid not null references auth.users on delete cascade,
  name varchar,

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
  insert into public.users (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
