create table public.following (
  id uuid not null,
  following_id uuid not null references auth.users on delete cascade,
  followed_id uuid not null references auth.users on delete cascade,

  primary key (id)
);