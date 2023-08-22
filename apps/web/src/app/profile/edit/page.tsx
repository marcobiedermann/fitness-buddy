import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import EditProfileForm from '../../_components/EditProfileForm';

export const dynamic = 'force-dynamic';

async function EditProfilePage() {
  const supabase = createServerComponentClient({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('users').select().eq('id', user!.id).single();

  return (
    <div>
      <h1>Edit Profile</h1>
      <EditProfileForm
        defaultValues={{
          name: profile.name,
        }}
      />
      <p>
        <Link href="..">back</Link>
      </p>
    </div>
  );
}

export default EditProfilePage;
