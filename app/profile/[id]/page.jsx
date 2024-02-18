'use client';

import { useState, useEffect } from 'react';
// components
import Profile from '@components/Profile';

// ----------------------------------------------------------------

const UserProfile = ({ searchParams, params }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPrompts();
  }, []);

  return (
    <Profile
      name={searchParams?.name}
      desc="Welcome to you personalized profile page"
      data={posts}
    />
  );
};

export default UserProfile;
