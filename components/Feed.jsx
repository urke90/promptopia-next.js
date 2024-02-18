'use client';

// react
import { useState, useEffect, useRef } from 'react';
// component
import PromptCard from './PromptCard';

// ----------------------------------------------------------------

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const debounceTimeoutRef = useRef(null);

  const handleSearchQueryChange = (e) => {
    clearTimeout(debounceTimeoutRef);
    setSearchQuery(e.target.value);

    debounceTimeoutRef.current = setTimeout(() => {
      const searchedPrompts = filterPrompts(e.target.value);
      setFilteredPosts(searchedPrompts);
    }, 500);
  };

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');

    return posts.filter(
      (post) => regex.test(post.prompt.userName) || regex.test(post.prompt) || regex.test(post.tag)
    );
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);

    const searchedPrompts = filterPrompts(tag);
    setFilteredPosts(searchedPrompts);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };

    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          required
          className="search_input peer"
        />
      </form>
      {searchQuery ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
