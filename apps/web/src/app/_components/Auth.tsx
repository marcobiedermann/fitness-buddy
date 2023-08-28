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
      redirectTo={process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL}
      supabaseClient={supabaseClient}
    />
  );
}

export default Auth;
