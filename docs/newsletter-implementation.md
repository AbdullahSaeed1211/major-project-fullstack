# Newsletter Implementation Guide

## Overview

The newsletter feature will allow users to subscribe to periodic updates about brain health, cognitive improvement strategies, and research news. This document outlines the implementation plan for this feature.

## Features

1. **Subscription Management**:
   - Email collection with validation
   - Subscription preferences (weekly, monthly)
   - Unsubscribe functionality
   - GDPR compliance

2. **Newsletter Content**:
   - Brain health tips
   - Research updates
   - User success stories
   - App feature announcements

3. **Delivery System**:
   - Automated sending schedule
   - Email templates
   - Analytics tracking

## Implementation Steps

### 1. Newsletter Subscription Component

Create a client component for collecting email subscriptions:

```typescript
// components/newsletter/subscription-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export function NewsletterSubscriptionForm() {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, frequency }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Frequency</Label>
        <RadioGroup 
          value={frequency} 
          onValueChange={setFrequency}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">Monthly</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
      
      <p className="text-xs text-gray-500 mt-2">
        By subscribing, you agree to our privacy policy and terms of service.
        You can unsubscribe at any time.
      </p>
    </form>
  );
}
```

### 2. API Endpoints

Create REST API endpoints for subscription management:

```typescript
// app/api/newsletter/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, frequency } = body;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return createErrorResponse("Invalid email address", 400);
    }
    
    // Validate frequency
    if (frequency !== "weekly" && frequency !== "monthly") {
      return createErrorResponse("Invalid frequency option", 400);
    }
    
    // Connect to database
    const db = await connectToDatabase();
    const collection = db.collection("newsletter_subscribers");
    
    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      // Update existing preferences
      await collection.updateOne(
        { email },
        { $set: { frequency, updatedAt: new Date() } }
      );
      
      return NextResponse.json({
        success: true,
        message: "Subscription preferences updated"
      });
    }
    
    // Create new subscriber
    await collection.insertOne({
      email,
      frequency,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true,
      message: "Successfully subscribed"
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

// app/api/newsletter/unsubscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    
    if (!token) {
      return createErrorResponse("Missing unsubscribe token", 400);
    }
    
    // Connect to database
    const db = await connectToDatabase();
    const collection = db.collection("newsletter_subscribers");
    
    // Find subscriber by token
    const subscriber = await collection.findOne({ unsubscribeToken: token });
    if (!subscriber) {
      return createErrorResponse("Invalid unsubscribe token", 404);
    }
    
    // Update subscriber status
    await collection.updateOne(
      { unsubscribeToken: token },
      { $set: { isActive: false, updatedAt: new Date() } }
    );
    
    return NextResponse.redirect(new URL("/unsubscribed", request.url));
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}
```

### 3. Unsubscribe Page

Create a page for confirming unsubscription:

```typescript
// app/unsubscribed/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnsubscribedPage() {
  return (
    <div className="container max-w-lg mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Unsubscribed Successfully</h1>
        
        <p className="mb-6">
          You have successfully unsubscribed from our newsletter. 
          We're sorry to see you go.
        </p>
        
        <p className="mb-6">
          If you unsubscribed by mistake or would like to rejoin in the future, 
          you can always sign up again.
        </p>
        
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
```

### 4. Email Templates

Create email templates using React Email:

```bash
npm install @react-email/components
```

