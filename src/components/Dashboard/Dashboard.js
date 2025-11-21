import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AccountConnect from './AccountConnect';
import PostComposer from './PostComposer';
import PostHistory from './PostHistory';
import './Dashboard.css';

function Dashboard({ user, onLogout, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('compose');
  const navigate = useNavigate();
  const [connectedAccounts, setConnectedAccounts] = useState({
    twitter: { connected: false },
    linkedin: { connected: false }
  });
  const [refreshHistory, setRefreshHistory] = useState(0);

  useEffect(() => {
    if (user && user.connectedAccounts) {
      setConnectedAccounts(user.connectedAccounts);
    }
  }, [user]);

  const handleAccountUpdate = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      onUpdateUser(response.data.user);
      setConnectedAccounts(response.data.user.connectedAccounts);
      toast.success('Account settings updated');
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  const handlePostSuccess = () => {
    setRefreshHistory(prev => prev + 1);
    toast.success('Post published successfully!');
  };

  return (
    <div className="dashboard">
      <Header user={user} onLogout={onLogout} />
      
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <button 
            className={`sidebar-btn ${activeTab === 'compose' ? 'active' : ''}`}
            onClick={() => setActiveTab('compose')}
          >
            <span className="icon">✏️</span>
            Compose Post
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'accounts' ? 'active' : ''}`}
            onClick={() => setActiveTab('accounts')}
          >
            <span className="icon">🔗</span>
            Connected Accounts
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="icon">📊</span>
            Post History
          </button>
          <button 
            className="sidebar-btn help-btn"
            onClick={() => navigate('/guide')}
          >
            <span className="icon">📘</span>
            Setup Guide
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'compose' && (
            <PostComposer 
              connectedAccounts={connectedAccounts} 
              onPostSuccess={handlePostSuccess}
            />
          )}
          {activeTab === 'accounts' && (
            <AccountConnect 
              connectedAccounts={connectedAccounts}
              onAccountUpdate={handleAccountUpdate}
            />
          )}
          {activeTab === 'history' && (
            <PostHistory refresh={refreshHistory} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
