import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', {
      status: 400,
    });
  }

  // Get the event type
  const eventType = evt.type;

  // Connect to the database
  await connectToDatabase();

  // Handle the event
  if (eventType === 'user.created') {
    const { id, first_name, last_name, email_addresses, image_url } = evt.data;

    // Create a new user in your database
    try {
      const primaryEmail = email_addresses?.[0]?.email_address;

      if (!primaryEmail) {
        return NextResponse.json({ error: 'No email found' }, { status: 400 });
      }

      await User.create({
        clerkId: id,
        firstName: first_name || 'User',
        lastName: last_name || '',
        email: primaryEmail,
        profileImage: image_url,
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { error: 'Error creating user' },
        { status: 500 }
      );
    }
  } else if (eventType === 'user.updated') {
    const { id, first_name, last_name, email_addresses, image_url } = evt.data;

    // Update the user in your database
    try {
      const primaryEmail = email_addresses?.[0]?.email_address;

      if (!primaryEmail) {
        return NextResponse.json({ error: 'No email found' }, { status: 400 });
      }

      await User.findOneAndUpdate(
        { clerkId: id },
        {
          firstName: first_name || 'User',
          lastName: last_name || '',
          email: primaryEmail,
          profileImage: image_url,
        },
        { new: true, upsert: true }
      );

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json(
        { error: 'Error updating user' },
        { status: 500 }
      );
    }
  } else if (eventType === 'user.deleted') {
    const { id } = evt.data;

    // Delete the user from your database
    try {
      await User.findOneAndDelete({ clerkId: id });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { error: 'Error deleting user' },
        { status: 500 }
      );
    }
  }

  // Return a 200 response for other event types
  return NextResponse.json({ success: true });
} 