# Brainwise: Stroke Risk Prediction Platform

A streamlined application for assessing stroke risk based on health factors.

## Core Features

- **Stroke Risk Prediction**: Analyze health factors to estimate stroke risk
- **User Authentication**: Secure account management with Clerk
- **Responsive Design**: Optimized for both desktop and mobile
- **Dark/Light Mode**: Theme support for different preferences

## Architecture

- **Frontend**: Next.js App Router, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes
- **Authentication**: Clerk for user management
- **UI Framework**: Shadcn UI components

## Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Clerk account for authentication

### Environment Variables

Create a `.env` file with the following:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

# Optional settings
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

```