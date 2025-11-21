import React from 'react';
import './Dashboard.css';

function Header({ user, onLogout }) {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="header-logo">SocialConnect</h1>
        <div className="header-user">
          <span className="user-name">👤 {user.name}</span>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
