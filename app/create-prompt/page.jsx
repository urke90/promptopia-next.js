'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// components
import Form from '@components/Form';

const CreatePrompt = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();
    setisSubmitting(true);

    try {
      const response = await fetch('/api/prompt/create', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log('Error creating prompt', error);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      handleSubmit={createPrompt}
      isSubmitting={isSubmitting}
    />
  );
};

export default CreatePrompt;
