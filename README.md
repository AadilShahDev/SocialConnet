# SocialConnect - Social Media Management Platform

A fully functional web application that allows you to manage and publish content to multiple social media platforms simultaneously.

## 🚀 Features

- **Multi-Platform Publishing**: Post to Twitter/X, LinkedIn, Facebook, and TikTok with a single click
- **Account Management**: Connect and manage multiple social media accounts
- **Media Support**: Upload images and videos with your posts
- **Post History**: Track all your published posts and their status
- **Real-time Status**: See which posts succeeded or failed on each platform
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
cd SocialConnet
```

### 2. Install dependencies
```bash
npm run install-all
```

This will install dependencies for both backend and frontend.

### 3. Set up environment variables

Create a `.env` file in the root directory by copying the example:
```bash
copy .env.example .env
```

Edit the `.env` file and add your credentials:

#### MongoDB
```
MONGODB_URI=mongodb://localhost:27017/socialconnect
```

#### Twitter API Credentials
Get your credentials from [Twitter Developer Portal](https://developer.twitter.com/):
1. Create a new app
2. Generate API keys and tokens
3. Enable OAuth 1.0a with Read and Write permissions

```
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
TWITTER_BEARER_TOKEN=your_bearer_token
```

#### LinkedIn API Credentials
Get your credentials from [LinkedIn Developers](https://www.linkedin.com/developers/):
1. Create a new app
2. Request access to "Sign In with LinkedIn" and "Share on LinkedIn" products
3. Generate OAuth 2.0 credentials

```
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
```

#### Facebook API Credentials
Get your credentials from [Facebook Developers](https://developers.facebook.com/):
1. Create a new app
2. Add "Facebook Login" product
3. Request access to "pages_manage_posts" and "pages_read_engagement" permissions
4. Generate access token for your page

```
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
```

#### TikTok API Credentials
Get your credentials from [TikTok Developers](https://developers.tiktok.com/):
1. Create a new app
2. Request access to "Video Upload" and "User Info Basic" scopes
3. Generate OAuth 2.0 credentials

```
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# Windows (if installed as service)
net start MongoDB

# Or run manually
mongod
```

## 🚀 Running the Application

### Development Mode

Run both backend and frontend simultaneously:
```bash
npm run dev
```

Or run them separately:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📖 Usage Guide

### 1. Register an Account
- Navigate to http://localhost:3000
- Click "Sign up" and create a new account
- Fill in your name, email, and password

### 2. Connect Social Media Accounts

#### Twitter/X:
1. Go to "Connected Accounts" tab
2. Enter your Twitter Access Token and Access Token Secret
3. Click "Connect Twitter"

#### LinkedIn:
1. Go to "Connected Accounts" tab
2. Enter your LinkedIn Access Token
3. Click "Connect LinkedIn"

#### Facebook:
1. Go to "Connected Accounts" tab
2. Enter your Facebook Page Access Token and Page ID
3. Click "Connect Facebook"

#### TikTok:
1. Go to "Connected Accounts" tab
2. Enter your TikTok Access Token and Open ID
3. Click "Connect TikTok"

**Note**: For production use, you should implement proper OAuth flows. This version uses direct token input for simplicity.

### 3. Create and Publish Posts
1. Go to "Compose Post" tab
2. Write your content
3. Optionally add images or videos
4. Select the platforms you want to post to
5. Click "Publish Post"

### 4. View Post History
- Go to "Post History" tab to see all your published posts
- Check which platforms succeeded or failed
- View error messages if any post failed

## 🏗️ Project Structure

```
SocialConnet/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Post.js          # Post schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── social.js        # Social media connection routes
│   │   └── posts.js         # Post creation and history routes
│   ├── uploads/             # Temporary media storage
│   ├── package.json
│   └── server.js            # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/        # Login and Register components
│   │   │   └── Dashboard/   # Dashboard components
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── .env.example
├── package.json
└── README.md
```

## 🔐 Security Notes

- Never commit your `.env` file to version control
- Keep your API keys and secrets secure
- In production, use environment variables from your hosting platform
- Implement rate limiting for API endpoints
- Use HTTPS in production
- Implement proper OAuth flows instead of direct token input

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Verify MongoDB is accessible on the specified port

### Twitter API Errors
- Verify your API credentials are correct
- Ensure your Twitter app has read and write permissions
- Check rate limits on Twitter API

### LinkedIn API Errors
- Verify your access token is valid
- Check token expiration (LinkedIn tokens expire after 60 days)
- Ensure your app has necessary permissions

### Facebook API Errors
- Verify page access token is correct
- Ensure your app has page publishing permissions
- Check if the page ID matches the access token

### TikTok API Errors
- Verify your access token is valid
- TikTok requires video content for posts
- Check rate limits and API quotas
- Ensure proper scopes are approved

### Port Already in Use
```bash
# Change ports in .env
PORT=5001  # Backend
# And in frontend package.json proxy
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Social Media
- `POST /api/social/connect/twitter` - Connect Twitter account
- `POST /api/social/connect/linkedin` - Connect LinkedIn account
- `POST /api/social/connect/facebook` - Connect Facebook account
- `POST /api/social/connect/tiktok` - Connect TikTok account
- `POST /api/social/disconnect/twitter` - Disconnect Twitter
- `POST /api/social/disconnect/linkedin` - Disconnect LinkedIn
- `POST /api/social/disconnect/facebook` - Disconnect Facebook
- `POST /api/social/disconnect/tiktok` - Disconnect TikTok
- `GET /api/social/accounts` - Get connected accounts

### Posts
- `POST /api/posts/create` - Create and publish post
- `GET /api/posts/history` - Get post history
- `GET /api/posts/:postId` - Get single post

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set secure `JWT_SECRET` and `SESSION_SECRET`
4. Configure proper CORS origins
5. Use a process manager like PM2
6. Set up HTTPS/SSL certificates
7. Implement proper OAuth flows for social media connections

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ for social media enthusiasts

## 🙏 Acknowledgments

- Twitter API Documentation
- LinkedIn API Documentation
- React Documentation
- Express.js Documentation
