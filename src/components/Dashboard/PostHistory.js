import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTwitter, FaLinkedin, FaFacebook, FaTiktok, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Dashboard.css';

function PostHistory({ refresh }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts/history');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: 'Success', class: 'success' },
      partial: { text: 'Partial', class: 'warning' },
      failed: { text: 'Failed', class: 'error' },
      pending: { text: 'Pending', class: 'pending' }
    };
    const badge = badges[status] || badges.pending;
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  };

  if (loading) {
    return (
      <div className="post-history">
        <h2>Post History</h2>
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="post-history">
      <h2>Post History</h2>
      <p className="section-description">
        View all your published posts and their status
      </p>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts yet. Create your first post!</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post._id} className="post-item">
              <div className="post-header">
                <div className="post-status">
                  {getStatusBadge(post.status)}
                  <span className="post-date">{formatDate(post.createdAt)}</span>
                </div>
              </div>

              <div className="post-content">
                <p>{post.content}</p>
              </div>

              <div className="post-platforms">
                {post.platforms.twitter && (
                  <div className="platform-status">
                    <FaTwitter className="platform-icon twitter" />
                    {post.platforms.twitter.posted ? (
                      <span className="posted">
                        <FaCheckCircle /> Posted
                      </span>
                    ) : (
                      <span className="not-posted">
                        <FaTimesCircle /> Failed
                      </span>
                    )}
                  </div>
                )}

                {post.platforms.linkedin && (
                  <div className="platform-status">
                    <FaLinkedin className="platform-icon linkedin" />
                    {post.platforms.linkedin.posted ? (
                      <span className="posted">
                        <FaCheckCircle /> Posted
                      </span>
                    ) : (
                      <span className="not-posted">
                        <FaTimesCircle /> Failed
                      </span>
                    )}
                  </div>
                )}

                {post.platforms.facebook && (
                  <div className="platform-status">
                    <FaFacebook className="platform-icon facebook" />
                    {post.platforms.facebook.posted ? (
                      <span className="posted">
                        <FaCheckCircle /> Posted
                      </span>
                    ) : (
                      <span className="not-posted">
                        <FaTimesCircle /> Failed
                      </span>
                    )}
                  </div>
                )}

                {post.platforms.tiktok && (
                  <div className="platform-status">
                    <FaTiktok className="platform-icon tiktok" />
                    {post.platforms.tiktok.posted ? (
                      <span className="posted">
                        <FaCheckCircle /> Posted
                      </span>
                    ) : (
                      <span className="not-posted">
                        <FaTimesCircle /> Failed
                      </span>
                    )}
                  </div>
                )}
              </div>

              {(post.platforms.twitter?.error || post.platforms.linkedin?.error || post.platforms.facebook?.error || post.platforms.tiktok?.error) && (
                <div className="post-errors">
                  {post.platforms.twitter?.error && (
                    <div className="error-message">
                      <strong>Twitter:</strong> {post.platforms.twitter.error}
                    </div>
                  )}
                  {post.platforms.linkedin?.error && (
                    <div className="error-message">
                      <strong>LinkedIn:</strong> {post.platforms.linkedin.error}
                    </div>
                  )}
                  {post.platforms.facebook?.error && (
                    <div className="error-message">
                      <strong>Facebook:</strong> {post.platforms.facebook.error}
                    </div>
                  )}
                  {post.platforms.tiktok?.error && (
                    <div className="error-message">
                      <strong>TikTok:</strong> {post.platforms.tiktok.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostHistory;
