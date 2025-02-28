<div align="center">
  
# ✨ Seamless ✨
/**
<img src="https://raw.githubusercontent.com/Carlalagat/Seamless-API/main/docs/assets/logo.png" alt="Seamless Logo" width="180" height="180" style="border-radius: 20px;">
*/
### Tailor-Made Clothing Platform - Connecting clients with tailors for custom-made clothing through a user-friendly interface

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen" alt="Status: Active">
  <img src="https://img.shields.io/badge/Version-1.0-blue" alt="Version: 1.0">
  <img src="https://img.shields.io/badge/License-MIT-purple" alt="License: MIT">
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-daily-workflow">Daily Workflow</a> •
  <a href="#-testing">Testing</a> •
  <a href="#-code-structure">Code Structure</a> •
  <a href="#-troubleshooting">Troubleshooting</a> •
  <a href="#-contact">Contact</a>
</p>

</div>

## 🌟 Stargazers
[![Stargazers](https://reporoster.com/stars/Carlalagat/Seamless-API)](https://github.com/Carlalagat/Seamless-API/stargazers)

## 📊 Contributions Dashboard
![Alt](https://repobeats.axiom.co/api/embed/059ee957f87e835cc3365e2db35beade18e5eb7e.svg "Repobeats analytics image")

## ✨ Project Overview

Seamless is an innovative web application designed to transform the custom tailoring industry by enabling clients to access tailor-made clothing remotely.

<table>
  <tr>
    <td width="50%">
      <div align="center">
        <h3>👗 For Customers</h3>
        <img width="30" src="https://img.icons8.com/fluency/96/user-female-circle.png" alt="customer"/>
      </div>
      <ul>
        <li>Request custom-tailored garments</li>
        <li>Submit accurate self-measurements using instructional videos</li>
        <li>Select tailors based on skills and pricing</li>
        <li>Track orders from creation to delivery</li>
      </ul>
    </td>
    <td width="50%">
      <div align="center">
        <h3>🧵 For Tailors</h3>
        <img width="30" src="https://img.icons8.com/fluency/96/client-management.png" alt="tailor"/>
      </div>
      <ul>
        <li>Access a broader customer base</li>
        <li>Order management tools</li>
        <li>Communication channels with clients</li>
        <li>Portfolio showcase for attracting customers</li>
      </ul>
    </td>
  </tr>
</table>

## 🚀 Getting Started

### Required Tools

Before diving into the Seamless project, you'll need to set up your development environment:

<details>
<summary><b>🔄 Install Git</b></summary>

```bash
# Windows:
# Download from git-scm.com
git --version

# macOS:
brew install git
git --version

# Linux:
sudo apt install git
git --version
```
</details>

<details>
<summary><b>📦 Install Node.js</b></summary>

```bash
# All Platforms:
# Download LTS from nodejs.org( https://nodejs.org/en )
node --version
npm --version
```
</details>

<details>
<summary><b>🧰 Install Code Editor</b></summary>

- Download VS Code
- Install extensions:
  - ESLint
  - Prettier
  - GitLens
  - JavaScript snippets
</details>

### Understanding Git & GitHub

<table>
  <tr>
    <th colspan="2" align="center">🌿 Key Git Concepts</th>
  </tr>
  <tr>
    <td width="50%"><b>📁 Repository</b><br>Your project's home on GitHub</td>
    <td width="50%"><b>📥 Clone</b><br>Creating a local copy on your computer</td>
  </tr>
  <tr>
    <td width="50%"><b>🌿 Branch</b><br>A separate version for feature development</td>
    <td width="50%"><b>💾 Commit</b><br>Saving your changes locally</td>
  </tr>
  <tr>
    <td width="50%"><b>📤 Push</b><br>Uploading your commits to GitHub</td>
    <td width="50%"><b>📥 Pull</b><br>Downloading changes from GitHub</td>
  </tr>
</table>

### Cloning the Project

```bash
# 1. Create a GitHub account at github.com
# 2. Get added as a collaborator by your team lead
# 3. Clone the repository:
git clone https://github.com/Carlalagat/Seamless-API.git
cd Seamless-API
```

### Project Setup

<div align="center">

### ⚙️ Quick Setup Steps

</div>

```bash
# 1️⃣ Install Dependencies
npm install

# 2️⃣ Configure Environment
cp .env.example .env

# 3️⃣ Set Up Database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 4️⃣ Start Development Server
npm run dev
# Server will start at http://localhost:3000
```

## 📅 Daily Workflow

### 🌿 Branch Management

<table>
  <tr>
    <td width="50%" bgcolor="#0D1117">
      <div align="center">
        <h4>🟢 main</h4>
        <p>Production-ready code</p>
      </div>
    </td>
    <td width="50%" bgcolor="#0D1117">
      <div align="center">
        <h4>🟣 develop</h4>
        <p>Integration branch</p>
      </div>
    </td>
  </tr>
</table>

### Creating & Working with Branches

```bash
# Start from develop branch
git checkout develop

# Get latest changes
git fetch
git pull origin develop

# Make your changes...

# Check what files you've changed
git status

# Stage and commit your changes
git add .
git commit -m "Add user registration form and validation"

# Push your changes
git push -u origin develop
```

### Pull Request Process

<div align="center">

### 🔄 Creating a Pull Request

</div>

1. Go to the repository on GitHub
2. Click "Pull requests" → "New pull request"
3. Set "base" to `main` and "compare" to `develop` branch
4. Add a title and description
5. Assign reviewers from your team
6. Submit the pull request

## 🧪 Testing

### Using Postman

<div align="center">

### 🔍 Postman API Testing

</div>

Postman is essential for testing our API endpoints:

1. Download from [postman.com](https://www.postman.com/downloads/)
2. Create requests for our endpoints:

<table>
  <tr>
    <td><b style="color:#10b981">GET</b> /api/products<br><small>Get all products</small></td>
    <td><b style="color:#f59e0b">POST</b> /api/products<br><small>Create a product</small></td>
  </tr>
  <tr>
    <td><b style="color:#10b981">GET</b> /api/products/:id<br><small>Get one product</small></td>
    <td><b style="color:#3b82f6">PUT</b> /api/products/:id<br><small>Update a product</small></td>
  </tr>
  <tr>
    <td colspan="2"><b style="color:#ef4444">DELETE</b> /api/products/:id<br><small>Delete a product</small></td>
  </tr>
</table>

### File Uploads with Cloudinary

```javascript
// Example code for uploading images
const cloudinary = require('../helpers/cloudinary');

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}
```

## 🧩 Code Structure

```
Seamless-API/
├── prisma/                  // Database configuration
│   ├── schema.prisma        // Database schema
│   └── seed/
│       └── seed.js          // Initial data seeding
├── src/
│   ├── controllers/         // Business logic
│   ├── dto/                 // Data validation
│   ├── helpers/             // Utility functions
│   ├── routes/              // API endpoints
│   └── index.js             // Entry point
├── tests/                   // Automated tests
├── docs/                    // Documentation
├── .env                     // Environment variables
└── README.md                // Project overview
```

### Key Technologies

<div align="center">
<table>
  <tr>
    <td align="center"><img width="40" src="https://img.icons8.com/color/96/express-js.png" alt="Express"/><br><b>Express</b><br>Web API framework</td>
    <td align="center"><img width="40" src="https://img.icons8.com/color/96/prisma-orm.png" alt="Prisma"/><br><b>Prisma</b><br>ORM for database</td>
    <td align="center"><img width="40" src="https://img.icons8.com/color/96/postgreesql.png" alt="PostgreSQL"/><br><b>PostgreSQL</b><br>Database</td>
    <td align="center"><img width="40" src="https://img.icons8.com/color/96/nodejs.png" alt="Node.js"/><br><b>Node.js</b><br>Runtime</td>
  </tr>
</table>
</div>

## 🛠️ Troubleshooting

<table>
  <thead>
    <tr>
      <th>Problem</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"Cannot find module 'xyz'"</td>
      <td>Run <code>npm install</code> to install dependencies</td>
    </tr>
    <tr>
      <td>"Database connection failed"</td>
      <td>Check your <code>.env</code> file and verify DATABASE_URL</td>
    </tr>
    <tr>
      <td>"Git pull failed"</td>
      <td>Commit local changes first with <code>git commit</code></td>
    </tr>
    <tr>
      <td>"Push rejected"</td>
      <td>Pull latest changes with <code>git pull</code> before pushing</td>
    </tr>
    <tr>
      <td>Prisma migration failed"</td>
      <td>Check error details or ask a team member</td>
    </tr>
  </tbody>
</table>

## 📞 Contact and Support

<div align="center">

### Need Help?

</div>

1. Check this README and the `docs/` folder
2. Ask in our team Google Chat Space
3. Contact the team lead or project manager

---

<div align="center">

## 🎉 Keys to Success

<table>
  <tr>
    <td align="center">📥 <b>Pull daily</b><br>before starting work</td>
    <td align="center">🌿 <b>Create specific branches</b><br>for each feature</td>
    <td align="center">📝 <b>Write clear commit messages</b></td>
  </tr>
  <tr>
    <td align="center">🧪 <b>Test thoroughly</b><br>before submitting PRs</td>
    <td align="center">❓ <b>Ask questions</b><br>when needed</td>
    <td align="center">🤝 <b>Collaborate</b><br>with your team members</td>
  </tr>
</table>

<p>We're excited to have you on the Seamless team! Together, we're transforming the custom tailoring industry. 🚀</p>

</div>

---

<div align="center">
  © 2025 SeamLess - All Rights Reserved
</div>
