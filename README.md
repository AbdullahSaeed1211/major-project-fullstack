# Brainwise: Brain Health & Cognitive Training Platform

A comprehensive application for brain health assessment, cognitive training, and stroke risk prediction.

## Core Features

- **Cognitive Training Games**: Interactive games to improve memory, attention, and reaction time
- **Stroke Risk Prediction**: Analyze health factors to estimate stroke risk
- **Cognitive Score Tracking**: Monitor progress across different cognitive domains
- **User Authentication**: Secure account management with Clerk
- **Persistent Data Storage**: MongoDB integration for user data
- **Responsive Design**: Optimized for both desktop and mobile
- **Dark/Light Mode**: Theme support for different preferences

## Architecture

- **Frontend**: Next.js App Router, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes with MongoDB
- **Authentication**: Clerk for user management
- **Database**: MongoDB with Mongoose ODM
- **UI Framework**: Shadcn UI components

## Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database (Atlas recommended)
- Clerk account for authentication

### Environment Variables

Create a `.env.local` file with the following:

```
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brainwise?retryWrites=true&w=majority

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_WEBHOOK_SECRET=your-clerk-webhook-secret

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/brainwise.git
cd brainwise
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Brain Training Games
- **Memory Game**: Test and improve your visual memory with card matching
- **Reaction Game**: Improve your reaction time and processing speed
- **Concentration Game**: Enhance focus and sustained attention

### Data Persistence
- Authenticated users: Data stored in MongoDB
- Anonymous users: Data stored in browser localStorage

### API Endpoints
- User profile management
- Game results storage and retrieval
- Cognitive score tracking
- Activity history
- Newsletter subscriptions

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.