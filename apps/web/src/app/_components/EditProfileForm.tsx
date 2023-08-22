'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formDataSchema = z.object({
  name: z.string(),
});

type FormData = z.infer<typeof formDataSchema>;

interface EditProfileFormProps {
  defaultValues: FormData;
}

function EditProfileForm(props: EditProfileFormProps): JSX.Element {
  const { defaultValues } = props;
  const supabase = createClientComponentClient();
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues,
  });

  async function onSubmit(data: FormData) {
    const { name } = data;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase
      .from('users')
      .update({
        name,
      })
      .eq('id', user!.id);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" {...register('name')} />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export type { FormData };
export default EditProfileForm;
