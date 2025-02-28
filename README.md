<div align="center">
  
# ✨ Seamless ✨

<img src="https://raw.githubusercontent.com/Carlalagat/Seamless-API/main/docs/assets/logo.png" alt="Seamless Logo" width="180" height="180" style="border-radius: 20px;">

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

<div style="display: flex; justify-content: space-between; margin: 20px 0; gap: 40px;">
  <div style="width: 48%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 20px; border-radius: 12px; color: white;">
    <h3>👗 For Customers</h3>
    <ul>
      <li>Request custom-tailored garments</li>
      <li>Submit accurate self-measurements using instructional videos</li>
      <li>Select tailors based on skills and pricing</li>
      <li>Track orders from creation to delivery</li>
    </ul>
  </div>
  <div style="width: 48%; background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 20px; border-radius: 12px; color: white;">
    <h3>👗 For Tailors</h3>
    <ul>
      <li>Access a broader customer base</li>
      <li>Order management tools</li>
      <li>Communication channels with clients</li>
      <li>Portfolio showcase for attracting customers</li>
    </ul>
  </div>
</div>

## 🚀 Getting Started

### Required Tools

Before diving into the Seamless project, you'll need to set up your development environment:

<div style="display: flex; justify-content: space-between; flex-wrap: wrap; margin: 20px 0;">
  <div style="width: 100%; background-color: #1e293b; padding: 15px; border-radius: 12px; margin-bottom: 15px;">
    <h3 style="color: #38bdf8;">🔄 Install Git</h3>
    <div style="background-color: #0f172a; padding: 10px; border-radius: 6px; margin-top: 10px;">
      <p style="color: #94a3b8; margin: 0;">Windows:</p>
      <code style="color: #38bdf8;">
        # Download from git-scm.com<br>
        git --version
      </code>
    </div>
    <div style="background-color: #0f172a; padding: 10px; border-radius: 6px; margin-top: 10px;">
      <p style="color: #94a3b8; margin: 0;">macOS:</p>
      <code style="color: #38bdf8;">
        brew install git<br>
        git --version
      </code>
    </div>
    <div style="background-color: #0f172a; padding: 10px; border-radius: 6px; margin-top: 10px;">
      <p style="color: #94a3b8; margin: 0;">Linux:</p>
      <code style="color: #38bdf8;">
        sudo apt install git<br>
        git --version
      </code>
    </div>
  </div>
  
  <div style="width: 100%; background-color: #1e293b; padding: 15px; border-radius: 12px; margin-bottom: 15px;">
    <h3 style="color: #4ade80;">📦 Install Node.js</h3>
    <div style="background-color: #0f172a; padding: 10px; border-radius: 6px; margin-top: 10px;">
      <p style="color: #94a3b8; margin: 0;">All Platforms:</p>
      <code style="color: #4ade80;">
        # Download LTS from nodejs.org<br>
        node --version<br>
        npm --version
      </code>
    </div>
  </div>
  
  <div style="width: 100%; background-color: #1e293b; padding: 15px; border-radius: 12px; margin-bottom: 15px;">
    <h3 style="color: #a78bfa;">🧰 Install Code Editor</h3>
    <ul style="color: white; padding-left: 20px;">
      <li>Download VS Code</li>
      <li>Install extensions:
        <ul>
          <li>ESLint</li>
          <li>Prettier</li>
          <li>GitLens</li>
          <li>JavaScript snippets</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

### Understanding Git & GitHub

