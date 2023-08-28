'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { Database } from '../../../../../packages/supabase/database.types';

const supabaseClient = createClientComponentClient<Database>();

function Auth() {
  return (
    <SupabaseAuth
      onlyThirdPartyProviders
      providers={['github', 'twitter']}
      redirectTo={`${window.location.origin}/auth/callback`}
      supabaseClient={supabaseClient}
    />
  );
}

export default Auth;
