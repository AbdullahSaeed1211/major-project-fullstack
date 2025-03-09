# Brain AI - Comprehensive Brain Health Assistant

Brain AI is a multimodal brain health AI assistant that employs machine learning for stroke prediction, tumor classification, Alzheimer's detection, and provides an interactive chatbot for brain health information.

## Features

- **Stroke Prediction**: Analyze risk factors and predict stroke likelihood with our advanced ML model
- **Tumor Detection**: Upload MRI scans for AI-powered brain tumor detection and analysis
- **Alzheimer's Detection**: Early detection using MRI scans and cognitive assessments
- **AI Chatbot**: Get instant answers to your questions about brain health
- **User Profiles**: Track health metrics and assessment history
- **Authentication**: Secure user authentication with Clerk
- **Database Integration**: MongoDB for data persistence

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, Shadcn UI
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **Machine Learning**: TensorFlow.js (client-side ML)
- **Styling**: Tailwind CSS with custom Magic UI design system
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB instance)
- Clerk account for authentication

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/brain-ai.git
   cd brain-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
   CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   CLERK_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brain-ai?retryWrites=true&w=majority
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting up Clerk Webhooks

1. Go to your Clerk Dashboard
2. Navigate to Webhooks
3. Create a new webhook with the endpoint: `https://your-domain.com/api/webhook/clerk`
4. Select the following events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. Copy the signing secret to your `.env.local` file as `CLERK_WEBHOOK_SECRET`

### Setting up MongoDB

1. Create a MongoDB Atlas cluster or use a local MongoDB instance
2. Create a database named `brain-ai`
3. Update the `MONGODB_URI` in your `.env.local` file with your connection string

## Project Structure

```
brain-ai/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard page
│   ├── profile/            # User profile page
│   ├── sign-in/            # Sign in page
│   ├── sign-up/            # Sign up page
│   ├── stroke-prediction/  # Stroke prediction page
│   ├── tumor-detection/    # Tumor detection page
│   ├── alzheimers-detection/ # Alzheimer's detection page
│   ├── chatbot/            # Chatbot page
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── ui/                 # Shadcn UI components
│   ├── stroke-form.tsx     # Stroke prediction form
│   ├── tumor-detection-form.tsx # Tumor detection form
│   ├── alzheimers-detection-form.tsx # Alzheimer's detection form
│   ├── chat-interface.tsx  # Chatbot interface
│   ├── user-profile.tsx    # User profile component
│   └── ...
├── lib/                    # Utility functions and models
│   ├── models/             # MongoDB models
│   ├── mongodb.ts          # MongoDB connection
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
└── ...
```

## Deployment

The easiest way to deploy the application is using Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set up the environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The stroke prediction model is based on the [Kaggle Stroke Prediction Dataset](https://www.kaggle.com/fedesoriano/stroke-prediction-dataset).
- Special thanks to all contributors and the open-source community.
#   m a j o r - p r o j e c t - f u l l s t a c k  
 