<div style="background-color: #0f172a; padding: 20px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #f472b6; margin-top: 0;">🌿 Key Git Concepts</h3>
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    <div style="width: 48%; margin-bottom: 10px;">
      <p style="color: #e879f9; margin-bottom: 5px;">📁 Repository</p>
      <p style="color: #d1d5db; margin-top: 0;">Your project's home on GitHub</p>
    </div>
    <div style="width: 48%; margin-bottom: 10px;">
      <p style="color: #e879f9; margin-bottom: 5px;">📥 Clone</p>
      <p style="color: #d1d5db; margin-top: 0;">Creating a local copy on your computer</p>
    </div>
    <div style="width: 48%; margin-bottom: 10px;">
      <p style="color: #e879f9; margin-bottom: 5px;">🌿 Branch</p>
      <p style="color: #d1d5db; margin-top: 0;">A separate version for feature development</p>
    </div>
    <div style="width: 48%; margin-bottom: 10px;">
      <p style="color: #e879f9; margin-bottom: 5px;">💾 Commit</p>
      <p style="color: #d1d5db; margin-top: 0;">Saving your changes locally</p>
    </div>
    <div style="width: 48%; margin-bottom: 10px;">
      <p style="color: #e879f9; margin-bottom: 5px;">📤 Push</p>
      <p style="color: #d1d5db; margin-top: 0;">Uploading your commits to GitHub</p>
    </div>
    <div style="width: 48%; margin-bottom: 10px;">
      <p style="color: #e879f9; margin-bottom: 5px;">📥 Pull</p>
      <p style="color: #d1d5db; margin-top: 0;">Downloading changes from GitHub</p>
    </div>
  </div>
</div>

### Cloning the Project

```bash
# 1. Create a GitHub account at github.com
# 2. Get added as a collaborator by your team lead
# 3. Clone the repository:
git clone https://github.com/Carlalagat/Seamless-API.git
cd Seamless-API
```

### Project Setup

<div style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 25px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #60a5fa; margin-top: 0;">⚙️ Quick Setup Steps</h3>
  
  <div style="margin: 15px 0;">
    <p style="color: #93c5fd; margin-bottom: 5px;">1️⃣ Install Dependencies</p>
    <div style="background-color: #0f172a; padding: 10px; border-radius: 6px;">
      <code style="color: #38bdf8;">npm install</code>
    </div>
  </div>
  
  <div style="margin: 15px 0;">
    <p style="color: #93c5fd; margin-bottom: 5px;">2️⃣ Configure Environment</p>
    <div style="background-color: #0f172a; padding: 10px; border-radius: 6px;">
      <code style="color: #38bdf8;">cp .env.example .env</code>
    </div>
  </div>
  
  <div style="margin: 15px 0;">
    <p style="color: #93c5fd; margin-bottom: 5px;">3️⃣ Set Up Database</p>
    <div style="background-color: #0f172a; padding: 10px; border-radius: 6px;">
      <code style="color: #38bdf8;">
        npm run prisma:generate<br>
        npm run prisma:migrate<br>
        npm run prisma:seed
      </code>
    </div>
  </div>
  
  <div style="margin: 15px 0;">
    <p style="color: #93c5fd; margin-bottom: 5px;">4️⃣ Start Development Server</p>
    <div style="background-color: #0f172a; padding: 10px; border-radius: 6px;">
      <code style="color: #38bdf8;">npm run dev</code>
    </div>
    <p style="color: #94a3b8; margin-top: 5px;">Server will start at http://localhost:3000</p>
  </div>
</div>

## 📅 Daily Workflow

### 🌿 Branch Management

<div style="display: flex; justify-content: space-between; margin: 15px; gap: 10px;">
  <div style="background-color: #238636; color: white; padding: 10px; border-radius: 5px; width: 30%;">
    <strong>main</strong><br>Production-ready code
  </div>
  <div style="background-color: #8957e5; color: white; padding: 10px; border-radius: 5px; width: 30%;">
    <strong>develop</strong><br>Integration branch
  </div>
</div>

### Creating & Working with Branches

<div style="background-color: #0d1117; padding: 20px; border-radius: 12px; margin: 20px 0;">
  <div style="margin-bottom: 15px;">
    <p style="color: #8b949e; margin-bottom: 5px;">Start from develop branch</p>
    <div style="background-color: #161b22; padding: 10px; border-radius: 6px;">
      <code style="color: #ff7b72;">git checkout develop</code>
    </div>
  </div>
  
  <div style="margin-bottom: 15px;">
    <p style="color: #8b949e; margin-bottom: 5px;">Get latest changes</p>
    <div style="background-color: #161b22; padding: 10px; border-radius: 6px;">
      <code style="color: #ff7b72;">
        git fetch<br>
        git pull origin develop
      </code>
    </div>
  </div>
  
  <div style="margin-bottom: 15px;">
    <p style="color: #8b949e; margin-bottom: 5px;">Make your changes...</p>
  </div>
  
  <div style="margin-bottom: 15px;">
    <p style="color: #8b949e; margin-bottom: 5px;">Check what files you've changed</p>
    <div style="background-color: #161b22; padding: 10px; border-radius: 6px;">
      <code style="color: #ff7b72;">git status</code>
    </div>
  </div>
  
  <div style="margin-bottom: 15px;">
    <p style="color: #8b949e; margin-bottom: 5px;">Stage and commit your changes</p>
    <div style="background-color: #161b22; padding: 10px; border-radius: 6px;">
      <code style="color: #ff7b72;">
        git add .<br>
        git commit -m "Add user registration form and validation"
      </code>
    </div>
  </div>
  
  <div style="margin-bottom: 15px;">
    <p style="color: #8b949e; margin-bottom: 5px;">Push your changes</p>
    <div style="background-color: #161b22; padding: 10px; border-radius: 6px;">
      <code style="color: #ff7b72;">git push -u origin develop</code>
    </div>
  </div>
