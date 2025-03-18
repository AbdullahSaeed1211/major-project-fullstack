# Brain-AI: Stroke Risk Prediction Platform

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
git clone https://github.com/yourusername/brain-ai.git
cd brain-ai
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## Potential Simple Add-ons

Consider these easy-to-implement enhancements:

1. **Health Tips API Integration**:
   - Connect to a health tips API like [api-ninjas.com](https://api-ninjas.com/api/facts) to display health facts
   - Implement with a simple fetch call and display in the UI

2. **BMI Calculator**:
   - Add a BMI calculator tool as a standalone feature
   - Could use existing form inputs from stroke prediction

3. **Export Results**:
   - Allow users to export prediction results as PDF
   - Implement with libraries like jsPDF

4. **Nutrition Information**:
   - Connect to a free nutrition API like [Edamam](https://developer.edamam.com/food-database-api)
   - Show basic nutritional guidance related to stroke prevention

5. **Weather-Health Correlation**:
   - Integrate a weather API to show how current weather might affect those at risk
   - Use free APIs like OpenWeatherMap or WeatherAPI

These add-ons can be implemented with minimal code changes and enhance the user experience without requiring complex ML models.

## Usage

Visit `http://localhost:3000` to access the application. Create an account or sign in to use the stroke prediction tool.