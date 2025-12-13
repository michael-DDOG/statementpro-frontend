# StatementPro - Bank Statement Converter

Convert bank statements (PDF/Image) to Excel spreadsheets instantly.

![StatementPro](https://img.shields.io/badge/StatementPro-Bank%20Statement%20Converter-10b981)

## 🚀 Quick Deploy to Netlify

### Step 1: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
2. Name it `statementpro-frontend` (or anything you like)
3. Leave it empty (don't add README or .gitignore)
4. Run these commands in your terminal:

```bash
# Navigate to project folder
cd statementpro-frontend

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/statementpro-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your `statementpro-frontend` repository
5. Netlify will auto-detect settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

That's it! Your site will be live in ~2 minutes.

## 📁 Project Structure

```
statementpro-frontend/
├── index.html          # Entry HTML file
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS config
├── postcss.config.js   # PostCSS config
├── netlify.toml        # Netlify deployment config
├── .gitignore          # Git ignore rules
├── public/
│   └── favicon.svg     # Site favicon
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Main application (all components)
    └── index.css       # Global styles + Tailwind
```

## ⚙️ Configuration

### Backend API URL

Edit `src/App.jsx` line 4 to change the backend URL:

```javascript
const API_URL = 'http://18.218.29.238';  // Change this to your backend
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- 🔐 **User Authentication** - Register/Login with JWT
- 📤 **File Upload** - Drag & drop PDF/image files
- ⚡ **Fast Conversion** - AI-powered extraction
- 📊 **Transaction Table** - View extracted data
- 💾 **Export Options** - Excel (.xlsx) & CSV
- 💳 **Stripe Payments** - Pro/Business upgrades
- 📱 **Responsive** - Works on all devices
- 🎨 **Modern UI** - Tailwind CSS styling

## 🔌 API Endpoints

The frontend connects to these backend endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/convert` | Convert bank statement |
| GET | `/api/conversions` | Get conversion history |
| POST | `/api/create-checkout-session` | Create Stripe checkout |

## 📝 License

MIT License - feel free to use for your own projects!