</div>

### Pull Request Process

<div style="background: linear-gradient(135deg, #8957e5, #d2a8ff); padding: 20px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="margin-top: 0;">🔄 Creating a Pull Request</h3>
  <ol style="padding-left: 20px;">
    <li>Go to the repository on GitHub</li>
    <li>Click "Pull requests" → "New pull request"</li>
    <li>Set "base" to <code style="background-color: rgba(0,0,0,0.2); padding: 2px 5px; border-radius: 3px;">develop</code> and "compare" to your feature branch</li>
    <li>Add a title and description</li>
    <li>Assign reviewers from your team</li>
    <li>Submit the pull request</li>
  </ol>
</div>

## 🧪 Testing

### Using Postman

<div style="background-color: #1a1a1a; padding: 20px; border-radius: 12px; margin: 20px 0;">
  <h3 style="color: #ff6c37; margin-top: 0;">🔍 Postman API Testing</h3>
  
  <p style="color: #d1d5db;">Postman is essential for testing our API endpoints:</p>
  
  <ol style="color: #d1d5db; padding-left: 20px;">
    <li>Download from <a href="https://www.postman.com/downloads/" style="color: #ff6c37; text-decoration: none;">postman.com</a></li>
    <li>Create requests for our endpoints:</li>
  </ol>
  
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 15px;">
    <div style="width: 48%; background-color: #2e2e2e; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
      <p style="color: #10b981; margin: 0;">GET /api/products</p>
      <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 0.9em;">Get all products</p>
    </div>
    <div style="width: 48%; background-color: #2e2e2e; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
      <p style="color: #f59e0b; margin: 0;">POST /api/products</p>
      <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 0.9em;">Create a product</p>
    </div>
    <div style="width: 48%; background-color: #2e2e2e; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
      <p style="color: #10b981; margin: 0;">GET /api/products/:id</p>
      <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 0.9em;">Get one product</p>
    </div>
    <div style="width: 48%; background-color: #2e2e2e; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
      <p style="color: #3b82f6; margin: 0;">PUT /api/products/:id</p>
      <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 0.9em;">Update a product</p>
    </div>
    <div style="width: 48%; background-color: #2e2e2e; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
      <p style="color: #ef4444; margin: 0;">DELETE /api/products/:id</p>
      <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 0.9em;">Delete a product</p>
    </div>
  </div>
</div>

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

<div style="background-color: #0d1117; padding: 20px; border-radius: 12px; margin: 20px 0; color: #e6edf3;">
  <pre style="margin: 0; overflow-x: auto;">
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
  </pre>
</div>

### Key Technologies

<div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin: 20px 0;">
  <div style="width: 18%; background-color: #13795b; padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 15px;">
    <h3 style="color: white; margin-top: 0;">Express</h3>
    <p style="color: #d1fae5; margin-bottom: 0;">Web API framework</p>
  </div>
  <div style="width: 18%; background-color: #4f46e5; padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 15px;">
    <h3 style="color: white; margin-top: 0;">Prisma</h3>
    <p style="color: #e0e7ff; margin-bottom: 0;">ORM for database</p>
  </div>
  <div style="width: 18%; background-color: #b45309; padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 15px;">
    <h3 style="color: white; margin-top: 0;">JWT</h3>
    <p style="color: #fef3c7; margin-bottom: 0;">Authentication</p>
  </div>
  <div style="width: 18%; background-color: #0284c7; padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 15px;">
    <h3 style="color: white; margin-top: 0;">Cloudinary</h3>
    <p style="color: #e0f2fe; margin-bottom: 0;">Image storage</p>
  </div>
  <div style="width: 18%; background-color: #4338ca; padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 15px;">
    <h3 style="color: white; margin-top: 0;">PostgreSQL</h3>
    <p style="color: #e0e7ff; margin-bottom: 0;">Database</p>
  </div>
