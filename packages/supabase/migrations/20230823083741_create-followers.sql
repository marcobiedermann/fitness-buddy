create table public.following (
  following_id uuid not null references users on delete cascade,
  followed_id uuid not null references users on delete cascade,
  created_at timestamp with time zone not null default now(),

  unique (following_id, followed_id)
);

create policy "Public following are viewable by everyone."
  on following for select
  using ( true );

create policy "Users can follow"
  on following for insert
  with check ( auth.uid() = following_id );

create policy "Users can unfollow"
  on following for delete
  using ( auth.uid() = following_id );

create trigger handle_following_updated_at before update on following
  for each row execute procedure moddatetime (updated_at);
