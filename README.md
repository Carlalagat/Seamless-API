# Seamless - Tailor-Made Clothing Platform 👔👗

Welcome to the Seamless project! This platform connects clients with tailors for custom-made clothing through a user-friendly interface. This guide will walk you through everything you need to know to get started, even if you've never used Git, GitHub, or any of our technical tools before.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Getting Started From Zero](#getting-started-from-zero)
  - [Setting Up Your Computer](#setting-up-your-computer)
  - [Understanding Git and GitHub](#understanding-git-and-github)
  - [Cloning the Project](#cloning-the-project)
  - [Project Setup](#project-setup)
- [Daily Workflow](#daily-workflow)
  - [Branches Explained](#branches-explained)
  - [Creating and Switching Branches](#creating-and-switching-branches)
  - [Making Changes](#making-changes)
  - [Committing and Pushing Changes](#committing-and-pushing-changes)
  - [Creating Pull Requests](#creating-pull-requests)
- [Testing Your Code](#testing-your-code)
  - [Using Postman](#using-postman)
  - [Uploading Files to Cloudinary](#uploading-files-to-cloudinary)
- [Understanding Our Code](#understanding-our-code)
  - [Folder Structure](#folder-structure)
  - [Key Technologies](#key-technologies)
- [Troubleshooting](#troubleshooting)
- [Contact and Support](#contact-and-support)

## 🚀 Project Overview

Seamless is an innovative web application designed to transform the custom tailoring industry by enabling clients to access tailor-made clothing remotely.

For customers, Seamless allows:
- Requesting custom-tailored garments
- Submitting accurate self-measurements using instructional videos
- Selecting tailors based on skills and pricing
- Tracking orders from creation to delivery

For tailors, Seamless provides:
- Access to a broader customer base
- Order management tools
- Communication channels with clients

## 🏁 Getting Started From Zero

### Setting Up Your Computer

Before you can work on the Seamless project, you need to install some essential tools:

#### 1. Install Git

Git is a version control system that helps us track changes to our code and collaborate with others.

**For Windows:**
1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer, using the default options
3. Verify installation by opening Command Prompt and typing:
   ```
   git --version
   ```

**For macOS:**
1. If you have Homebrew, run:
   ```
   brew install git
   ```
   Otherwise, download from [git-scm.com](https://git-scm.com/download/mac)
2. Verify installation by opening Terminal and typing:
   ```
   git --version
   ```

**For Linux:**
1. For Ubuntu/Debian:
   ```
   sudo apt update
   sudo apt install git
   ```
2. For Fedora:
   ```
   sudo dnf install git
   ```
3. Verify installation:
   ```
   git --version
   ```

#### 2. Install Node.js and npm

Node.js is the environment that runs our JavaScript code, and npm (Node Package Manager) helps us install and manage libraries.

1. Download Node.js from [nodejs.org](https://nodejs.org/) (choose the LTS version)
2. Run the installer with default options
3. Verify installation by opening Command Prompt/Terminal and typing:
   ```
   node --version
   npm --version
   ```

#### 3. Install a Code Editor

We recommend Visual Studio Code:
1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Run the installer with default options
3. Helpful extensions to install:
   - ESLint
   - Prettier
   - JavaScript (ES6) code snippets
   - GitLens

### Understanding Git and GitHub

**What is Git?** Git is a tool that tracks changes to our code over time. It allows multiple people to work on the same project without overwriting each other's work.

**What is GitHub?** GitHub is a website that hosts Git repositories (projects) in the cloud, making it easy to share and collaborate on code.

**Key Concepts:**
- **Repository (Repo)**: A project folder tracked by Git
- **Clone**: Making a local copy of a repository on your computer
- **Branch**: A separate version of the code for working on specific features
- **Commit**: Saving your changes to the local repository
- **Push**: Uploading your commits to GitHub
- **Pull**: Downloading changes from GitHub to your computer
- **Pull Request (PR)**: Asking to merge your changes into the main project

### Cloning the Project

1. Create a GitHub account at [github.com](https://github.com) if you don't have one
2. Ask the project administrator to add you as a collaborator to the Seamless repository
3. Go to the repository page (link will be provided by your team lead)
4. Click the green "Code" button and copy the HTTPS URL
   ![Clone URL](https://via.placeholder.com/400x200?text=GitHub+Clone+Button)
5. Open Command Prompt/Terminal
6. Navigate to where you want to store the project:
   ```
   cd Documents
   mkdir Projects
   cd Projects
   ```
7. Clone the repository:
   ```
   git clone https://github.com/yourusername/seamless-api.git
   ```
8. Enter your GitHub username and password if prompted
9. Move into the project folder:
   ```
   cd seamless-api
   ```

### Project Setup

Now that you have the code on your computer, let's set it up:

#### 1. Install Project Dependencies

```
npm install
```

This command reads the `package.json` file and installs all the libraries our project needs. It might take a few minutes.

#### 2. Set Up Environment Variables

1. Look for a file called `.env.example` in the project
2. Create a new file called `.env` in the same location
3. Copy the contents from `.env.example` to `.env`
4. Ask your team lead for the actual values to put in this file (database credentials, API keys, etc.)

#### 3. Set Up the Database

Our project uses PostgreSQL with Prisma to manage the database:

1. Make sure PostgreSQL is installed on your computer or you have access to a PostgreSQL database
2. Update the `DATABASE_URL` in your `.env` file 
3. Run database migrations to create the necessary tables:
   ```
   npm run prisma:generate
   ```
   ```
   npm run prisma:migrate
   ```
4. Seed the database with initial data:
   ```
   npm run prisma:seed
   ```

#### 4. Start the Development Server

```
npm run dev
```

This command starts the server at `http://localhost:3000` (or the port specified in your `.env` file). You should see a message like "Server running on port 3000".

## 📅 Daily Workflow

### Branches Explained

Think of branches like separate working areas for different features or changes:

- **main**: The production-ready code that is live on our servers
- **develop**: The integration branch where features come together before release
- **feature branches**: Where individual features are developed before merging to develop

**Why we use branches:**
- They prevent multiple developers from interfering with each other's work
- They keep unstable code away from our production environment
- They make it easier to track what changes are related to which feature

### Creating and Switching Branches

**IMPORTANT:** Always create feature branches from the `develop` branch, not from `main`.

#### Step 1: Make sure you're on the develop branch

```
git checkout develop
```

This command switches you to the develop branch.

#### Step 2: Get the latest changes

Before creating a new branch, always get the latest code:

```
git fetch
git pull origin main
```

**Why this is important:** 
- `git fetch` checks for any changes on GitHub
- `git pull origin main` downloads those changes to your computer
- Doing this daily prevents conflicts and ensures you're working with the latest code

### Making Changes

Now you can make changes to the code using your code editor (like VS Code).

### Committing and Pushing Changes

After you've made some changes and tested that they work:

#### Step 1: Check what files you've changed

```
git status
```

This shows which files have been modified.

#### Step 2: Add your changes to staging

```
git add .
```

The `.` means "add all changed files". If you only want to add specific files, replace `.` with the file path.

#### Step 3: Commit your changes

```
git commit -m "Add user registration form and validation"
```

Replace the message with a brief description of what you did. Always use present tense ("Add" not "Added").

#### Step 4: Push your changes to GitHub

```
git push -u origin develop
```

Replace "develop" with your branch name. The `-u` flag sets up tracking, and you only need it the first time you push a new branch.

For subsequent pushes, you can simply use:

```
git push
```

### Creating Pull Requests

Once your feature is complete and pushed to GitHub:

1. Go to the repository page on GitHub
2. Click on "Pull requests"
3. Click the green "New pull request" button
4. Set "base" to `main` and "compare" to your `develop` branch
5. Click "Create pull request"
6. Add a title and description explaining what your changes do
7. Assign a reviewer from the team
8. Click "Create pull request"

Your team members will review your code and either approve it or request changes. Once approved, your code will be merged into the `develop` branch.

## 🧪 Testing Your Code

### Using Postman

Postman is a tool for testing APIs like ours. Here's how to use it:

1. Download and install Postman from [postman.com](https://www.postman.com/downloads/)
2. Open Postman and create a new request
3. Set the HTTP method (GET, POST, PUT, DELETE)
4. Enter the URL (e.g., `http://localhost:3000/api/products`)
5. For POST or PUT requests, go to the "Body" tab:
   - Select "raw" and then "JSON"
   - Enter your data in JSON format:
     ```json
     {
       "name": "Custom Suit",
       "price": 199.99,
       "description": "Tailored wool suit"
     }
     ```
6. Click "Send" to make the request
7. View the response below

**Common API endpoints in our project:**
- `GET /api/products`: Get all products
- `POST /api/products`: Create a new product
- `GET /api/products/:id`: Get a specific product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

### Uploading Files to Cloudinary

Our project uses Cloudinary to store images. Here's how to upload files:

#### Using Postman:

1. Create a new POST request to `http://localhost:3000/api/upload`
2. Go to the "Body" tab
3. Select "form-data"
4. Add a key named "image" and change the type from "Text" to "File"
5. Click "Select Files" and choose your image
6. Click "Send"
7. The response will include the Cloudinary URL to use in your application

#### In Code:

```javascript
// Example code for uploading an image to Cloudinary
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

## 🧩 Understanding Our Code

### Folder Structure

```
seamless-api/
├── prisma/                  // Database configuration
│   ├── schema.prisma        // Database schema
│   └── seed/
│       └── seed.js          // Initial data seeding
├── src/
│   ├── controllers/         // Business logic
│   │   └── product.controller.js
│   ├── dto/                 // Data validation
│   │   └── product.dto.js
│   ├── helpers/             // Utility functions
│   │   └── enums.js
│   ├── routes/              // API endpoints
│   │   └── product.route.js
│   └── index.js             // Entry point
├── tests/                   // Automated tests
│   └── product.test.js
├── docs/                    // Documentation
│   └── architecture.md
├── .env                     // Environment variables
├── package.json             // Dependencies
└── README.md                // This file
```

**What each folder does:**

- **prisma/**: Contains database schema and initialization code
  - **schema.prisma**: Defines database tables and relationships
  - **seed.js**: Creates initial data for testing

- **src/**: Contains the main application code
  - **controllers/**: Implements business logic and handles requests
  - **dto/**: (Data Transfer Objects) Validates and structures request/response data
  - **helpers/**: Contains utility functions and constants
  - **routes/**: Defines API endpoints and connects them to controllers

- **tests/**: Contains automated tests to verify code works correctly

### Key Technologies

Our project uses several technologies you should understand:

1. **Express**: A framework for building web APIs with Node.js
   - Creates routes to handle HTTP requests (GET, POST, etc.)
   - Example: `app.get('/products', productController.getAllProducts);`

2. **Prisma**: An ORM (Object-Relational Mapping) for database access
   - Converts JavaScript code to database queries
   - Example: `prisma.product.findMany()` gets all products from the database

3. **JWT (JSON Web Tokens)**: For user authentication
   - Example: `const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);`

4. **Cloudinary**: For storing and serving images
   - Example: `cloudinary.uploader.upload(req.file.path)`

## 🛠️ Troubleshooting

**Problem: "Error: Cannot find module 'xyz'"**
- Solution: Run `npm install` to make sure all dependencies are installed

**Problem: "Error: Database connection failed"**
- Solution: Check your `.env` file to ensure DATABASE_URL is correct

**Problem: "Error: Git pull failed"**
- Solution: Make sure you've committed your local changes first with `git commit`

**Problem: "Error: Push rejected"**
- Solution: Pull the latest changes with `git pull` before pushing again

**Problem: "Prisma migration failed"**
- Solution: Check the error message for details or ask a team member for help

## 📞 Contact and Support

If you're stuck or have questions:

1. Check this README and other documentation in the `docs/` folder
2. Ask in our team Slack channel
3. Contact the team lead or project manager
4. For urgent issues, call the support hotline at +XXX-XXX-XXXX

---

## 🎉 Final Tips for Success

- **Pull latest changes every day** before you start working
- **Create a new branch** for each feature or bug fix
- **Write clear commit messages** so others understand your changes
- **Test your code** before creating pull requests
- **Ask questions** if you're unsure about anything

We're excited to have you on the Seamless team! Together, we're transforming the custom tailoring industry. 🚀

---

© 2025 Lish AI Labs - All Rights Reserved