</div>

## 🛠️ Troubleshooting

<div style="background-color: #161b22; padding: 20px; border-radius: 12px; margin: 20px 0; overflow-x: auto;">
  <table style="width: 100%; border-collapse: collapse; color: #e6edf3;">
    <thead>
      <tr style="background-color: #0d1117;">
        <th style="padding: 10px; text-align: left; border-bottom: 1px solid #30363d;">Problem</th>
        <th style="padding: 10px; text-align: left; border-bottom: 1px solid #30363d;">Solution</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #30363d;">"Cannot find module 'xyz'"</td>
        <td style="padding: 10px; border-bottom: 1px solid #30363d;">Run <code style="background-color: #2e2e2e; padding: 2px 5px; border-radius: 3px;">npm install</code> to install dependencies</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #30363d;">"Database connection failed"</td>
        <td style="padding: 10px; border-bottom: 1px solid #30363d;">Check your <code style="background-color: #2e2e2e; padding: 2px 5px; border-radius: 3px;">.env</code> file and verify DATABASE_URL</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #30363d;">"Git pull failed"</td>
        <td style="padding: 10px; border-bottom: 1px solid #30363d;">Commit local changes first with <code style="background-color: #2e2e2e; padding: 2px 5px; border-radius: 3px;">git commit</code></td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #30363d;">"Push rejected"</td>
        <td style="padding: 10px; border-bottom: 1px solid #30363d;">Pull latest changes with <code style="background-color: #2e2e2e; padding: 2px 5px; border-radius: 3px;">git pull</code> before pushing</td>
      </tr>
      <tr>
        <td style="padding: 10px;">Prisma migration failed"</td>
        <td style="padding: 10px;">Check error details or ask a team member</td>
      </tr>
    </tbody>
  </table>
</div>

## 📞 Contact and Support

<div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 20px; border-radius: 12px; margin: 20px 0; color: white;">
  <h3 style="margin-top: 0;">Need Help?</h3>
  <ol style="padding-left: 20px;">
    <li>Check this README and the <code style="background-color: rgba(0,0,0,0.2); padding: 2px 5px; border-radius: 3px;">docs/</code> folder</li>
    <li>Ask in our team Google Chat Space</li>
    <li>Contact the team lead or project manager</li>
  </ol>
</div>

---

<div style="background: linear-gradient(135deg, #0ea5e9, #2dd4bf); padding: 25px; border-radius: 12px; margin: 20px 0; color: white; text-align: center;">
  <h2 style="margin-top: 0;">🎉 Keys to Success</h2>
  <ul style="list-style-type: none; padding: 0; display: flex; flex-wrap: wrap; justify-content: space-between;">
    <li style="width: 30%; margin-bottom: 15px; text-align: center;">📥 <strong>Pull daily</strong> before starting work</li>
    <li style="width: 30%; margin-bottom: 15px; text-align: center;">🌿 <strong>Create specific branches</strong> for each feature</li>
    <li style="width: 30%; margin-bottom: 15px; text-align: center;">📝 <strong>Write clear commit messages</strong></li>
    <li style="width: 30%; margin-bottom: 15px; text-align: center;">🧪 <strong>Test thoroughly</strong> before submitting PRs</li>
    <li style="width: 30%; margin-bottom: 15px; text-align: center;">❓ <strong>Ask questions</strong> when needed</li>
    <li style="width: 30%; margin-bottom: 15px; text-align: center;">🤝 <strong>Collaborate</strong> with your team members</li>
  </ul>
  <p>We're excited to have you on the Seamless team! Together, we're transforming the custom tailoring industry. 🚀</p>
</div>

---

<div style="text-align: center; margin-top: 30px; color: #8b949e;">
  © 2025 SeamLess - All Rights Reserved
</div>