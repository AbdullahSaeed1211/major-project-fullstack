# BrainWise

BrainWise is a comprehensive web application designed to help users with brain recovery and cognitive improvement through health tracking, personalized goals, and cognitive training games.

## 🧠 Features

- **Health Metrics Tracking**: Monitor vital signs and health indicators that affect brain health
- **Cognitive Training Games**: Play games that target specific cognitive domains
- **Goal Setting & Progress Tracking**: Set personalized brain health goals and track progress
- **AI-Powered Insights**: Get personalized recommendations based on your health data
- **Data Visualization**: View your progress through interactive charts and visualizations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB instance (local or Atlas)
- Google Cloud Storage account (for ML models)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/brain-ai.git
   cd brain-ai
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```
   # Create a .env.local file with the following variables
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLOUD_PROJECT_ID=your_gcp_project_id
   GOOGLE_CLOUD_BUCKET_NAME=your_bucket_name
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Documentation

Detailed documentation can be found in the `/docs` directory:

- [Architecture Overview](docs/architecture-overview.md)
- [Authentication System](docs/authentication-system.md)
- [Health Metrics System](docs/health-metrics-system.md)
- [ML & Google Cloud Integration](docs/ml-google-cloud-integration.md)
- [Data Visualization](docs/data-visualization.md)
- [Newsletter Implementation](docs/newsletter-implementation.md)

## 🧩 Project Structure

```
brain-ai/
├── app/                  # Next.js 14 App Router pages & API routes
├── components/           # React components
├── lib/                  # Utility functions and shared logic
├── public/               # Static assets
├── types/                # TypeScript type definitions
├── docs/                 # Documentation
└── ...
```

## 🔧 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, MongoDB
- **Machine Learning**: TensorFlow.js, Google Cloud Storage
- **Visualization**: Recharts, Framer Motion
- **Authentication**: Custom auth (with plans to migrate to Clerk)

## 🌱 Development Roadmap

- [x] Health metrics tracking system
- [x] Cognitive training games (basic implementation)
- [x] Goal setting and progress tracking
- [ ] Machine learning model integration
- [ ] Advanced data analytics dashboard
- [ ] Newsletter system
- [ ] Mobile optimization

## 🔒 Security & Privacy

BrainWise prioritizes the security and privacy of health data:

- All health data is associated with user IDs
- Authentication required for all sensitive operations
- No third-party access to health information
- HIPAA-informed practices for handling sensitive data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📱 Contact

Project Link: [https://github.com/yourusername/brain-ai](https://github.com/yourusername/brain-ai)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)