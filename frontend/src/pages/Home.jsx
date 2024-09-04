import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        setListOfPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="posts-container">
      <h1>Latest Posts</h1>
      {listOfPosts.length > 0 ? (
        <ul className="post-list">
          {listOfPosts.map((post) => (
            <li key={post.id} className="post-item" onClick={() => navigate(`/posts/${post.id}`)}>
              <div className="post-title">{post.title}</div>
              <div className="post-excerpt">{post.posttext.substring(0, 60)}...</div>
              <div className="post-author">by {post.username}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Home;