```typescript
// emails/welcome-email.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userFirstName: string;
  unsubscribeUrl: string;
}

export const WelcomeEmail = ({
  userFirstName = 'there',
  unsubscribeUrl = 'https://example.com/unsubscribe',
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to BrainWise Health Newsletter</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to BrainWise</Heading>
          <Text style={paragraph}>Hi {userFirstName},</Text>
          <Text style={paragraph}>
            Thank you for subscribing to our newsletter. You'll now receive regular updates
            on brain health research, cognitive improvement strategies, and tips for neurological recovery.
          </Text>
          <Section style={buttonContainer}>
            <Button
              pY={12}
              pX={20}
              style={button}
              href="https://brainwise.app/dashboard"
            >
              Visit Your Dashboard
            </Button>
          </Section>
          <Text style={paragraph}>
            If you have any questions, feel free to reach out to our support team.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            BrainWise Health, Inc. © 2023<br />
            123 Brain Street, Cognition City<br /><br />
            <Link href={unsubscribeUrl} style={unsubscribeLink}>Unsubscribe</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '24px',
  borderRadius: '8px',
  maxWidth: '600px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#555',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '24px',
  marginBottom: '24px',
};

const button = {
  backgroundColor: '#5046e5',
  color: '#fff',
  fontSize: '16px',
  borderRadius: '6px',
  fontWeight: 'bold',
  textDecoration: 'none',
};

const hr = {
  borderColor: '#eaeaea',
  marginTop: '32px',
  marginBottom: '32px',
};

const footer = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#8898aa',
  textAlign: 'center' as const,
};

const unsubscribeLink = {
  color: '#8898aa',
  textDecoration: 'underline',
};

export default WelcomeEmail;
```

### 5. Email Delivery Service

Set up a delivery service using Resend:

```bash
npm install resend
```

```typescript
// lib/email.ts
import { Resend } from 'resend';
import { renderAsync } from '@react-email/render';
import WelcomeEmail from '@/emails/welcome-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, firstName: string, unsubscribeToken: string) {
  try {
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;
    
    const html = await renderAsync(
      WelcomeEmail({
        userFirstName: firstName || 'there',
        unsubscribeUrl,
      })
    );
    
    const result = await resend.emails.send({
      from: 'BrainWise Health <newsletter@brainwise.app>',
      to: email,
      subject: 'Welcome to BrainWise Health Newsletter',
      html,
    });
    
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}
```

### 6. Scheduled Newsletter Delivery

Set up a cron job using a serverless function to send scheduled newsletters:

