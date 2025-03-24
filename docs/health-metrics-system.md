# Health Metrics Tracking System

## Overview

The Health Metrics Tracking System allows users to monitor various health indicators that may influence cognitive health and recovery. This system includes backend APIs for storing and retrieving health data, as well as frontend components for data entry and visualization.

## Database Schema

Health metrics are stored in MongoDB using the following schema:

```typescript
interface IHealthMetric {
  userId: string;
  type: MetricType;
  value: string;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

type MetricType = 
  | 'blood_pressure' 
  | 'heart_rate' 
  | 'weight' 
  | 'sleep' 
  | 'cholesterol' 
  | 'glucose' 
  | 'activity'
  | 'water'
  | 'meditation'
  | 'stress';
```

## API Endpoints

### GET /api/health-metrics

Retrieves health metrics for the authenticated user.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10)
- `startDate`: Filter metrics from this date (ISO format)
- `endDate`: Filter metrics until this date (ISO format)
- `type`: Filter by metric type

**Response:**
```json
{
  "metrics": [
    {
      "_id": "metric_id",
      "userId": "user_id",
      "type": "blood_pressure",
      "value": "120/80",
      "date": "2023-04-15T10:30:00Z",
      "notes": "After morning walk",
      "createdAt": "2023-04-15T10:35:00Z",
      "updatedAt": "2023-04-15T10:35:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "pages": 5
  }
}
```

### POST /api/health-metrics

Creates a new health metric record.

**Request Body:**
```json
{
  "type": "heart_rate",
  "value": "72",
  "date": "2023-04-15T10:30:00Z",
  "notes": "Resting heart rate"
}
```

**Response:**
```json
{
  "success": true,
  "healthMetric": {
    "_id": "new_metric_id",
    "userId": "user_id",
    "type": "heart_rate",
    "value": "72",
    "date": "2023-04-15T10:30:00Z",
    "notes": "Resting heart rate",
    "createdAt": "2023-04-15T10:35:00Z",
    "updatedAt": "2023-04-15T10:35:00Z"
  }
}
```

### DELETE /api/health-metrics

Deletes a health metric record.

**Query Parameters:**
- `id`: ID of the metric to delete

**Response:**
```json
{
  "success": true,
  "message": "Health metric deleted successfully"
}
```

### GET /api/health-metrics/analysis

Analyzes health metrics in relation to cognitive performance.

**Query Parameters:**
- `type`: Type of metric to analyze (default: "all")
- `domain`: Cognitive domain to analyze (default: "all")
- `timeRange`: Time range for analysis (options: "7d", "30d", "90d", "180d", "365d", "all"; default: "90d")

**Response:**
```json
{
  "analysis": {
    "correlations": [
      {
        "metricType": "sleep",
        "domain": "memory",
        "correlation": 0.67,
        "strength": "strong",
        "description": "Better sleep quality correlates with improved memory performance"
      }
    ],
    "trends": [
      {
        "type": "improvement",
        "description": "Cognitive scores improved by 12% during periods of regular exercise",
        "confidence": "high"
      }
    ],
    "recommendations": [
      {
        "category": "sleep",
        "action": "Aim for 7-8 hours of sleep consistently",
        "impact": "high",
        "reasoning": "Your data shows strong correlation between sleep quality and cognitive performance"
      }
    ]
  },
  "metrics": {
    "count": 42,
    "types": ["sleep", "heart_rate", "blood_pressure"]
  },
  "cognitive": {
    "count": 15,
    "domains": ["memory", "attention", "processing"]
  }
}
```

## Frontend Components

### HealthMetricTracker

The main component for tracking health metrics. It allows users to:

1. Add new health metric readings
2. View historical health metric data
3. Delete existing metrics
4. Paginate through their health history

### Future Enhancements

1. **Data Visualization**:
   - Charts showing trends over time
   - Correlation visualizations with cognitive performance

2. **Advanced Analytics**:
   - Machine learning-based analysis of health patterns
   - Personalized recommendations based on health data

3. **Notifications**:
   - Alerts for concerning health readings
   - Reminders to input regular readings

## Authentication

All health metrics endpoints require user authentication. Currently, the system uses a mock authentication system for development purposes, but in production, it will use Clerk for secure authentication.

## Integration with Cognitive Data

The health metrics system is designed to work closely with the cognitive assessment data. The analysis endpoint combines health metrics with cognitive performance data to identify correlations and trends that can help users understand how their health metrics impact their cognitive health.

## Privacy and Security

Health data is protected through:

1. Authentication requirements for all API endpoints
2. User-scoped data access (users can only access their own health data)
3. Secure database storage
4. No third-party integrations that could compromise data privacy 