import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@/components/user-profile";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User Profile | Brainwise",
  description: "View and manage your brain health profile",
};

export default async function ProfilePage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return (
    <div className="flex flex-col">
      <section className="magic-section relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[length:20px_20px] bg-center [background-image:linear-gradient(rgba(var(--magic-primary),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--magic-primary),0.1)_1px,transparent_1px)]"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--magic-primary),0.3)] to-[rgba(var(--magic-accent),0.3)] blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--magic-secondary),0.3)] to-[rgba(var(--magic-primary),0.3)] blur-3xl"></div>
        
        <div className="magic-container relative">
          <div className="mx-auto max-w-5xl">
            <UserProfile 
              user={{
                id: user.id,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
                email: user.emailAddresses[0]?.emailAddress || '',
                image: user.imageUrl,
                role: "user",
                createdAt: new Date(user.createdAt),
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
} 