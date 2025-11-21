import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTwitter, FaLinkedin, FaFacebook, FaTiktok, FaImage } from 'react-icons/fa';
import './Dashboard.css';

function PostComposer({ connectedAccounts, onPostSuccess }) {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const isTwitterConnected = connectedAccounts.twitter?.connected;
  const isLinkedInConnected = connectedAccounts.linkedin?.connected;
  const isFacebookConnected = connectedAccounts.facebook?.connected;
  const isTikTokConnected = connectedAccounts.tiktok?.connected;

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);

    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeMedia = (index) => {
    const newFiles = mediaFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setMediaFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('platforms', JSON.stringify(selectedPlatforms));

      mediaFiles.forEach(file => {
        formData.append('media', file);
      });

      const response = await axios.post('/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Check results
      const results = response.data.results;
      let successCount = 0;
      let failedPlatforms = [];

      if (results.twitter?.posted) successCount++;
      else if (selectedPlatforms.includes('twitter')) failedPlatforms.push('Twitter');

      if (results.linkedin?.posted) successCount++;
      else if (selectedPlatforms.includes('linkedin')) failedPlatforms.push('LinkedIn');

      if (results.facebook?.posted) successCount++;
      else if (selectedPlatforms.includes('facebook')) failedPlatforms.push('Facebook');

      if (results.tiktok?.posted) successCount++;
      else if (selectedPlatforms.includes('tiktok')) failedPlatforms.push('TikTok');

      if (successCount === selectedPlatforms.length) {
        toast.success('Post published to all platforms!');
      } else if (successCount > 0) {
        toast.warning(`Posted to ${successCount} platform(s). Failed: ${failedPlatforms.join(', ')}`);
      } else {
        toast.error('Failed to post to any platform');
      }

      // Reset form
      setContent('');
      setSelectedPlatforms([]);
      setMediaFiles([]);
      setPreviewUrls([]);
      onPostSuccess();

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-composer">
      <h2>Create New Post</h2>
      <p className="section-description">
        Compose your post and select platforms to publish
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
          />
          <div className="char-count">
            {content.length} characters
          </div>
        </div>

        <div className="form-group">
          <label>Media (Optional)</label>
          <div className="media-upload">
            <input
              type="file"
              id="media-input"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="media-input" className="media-upload-btn">
              <FaImage /> Choose Files
            </label>
            {mediaFiles.length > 0 && (
              <span className="media-count">{mediaFiles.length} file(s) selected</span>
            )}
          </div>

          {previewUrls.length > 0 && (
            <div className="media-preview">
              {previewUrls.map((url, index) => (
                <div key={index} className="preview-item">
                  <img src={url} alt={`Preview ${index + 1}`} />
                  <button 
                    type="button" 
                    className="remove-media"
                    onClick={() => removeMedia(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Select Platforms</label>
          <div className="platform-selection">
            <button
              type="button"
              className={`platform-btn twitter ${selectedPlatforms.includes('twitter') ? 'selected' : ''} ${!isTwitterConnected ? 'disabled' : ''}`}
              onClick={() => isTwitterConnected && togglePlatform('twitter')}
              disabled={!isTwitterConnected}
            >
              <FaTwitter />
              <span>Twitter</span>
              {!isTwitterConnected && <small>Not connected</small>}
            </button>

            <button
              type="button"
              className={`platform-btn linkedin ${selectedPlatforms.includes('linkedin') ? 'selected' : ''} ${!isLinkedInConnected ? 'disabled' : ''}`}
              onClick={() => isLinkedInConnected && togglePlatform('linkedin')}
              disabled={!isLinkedInConnected}
            >
              <FaLinkedin />
              <span>LinkedIn</span>
              {!isLinkedInConnected && <small>Not connected</small>}
            </button>

            <button
              type="button"
              className={`platform-btn facebook ${selectedPlatforms.includes('facebook') ? 'selected' : ''} ${!isFacebookConnected ? 'disabled' : ''}`}
              onClick={() => isFacebookConnected && togglePlatform('facebook')}
              disabled={!isFacebookConnected}
            >
              <FaFacebook />
              <span>Facebook</span>
              {!isFacebookConnected && <small>Not connected</small>}
            </button>

            <button
              type="button"
              className={`platform-btn tiktok ${selectedPlatforms.includes('tiktok') ? 'selected' : ''} ${!isTikTokConnected ? 'disabled' : ''}`}
              onClick={() => isTikTokConnected && togglePlatform('tiktok')}
              disabled={!isTikTokConnected}
            >
              <FaTiktok />
              <span>TikTok</span>
              {!isTikTokConnected && <small>Not connected</small>}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn-publish"
          disabled={loading || !content.trim() || selectedPlatforms.length === 0}
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}

export default PostComposer;
