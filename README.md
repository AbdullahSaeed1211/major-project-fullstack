# BrainWise

BrainWise is a comprehensive web application designed to help users with brain health monitoring, stroke prediction, and cognitive enhancement through health tracking, personalized goals, and educational resources.

## 🧠 Features

- **Health Metrics Tracking**: Monitor vital signs and health indicators that affect brain health
- **Stroke Risk Prediction**: AI-powered stroke risk assessment using machine learning models
- **Research & Studies**: Access to latest peer-reviewed research on brain health and stroke prevention
- **Educational Resources**: Curated guides and video content from trusted sources
- **Cognitive Training Tools**: Interactive exercises for brain health improvement
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
   git clone https://github.com/AbdullahSaeed1211/brainwise.git
   cd brainwise
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
   SEMANTIC_SCHOLAR_API_KEY=your_api_key
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
- [Research Integration](docs/research-integration.md)

## 🧩 Project Structure

```
brainwise/
├── app/                  # Next.js 14 App Router pages & API routes
│   ├── api/             # API routes for ML models and data
│   ├── research/        # Research papers and studies
│   ├── tools/           # Brain health tools and assessments
│   └── dashboard/       # User dashboard and metrics
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── charts/         # Data visualization components
│   └── forms/          # Form components
├── lib/                 # Utility functions and shared logic
├── public/              # Static assets
├── types/               # TypeScript type definitions
└── docs/                # Documentation
```

## 🔧 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, MongoDB
- **Machine Learning**: TensorFlow.js, Google Cloud Storage
- **Research API**: Semantic Scholar API
- **Visualization**: Recharts, Framer Motion
- **Authentication**: Custom auth (with plans to migrate to Clerk)

## 🌱 Development Roadmap

- [x] Health metrics tracking system
- [x] Stroke risk prediction model
- [x] Research paper integration
- [x] Educational resources
- [x] Cognitive training tools
- [ ] Advanced data analytics dashboard
- [ ] Mobile optimization
- [ ] Newsletter system

## 🔒 Security & Privacy

BrainWise prioritizes the security and privacy of health data:

- All health data is associated with user IDs
- Authentication required for all sensitive operations
- No third-party access to health information
- HIPAA-informed practices for handling sensitive data
- Secure API key management

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

Project Link: [https://github.com/AbdullahSaeed1211/brainwise](https://github.com/AbdullahSaeed1211/brainwise)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Semantic Scholar](https://www.semanticscholar.org/)
- [TensorFlow.js](https://www.tensorflow.org/js)