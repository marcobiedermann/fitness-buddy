declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_AUTH_CALLBACK_URL: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_API_MOCKING: boolean;
  }
}
