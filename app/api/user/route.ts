import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

export const GET = withAuth(async (request: NextRequest, userId: string) => {
  try {
    await connectToDatabase();
    
    const user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      return createErrorResponse("User not found", 404);
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return createErrorResponse("Internal server error", 500);
  }
});

export const POST = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const body = await request.json();
    const { firstName, lastName, email, profileImage } = body;
    
    if (!firstName || !lastName || !email) {
      return createErrorResponse("Missing required fields", 400);
    }
    
    await connectToDatabase();
    
    // Check if user already exists
    let user = await User.findOne({ clerkId: userId });
    
    if (user) {
      // Update existing user
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      if (profileImage) user.profileImage = profileImage;
      
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        clerkId: userId,
        firstName,
        lastName,
        email,
        profileImage,
      });
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return createErrorResponse("Internal server error", 500);
  }
}); 