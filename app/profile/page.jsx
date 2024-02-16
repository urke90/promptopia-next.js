'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// components
import Profile from '@components/Profile';

// ----------------------------------------------------------------

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = async () => {};
  const handleDelete = async () => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to you personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
