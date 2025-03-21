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
- **ML-Powered Assessment**: TensorFlow.js models for health risk prediction

## Current Status

### Working Features
- ✅ Multiple cognitive training games (Memory Game, Reaction Time Test, Sequence Memory)
- ✅ Dashboard with cognitive score tracking visualization
- ✅ Daily challenges system with streaks
- ✅ User authentication with Clerk
- ✅ Game results tracking and storage (both local and server-side)
- ✅ Dark/light mode toggle
- ✅ Analytics dashboard for cognitive progress
- ✅ Responsive UI with Tailwind CSS
- ✅ Assessment Report API with comprehensive analysis
- ✅ ML infrastructure for model loading and caching

### In Progress
- 🔄 ML model integration with Google Cloud Storage
- 🔄 Additional cognitive games (Pattern Recognition, Visual Attention)
- 🔄 MongoDB integration for data persistence
- 🔄 Daily challenges progress tracking
- 🔄 Achievement system

### Planned Features
- 📋 Brain scan analysis
- 📋 Newsletter functionality
- 📋 Mobile app version

## Architecture

- **Frontend**: Next.js App Router, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes with MongoDB
- **Authentication**: Clerk for user management
- **Database**: MongoDB with Mongoose ODM
- **UI Framework**: Shadcn UI components
- **Machine Learning**: TensorFlow.js with Google Cloud Storage for model hosting

## Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database (Atlas recommended)
- Clerk account for authentication
- Google Cloud Storage account (for ML model hosting)

### Environment Variables

Create a `.env.local` file with the following:

```
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brainwise?retryWrites=true&w=majority

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_WEBHOOK_SECRET=your-clerk-webhook-secret

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_BUCKET_NAME=your-ml-models-bucket

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

## Machine Learning Models

The application uses TensorFlow.js models for health risk predictions:

- **Stroke Risk Model**: Predicts stroke risk based on health metrics and demographics
- **Alzheimer's Risk Model**: Assesses cognitive decline risk based on various factors
- **Brain Tumor Detection Model**: Analyzes brain scan images for abnormalities (planned)

Models are hosted on Google Cloud Storage for production and loaded dynamically as needed, with fallback to simpler models when TensorFlow.js models are not available.

## Features

### Brain Training Games
- **Memory Game**: Test and improve your visual memory with card matching
- **Reaction Game**: Improve your reaction time and processing speed
- **Concentration Game**: Enhance focus and sustained attention
- **Sequence Memory**: Test and improve working memory capacity
- **Pattern Recognition**: Enhance pattern recognition abilities (in development)

### Data Persistence
- Authenticated users: Data stored in MongoDB
- Anonymous users: Data stored in browser localStorage

### API Endpoints
- User profile management
- Game results storage and retrieval
- Cognitive score tracking
- Activity history
- Newsletter subscriptions
- ML-powered health risk assessments
- Comprehensive cognitive assessment reports

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

## Implementation Notes

The current implementation uses a hybrid approach:
- For authenticated users, data is stored both in MongoDB and localStorage as a fallback
- For anonymous users, data is stored only in localStorage
- The UI is implemented with Shadcn UI components and Tailwind CSS for styling
- Cognitive games follow a consistent pattern for result tracking and scoring
- ML models use a model-loader architecture that supports caching and versioning

See the [TODO.md](./TODO.md) file for upcoming tasks and implementation priorities.