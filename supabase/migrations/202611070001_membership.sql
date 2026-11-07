-- Private billing linkage. Passwords and refresh tokens are owned by Supabase Auth.
create table if not exists public.membership_customers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text not null unique,
  created_at timestamptz not null default now()
);
alter table public.membership_customers enable row level security;
revoke all on public.membership_customers from anon, authenticated;
grant all on public.membership_customers to service_role;

create table if not exists public.membership_request_limits (
  user_id uuid not null references auth.users(id) on delete cascade,
  bucket bigint not null,
  requests integer not null default 1,
  primary key(user_id,bucket)
);
alter table public.membership_request_limits enable row level security;
revoke all on public.membership_request_limits from anon, authenticated;
grant all on public.membership_request_limits to service_role;
create index if not exists membership_limits_bucket on public.membership_request_limits(bucket);
create or replace function public.consume_membership_request(p_user_id uuid)
returns boolean language plpgsql security invoker set search_path=public as $$
declare current_bucket bigint := floor(extract(epoch from clock_timestamp())/60); used integer;
begin
  delete from public.membership_request_limits where bucket<current_bucket-1440;
  insert into public.membership_request_limits(user_id,bucket,requests) values(p_user_id,current_bucket,1)
  on conflict(user_id,bucket) do update set requests=membership_request_limits.requests+1
  returning requests into used;
  return used<=60;
end;
$$;
revoke all on function public.consume_membership_request(uuid) from public, anon, authenticated;
grant execute on function public.consume_membership_request(uuid) to service_role;