```typescript
// app/api/cron/send-newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Resend } from 'resend';
import { renderAsync } from '@react-email/render';
import NewsletterTemplate from '@/emails/newsletter-template';

const resend = new Resend(process.env.RESEND_API_KEY);

// This endpoint should be secured and only called by a cron job service
export async function POST(request: NextRequest) {
  try {
    // Verify secret token to ensure only authorized cron jobs can trigger
    const authorization = request.headers.get('Authorization');
    if (authorization !== `Bearer ${process.env.CRON_SECRET_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { frequency } = await request.json();
    if (frequency !== 'weekly' && frequency !== 'monthly') {
      return NextResponse.json({ error: 'Invalid frequency' }, { status: 400 });
    }
    
    // Connect to database
    const db = await connectToDatabase();
    const collection = db.collection('newsletter_subscribers');
    
    // Get active subscribers for the given frequency
    const subscribers = await collection
      .find({ isActive: true, frequency })
      .toArray();
    
    console.log(`Sending ${frequency} newsletter to ${subscribers.length} subscribers`);
    
    // Get newsletter content (could be stored in a database or CMS)
    const content = await getNewsletterContent(frequency);
    
    // Send newsletter to each subscriber
    const results = await Promise.allSettled(
      subscribers.map(async (subscriber) => {
        const html = await renderAsync(
          NewsletterTemplate({
            content,
            unsubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`,
          })
        );
        
        return resend.emails.send({
          from: 'BrainWise Health <newsletter@brainwise.app>',
          to: subscriber.email,
          subject: content.subject,
          html,
        });
      })
    );
    
    // Count successes and failures
    const succeeded = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    return NextResponse.json({ 
      success: true, 
      sent: succeeded,
      failed,
      total: subscribers.length
    });
  } catch (error) {
    console.error('Newsletter sending error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getNewsletterContent(frequency: string) {
  // In a real implementation, this would fetch content from a CMS or database
  return {
    subject: `Your ${frequency} brain health newsletter`,
    title: 'Latest Brain Health Research',
    featuredArticle: {
      title: 'New Study Shows Promise for Stroke Recovery',
      excerpt: 'Researchers have discovered a new therapy that significantly improves recovery outcomes...',
      url: '/blog/new-stroke-recovery-research',
    },
    articles: [
      {
        title: 'Five Daily Habits for Better Brain Health',
        excerpt: 'Simple habits you can incorporate into your routine...',
        url: '/blog/daily-brain-health-habits',
      },
      {
        title: 'Understanding Cognitive Decline Prevention',
        excerpt: 'Early intervention strategies that make a difference...',
        url: '/blog/cognitive-decline-prevention',
      },
    ],
    tip: 'Try the Pomodoro Technique (25 minutes of focused work followed by a 5-minute break) to improve concentration and reduce mental fatigue.',
  };
}
```

## Database Schema

The newsletter feature requires a new MongoDB collection:

```typescript
interface NewsletterSubscriber {
  _id: ObjectId;
  email: string;
  firstName?: string;
  lastName?: string;
  frequency: 'weekly' | 'monthly';
  isActive: boolean;
  unsubscribeToken: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Integration Points

### 1. Homepage

Add the subscription form to the homepage:

```tsx
// app/page.tsx
import { NewsletterSubscriptionForm } from "@/components/newsletter/subscription-form";

export default function Home() {
  return (
    <main>
      {/* Other homepage content */}
      
      <section className="bg-gray-50 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Get the latest brain health tips and research delivered to your inbox.
            </p>
            <NewsletterSubscriptionForm />
          </div>
        </div>
      </section>
    </main>
  );
}
```

### 2. User Settings

Allow logged-in users to manage their newsletter preferences:

```tsx
// app/settings/notifications/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getCurrentUserId } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

export default function NotificationSettings() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [frequency, setFrequency] = useState("weekly");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const userId = getCurrentUserId();
        if (!userId) return;
        
        const response = await fetch("/api/users/newsletter-preferences");
        if (response.ok) {
          const data = await response.json();
          setIsSubscribed(data.isSubscribed);
          if (data.frequency) {
            setFrequency(data.frequency);
          }
        }
      } catch (error) {
        console.error("Error fetching newsletter preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPreferences();
  }, []);
  
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch("/api/users/newsletter-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isSubscribed,
          frequency: isSubscribed ? frequency : null,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }
      
      toast({
        title: "Preferences updated",
        description: "Your newsletter preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not update your newsletter preferences.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return <div>Loading preferences...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Newsletter Subscription</h3>
        <p className="text-sm text-gray-500">
          Receive brain health tips and latest research in your inbox.
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={isSubscribed}
          onCheckedChange={setIsSubscribed}
          id="newsletter-subscription"
        />
        <Label htmlFor="newsletter-subscription">
          Receive newsletter
        </Label>
      </div>
      
      {isSubscribed && (
        <div className="ml-6 mt-4">
          <p className="text-sm font-medium mb-2">Frequency</p>
          <RadioGroup 
            value={frequency} 
            onValueChange={setFrequency} 
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly</Label>
            </div>
          </RadioGroup>
        </div>
      )}
      
      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save preferences"}
      </Button>
    </div>
  );
}
```

## Analytics and Tracking

Implement analytics to track:

1. Subscription rate
2. Open rate
3. Click-through rate
4. Unsubscribe rate

This can be done using Resend analytics or a third-party email analytics service.

## Testing

1. **Unit Testing**:
   - Test form validation
   - Test API endpoints

2. **Integration Testing**:
   - Test the complete subscription flow
   - Test unsubscription flow

3. **Email Rendering**:
   - Test emails in various clients (Gmail, Outlook, mobile)

## Privacy and Compliance

1. **GDPR Compliance**:
   - Clear consent for collecting email
   - Easy unsubscribe option
   - Data processing documentation

2. **CAN-SPAM Compliance**:
   - Physical address in emails
   - Clear unsubscribe mechanism
   - Honest subject lines

## Deployment Timeline

1. **Week 1**: Set up database schema and API endpoints
2. **Week 2**: Create subscription form and email templates
3. **Week 3**: Implement email delivery system and testing
4. **Week 4**: Set up analytics and launch

## Future Enhancements

1. **Personalized Content**:
   - Content based on user profile and interests
   - A/B testing different content types

2. **Engagement Optimization**:
   - Send at optimal times based on open history
   - Re-engagement campaigns for inactive subscribers

3. **Advanced Features**:
   - RSS-to-email automation for blog content
   - User-generated content showcases 