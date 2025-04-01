# Ops UI Interactive Wireframes

## Overview
This project contains a basic React app for creating interactive wireframes for the TJ Ops UI. Use in conjunction with an AI IDE like Cursor or Windsurf.

## Getting Started
Copy the project to your local machine (e.g. C:\Code\Wireframes)and run the following commands:
```
npm install
npm run dev
```
## Source Control with Github
Create a Github repo for the project on the github.com site. Push the project to the repo:
```
cd C:\Code\Wireframes
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main

```
(NB if you are using SourceTree you will have to auth with github using a Personal Access Token (PAT).Generate one in GitHub under "Settings" > "Developer settings". When you clone the repo you have to use https://<your_token>@github.com/<username>/<repo.git>. )

## Hosting with Vercel
Create a Vercel account (if you haven’t already).
Use the Vercel CLI to deploy the project:
```
npm install -g vercel
vercel login
```
From your app’s directory (make sure you’re still in it with cd), run

```
vercel
```
Vercel will ask a few questions:
Scope: Choose your account (usually the default).

Link to existing project?: Select “No” (unless you’ve deployed this before).

Project name: Press Enter for the default (folder name) or type a custom one.

Directory: Confirm it’s the root (usually .) unless your app is in a subdirectory.

Vercel will detect it’s a React app, build it, and deploy it automatically.

Once deployment finishes, Vercel provides a URL (e.g., https://my-react-app.vercel.app). Visit it in your browser to see your live app!

Connect to GitHub (Optional for Auto-Deploys)
Go to your Vercel dashboard (vercel.com), find your project, and under “Settings” > “Git,” connect it to your GitHub repo.

Now, every time you push to GitHub, Vercel will auto-deploy the updates.

The default Vercel branch is "main". To push to "prod" (i.e. so the app is available on the short domain name) you have to push to "master" (this is configurable though).

## Project Structure
[Add project structure details here]

## Development
[Add development guidelines here]

## Contributing
[Add contribution guidelines here]
