'use client';

import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseClient = createClientComponentClient();

function Auth() {
  return (
    <SupabaseAuth
      onlyThirdPartyProviders
      providers={['github']}
      supabaseClient={supabaseClient}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}

export default Auth;
