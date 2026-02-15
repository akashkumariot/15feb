# Shivratri Special - Deployment Guide

## 🚀 Deploy to Vercel

Follow these steps to deploy your project online:

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Navigate to your project folder**:
```bash
cd "c:\Users\Akash\OneDrive\Desktop\15 feb"
```

3. **Deploy**:
```bash
vercel
```

4. **Follow the prompts**:
   - Login to Vercel (if first time)
   - Set up and deploy
   - Choose project name
   - Confirm deployment

5. **Get your live URL** - Vercel will give you a URL like:
   `https://your-project-name.vercel.app`

### Option 2: Using Vercel Website (Easier)

1. **Go to**: https://vercel.com
2. **Sign up/Login** with GitHub, GitLab, or Email
3. **Click "Add New Project"**
4. **Import your project**:
   - Click "Browse" or drag & drop
   - Select the folder: `c:\Users\Akash\OneDrive\Desktop\15 feb`
5. **Click "Deploy"**
6. **Wait 30-60 seconds** for deployment
7. **Get your live URL!**

### Option 3: Using Git + Vercel (Best for updates)

1. **Initialize Git** (if not already):
```bash
cd "c:\Users\Akash\OneDrive\Desktop\15 feb"
git init
git add .
git commit -m "Initial commit - Shivratri Special"
```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push

3. **Connect to Vercel**:
   - Go to vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

## 📝 Important Notes

- **Music file**: The `mp 3.mp3` file will be deployed
- **Image**: Make sure your image URL is accessible or use a local image
- **Custom domain**: You can add a custom domain in Vercel settings

## 🎉 After Deployment

Your project will be live at: `https://your-project.vercel.app`

Share this link with your girlfriend! 💖

## 🔄 Updates

To update your deployed site:
- **CLI**: Run `vercel --prod` again
- **Git**: Just push to GitHub (auto-deploys)
- **Website**: Re-upload the folder

---

**Need help?** Check Vercel docs: https://vercel.com/docs
