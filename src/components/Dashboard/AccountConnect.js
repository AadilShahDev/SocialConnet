import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTwitter, FaLinkedin, FaFacebook, FaTiktok } from 'react-icons/fa';
import './Dashboard.css';

function AccountConnect({ connectedAccounts, onAccountUpdate }) {
  const [loading, setLoading] = useState({});
  const [credentials, setCredentials] = useState({
    twitter: {
      accessToken: '',
      accessTokenSecret: ''
    },
    linkedin: {
      accessToken: ''
    },
    facebook: {
      accessToken: '',
      pageId: ''
    },
    tiktok: {
      accessToken: '',
      openId: ''
    }
  });

  const handleInputChange = (platform, field, value) => {
    setCredentials(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };

  const connectTwitter = async () => {
    setLoading({ ...loading, twitter: true });
    try {
      await axios.post('/api/social/connect/twitter', credentials.twitter);
      toast.success('Twitter account connected successfully!');
      onAccountUpdate();
      setCredentials(prev => ({
        ...prev,
        twitter: { accessToken: '', accessTokenSecret: '' }
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to connect Twitter');
    } finally {
      setLoading({ ...loading, twitter: false });
    }
  };

  const connectLinkedIn = async () => {
    setLoading({ ...loading, linkedin: true });
    try {
      await axios.post('/api/social/connect/linkedin', credentials.linkedin);
      toast.success('LinkedIn account connected successfully!');
      onAccountUpdate();
      setCredentials(prev => ({
        ...prev,
        linkedin: { accessToken: '' }
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to connect LinkedIn');
    } finally {
      setLoading({ ...loading, linkedin: false });
    }
  };

  const connectFacebook = async () => {
    setLoading({ ...loading, facebook: true });
    try {
      await axios.post('/api/social/connect/facebook', credentials.facebook);
      toast.success('Facebook account connected successfully!');
      onAccountUpdate();
      setCredentials(prev => ({
        ...prev,
        facebook: { accessToken: '', pageId: '' }
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to connect Facebook');
    } finally {
      setLoading({ ...loading, facebook: false });
    }
  };

  const connectTikTok = async () => {
    setLoading({ ...loading, tiktok: true });
    try {
      await axios.post('/api/social/connect/tiktok', credentials.tiktok);
      toast.success('TikTok account connected successfully!');
      onAccountUpdate();
      setCredentials(prev => ({
        ...prev,
        tiktok: { accessToken: '', openId: '' }
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to connect TikTok');
    } finally {
      setLoading({ ...loading, tiktok: false });
    }
  };

  const disconnectAccount = async (platform) => {
    setLoading({ ...loading, [platform]: true });
    try {
      await axios.post(`/api/social/disconnect/${platform}`);
      toast.success(`${platform === 'twitter' ? 'Twitter' : 'LinkedIn'} account disconnected`);
      onAccountUpdate();
    } catch (error) {
      toast.error('Failed to disconnect account');
    } finally {
      setLoading({ ...loading, [platform]: false });
    }
  };

  return (
    <div className="account-connect">
      <h2>Connected Accounts</h2>
      <p className="section-description">
        Connect your social media accounts to start posting
      </p>

      <div className="accounts-grid">
        {/* Twitter Card */}
        <div className="account-card">
          <div className="account-header">
            <FaTwitter className="account-icon twitter" />
            <h3>Twitter / X</h3>
          </div>
          
          {connectedAccounts.twitter?.connected ? (
            <div className="account-connected">
              <div className="status-badge connected">✓ Connected</div>
              <p className="account-username">@{connectedAccounts.twitter.username}</p>
              <button 
                className="btn-disconnect"
                onClick={() => disconnectAccount('twitter')}
                disabled={loading.twitter}
              >
                {loading.twitter ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          ) : (
            <div className="account-form">
              <div className="form-group">
                <label>Access Token</label>
                <input
                  type="text"
                  placeholder="Enter Twitter Access Token"
                  value={credentials.twitter.accessToken}
                  onChange={(e) => handleInputChange('twitter', 'accessToken', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Access Token Secret</label>
                <input
                  type="password"
                  placeholder="Enter Access Token Secret"
                  value={credentials.twitter.accessTokenSecret}
                  onChange={(e) => handleInputChange('twitter', 'accessTokenSecret', e.target.value)}
                />
              </div>
              <button 
                className="btn-connect"
                onClick={connectTwitter}
                disabled={loading.twitter || !credentials.twitter.accessToken || !credentials.twitter.accessTokenSecret}
              >
                {loading.twitter ? 'Connecting...' : 'Connect Twitter'}
              </button>
              <div className="help-text">
                <small>
                  Get your tokens from <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank" rel="noopener noreferrer">Twitter Developer Portal</a>
                </small>
              </div>
            </div>
          )}
        </div>

        {/* LinkedIn Card */}
        <div className="account-card">
          <div className="account-header">
            <FaLinkedin className="account-icon linkedin" />
            <h3>LinkedIn</h3>
          </div>
          
          {connectedAccounts.linkedin?.connected ? (
            <div className="account-connected">
              <div className="status-badge connected">✓ Connected</div>
              <p className="account-username">{connectedAccounts.linkedin.name}</p>
              <button 
                className="btn-disconnect"
                onClick={() => disconnectAccount('linkedin')}
                disabled={loading.linkedin}
              >
                {loading.linkedin ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          ) : (
            <div className="account-form">
              <div className="form-group">
                <label>Access Token</label>
                <input
                  type="text"
                  placeholder="Enter LinkedIn Access Token"
                  value={credentials.linkedin.accessToken}
                  onChange={(e) => handleInputChange('linkedin', 'accessToken', e.target.value)}
                />
              </div>
              <button 
                className="btn-connect"
                onClick={connectLinkedIn}
                disabled={loading.linkedin || !credentials.linkedin.accessToken}
              >
                {loading.linkedin ? 'Connecting...' : 'Connect LinkedIn'}
              </button>
              <div className="help-text">
                <small>
                  Get your token from <a href="https://www.linkedin.com/developers/" target="_blank" rel="noopener noreferrer">LinkedIn Developers</a>
                </small>
              </div>
            </div>
          )}
        </div>

        {/* Facebook Card */}
        <div className="account-card">
          <div className="account-header">
            <FaFacebook className="account-icon facebook" />
            <h3>Facebook</h3>
          </div>
          
          {connectedAccounts.facebook?.connected ? (
            <div className="account-connected">
              <div className="status-badge connected">✓ Connected</div>
              <p className="account-username">{connectedAccounts.facebook.pageName}</p>
              <button 
                className="btn-disconnect"
                onClick={() => disconnectAccount('facebook')}
                disabled={loading.facebook}
              >
                {loading.facebook ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          ) : (
            <div className="account-form">
              <div className="form-group">
                <label>Access Token</label>
                <input
                  type="text"
                  placeholder="Enter Facebook Access Token"
                  value={credentials.facebook.accessToken}
                  onChange={(e) => handleInputChange('facebook', 'accessToken', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Page ID</label>
                <input
                  type="text"
                  placeholder="Enter Facebook Page ID"
                  value={credentials.facebook.pageId}
                  onChange={(e) => handleInputChange('facebook', 'pageId', e.target.value)}
                />
              </div>
              <button 
                className="btn-connect"
                onClick={connectFacebook}
                disabled={loading.facebook || !credentials.facebook.accessToken || !credentials.facebook.pageId}
              >
                {loading.facebook ? 'Connecting...' : 'Connect Facebook'}
              </button>
              <div className="help-text">
                <small>
                  Get your tokens from <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook Developers</a>
                </small>
              </div>
            </div>
          )}
        </div>

        {/* TikTok Card */}
        <div className="account-card">
          <div className="account-header">
            <FaTiktok className="account-icon tiktok" />
            <h3>TikTok</h3>
          </div>
          
          {connectedAccounts.tiktok?.connected ? (
            <div className="account-connected">
              <div className="status-badge connected">✓ Connected</div>
              <p className="account-username">@{connectedAccounts.tiktok.username}</p>
              <button 
                className="btn-disconnect"
                onClick={() => disconnectAccount('tiktok')}
                disabled={loading.tiktok}
              >
                {loading.tiktok ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          ) : (
            <div className="account-form">
              <div className="form-group">
                <label>Access Token</label>
                <input
                  type="text"
                  placeholder="Enter TikTok Access Token"
                  value={credentials.tiktok.accessToken}
                  onChange={(e) => handleInputChange('tiktok', 'accessToken', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Open ID</label>
                <input
                  type="text"
                  placeholder="Enter TikTok Open ID"
                  value={credentials.tiktok.openId}
                  onChange={(e) => handleInputChange('tiktok', 'openId', e.target.value)}
                />
              </div>
              <button 
                className="btn-connect"
                onClick={connectTikTok}
                disabled={loading.tiktok || !credentials.tiktok.accessToken || !credentials.tiktok.openId}
              >
                {loading.tiktok ? 'Connecting...' : 'Connect TikTok'}
              </button>
              <div className="help-text">
                <small>
                  Get your tokens from <a href="https://developers.tiktok.com/" target="_blank" rel="noopener noreferrer">TikTok Developers</a>
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountConnect;
