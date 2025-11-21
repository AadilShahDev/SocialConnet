import React, { useState } from 'react';
import './TokenGuide.css';
import { FaTwitter, FaLinkedin, FaFacebook, FaTiktok, FaExternalLinkAlt } from 'react-icons/fa';

function TokenGuide() {
  const [activePlatform, setActivePlatform] = useState('twitter');

  const platforms = {
    twitter: {
      name: 'Twitter / X',
      icon: <FaTwitter className="platform-icon twitter" />,
      color: '#1DA1F2',
      tokens: [
        {
          name: 'Access Token',
          description: 'Your personal Twitter OAuth 1.0a access token that allows the app to post tweets on your behalf.',
          required: true
        },
        {
          name: 'Access Token Secret',
          description: 'The secret key that pairs with your access token for secure authentication.',
          required: true
        }
      ],
      steps: [
        'Go to the Twitter Developer Portal',
        'Sign in with your Twitter account',
        'Click on "Projects & Apps" in the left sidebar',
        'Create a new app or select an existing one',
        'Go to "Keys and tokens" tab',
        'Under "Authentication Tokens", click "Generate" for Access Token and Secret',
        'Copy both the Access Token and Access Token Secret',
        'Paste them into the respective fields in SocialConnect'
      ],
      links: [
        {
          text: 'Twitter Developer Portal',
          url: 'https://developer.twitter.com/en/portal/dashboard'
        },
        {
          text: 'Twitter API Documentation',
          url: 'https://developer.twitter.com/en/docs'
        }
      ],
      permissions: [
        'Read and write access to your Twitter account',
        'Ability to post tweets and upload media'
      ],
      notes: [
        'You need to have a Twitter Developer account (it\'s free)',
        'Your app must have Read and Write permissions enabled',
        'Tokens don\'t expire but can be regenerated if compromised',
        'Keep your tokens secure - never share them publicly'
      ]
    },
    linkedin: {
      name: 'LinkedIn',
      icon: <FaLinkedin className="platform-icon linkedin" />,
      color: '#0A66C2',
      tokens: [
        {
          name: 'Access Token',
          description: 'OAuth 2.0 access token that allows posting to your LinkedIn profile.',
          required: true
        }
      ],
      steps: [
        'Go to LinkedIn Developers',
        'Sign in with your LinkedIn account',
        'Click "Create app" or select your existing app',
        'Fill in the required app details (name, company, privacy policy)',
        'Go to the "Auth" tab',
        'Add "w_member_social" scope under OAuth 2.0 scopes',
        'Use OAuth 2.0 authorization to get your access token',
        'For testing, you can use LinkedIn\'s OAuth 2.0 tools',
        'Copy the access token and paste it into SocialConnect'
      ],
      links: [
        {
          text: 'LinkedIn Developers',
          url: 'https://www.linkedin.com/developers/'
        },
        {
          text: 'LinkedIn API Documentation',
          url: 'https://learn.microsoft.com/en-us/linkedin/'
        }
      ],
      permissions: [
        'w_member_social - Share content on your behalf'
      ],
      notes: [
        'LinkedIn access tokens typically expire after 60 days',
        'You\'ll need to regenerate tokens periodically',
        'Make sure your LinkedIn app has "Share on LinkedIn" product enabled',
        'Image uploads to LinkedIn require additional setup'
      ]
    },
    facebook: {
      name: 'Facebook',
      icon: <FaFacebook className="platform-icon facebook" />,
      color: '#1877F2',
      tokens: [
        {
          name: 'Page Access Token',
          description: 'A long-lived token that allows posting to your Facebook Page.',
          required: true
        },
        {
          name: 'Page ID',
          description: 'The unique identifier for your Facebook Page.',
          required: true
        }
      ],
      steps: [
        'Go to Facebook Developers',
        'Create a new app or select your existing app',
        'Go to "Use cases" and add permissions: pages_manage_posts, pages_read_engagement, pages_show_list',
        'Go to Graph API Explorer (https://developers.facebook.com/tools/explorer/)',
        'Select your app from the dropdown',
        'Click "Generate Access Token" → "Get User Access Token"',
        'Select all required permissions',
        'Click "Generate Access Token" and authorize',
        'Now make a GET request to: me/accounts',
        'Find your page in the response and copy its "access_token" and "id"',
        'Paste the Page Access Token and Page ID into SocialConnect'
      ],
      links: [
        {
          text: 'Facebook Developers',
          url: 'https://developers.facebook.com/'
        },
        {
          text: 'Graph API Explorer',
          url: 'https://developers.facebook.com/tools/explorer/'
        },
        {
          text: 'Facebook Pages API',
          url: 'https://developers.facebook.com/docs/pages'
        }
      ],
      permissions: [
        'pages_manage_posts - Create and publish posts',
        'pages_read_engagement - Read page content',
        'pages_show_list - Access list of pages you manage'
      ],
      notes: [
        'You need to be an admin of the Facebook Page',
        'Use Page Access Token, not User Access Token',
        'Get the token from me/accounts endpoint after getting user token',
        'Page tokens can be long-lived (doesn\'t expire)',
        'Make sure your app has all required permissions approved'
      ]
    },
    tiktok: {
      name: 'TikTok',
      icon: <FaTiktok className="platform-icon tiktok" />,
      color: '#000000',
      tokens: [
        {
          name: 'Access Token',
          description: 'OAuth 2.0 access token for TikTok API.',
          required: true
        },
        {
          name: 'Open ID',
          description: 'Your unique TikTok user identifier.',
          required: true
        }
      ],
      steps: [
        'Go to TikTok Developers',
        'Sign in with your TikTok account',
        'Create a new app or select existing one',
        'Request "Content Posting API" access',
        'Complete TikTok\'s app review process',
        'Once approved, use OAuth 2.0 flow to get access token',
        'Get your Open ID from the authentication response',
        'Copy both Access Token and Open ID',
        'Paste them into SocialConnect'
      ],
      links: [
        {
          text: 'TikTok Developers',
          url: 'https://developers.tiktok.com/'
        },
        {
          text: 'TikTok API Documentation',
          url: 'https://developers.tiktok.com/doc'
        }
      ],
      permissions: [
        'video.upload - Upload videos to TikTok',
        'user.info.basic - Access basic user information'
      ],
      notes: [
        'TikTok API requires app review and approval',
        'Content Posting API is only available for approved apps',
        'Only video content is supported (no text-only posts)',
        'Access tokens expire - you\'ll need to refresh them',
        'TikTok has strict content guidelines'
      ]
    }
  };

  return (
    <div className="token-guide">
      <div className="guide-header">
        <h1>API Token Setup Guide</h1>
        <p className="guide-subtitle">
          Step-by-step instructions to connect your social media accounts
        </p>
      </div>

      <div className="platform-tabs">
        {Object.keys(platforms).map(key => (
          <button
            key={key}
            className={`platform-tab ${activePlatform === key ? 'active' : ''}`}
            onClick={() => setActivePlatform(key)}
            style={activePlatform === key ? { borderBottomColor: platforms[key].color } : {}}
          >
            {platforms[key].icon}
            <span>{platforms[key].name}</span>
          </button>
        ))}
      </div>

      <div className="guide-content">
        {Object.keys(platforms).map(key => (
          <div
            key={key}
            className={`platform-guide ${activePlatform === key ? 'active' : ''}`}
          >
            <div className="guide-section">
              <h2>Required Tokens</h2>
              <div className="tokens-list">
                {platforms[key].tokens.map((token, index) => (
                  <div key={index} className="token-item">
                    <div className="token-header">
                      <h3>{token.name}</h3>
                      {token.required && <span className="required-badge">Required</span>}
                    </div>
                    <p>{token.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="guide-section">
              <h2>How to Get Your Tokens</h2>
              <ol className="steps-list">
                {platforms[key].steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="guide-section">
              <h2>Required Permissions</h2>
              <ul className="permissions-list">
                {platforms[key].permissions.map((permission, index) => (
                  <li key={index}>{permission}</li>
                ))}
              </ul>
            </div>

            <div className="guide-section">
              <h2>Important Notes</h2>
              <ul className="notes-list">
                {platforms[key].notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="guide-section">
              <h2>Helpful Links</h2>
              <div className="links-list">
                {platforms[key].links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                  >
                    {link.text}
                    <FaExternalLinkAlt />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="guide-footer">
        <div className="security-notice">
          <h3>🔒 Security Best Practices</h3>
          <ul>
            <li>Never share your access tokens publicly</li>
            <li>Regenerate tokens if you suspect they've been compromised</li>
            <li>Store tokens securely - they provide full access to your accounts</li>
            <li>Review connected apps regularly in your social media settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TokenGuide;
