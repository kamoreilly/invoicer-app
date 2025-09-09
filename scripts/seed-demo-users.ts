import { eq } from "drizzle-orm";
import { db } from "../apps/server/src/db";
import { account, user } from "../apps/server/src/db/schema/auth";
import { auth } from "../apps/server/src/lib/auth";

const DEMO_USERS = [
  {
    name: "Demo User",
    email: "demo@example.com",
    password: "demo12345",
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin12345",
  },
  {
    name: "Test User",
    email: "test@example.com",
    password: "test12345",
  },
];

async function seedDemoUsers() {
  console.log("🌱 Starting to seed demo users...");

  for (const demoUser of DEMO_USERS) {
    try {
      // Check if user already exists
      const existingUser = await db
        .select()
        .from(user)
        .where(eq(user.email, demoUser.email))
        .limit(1);

      if (existingUser.length > 0) {
        console.log(`✅ User ${demoUser.email} already exists, skipping...`);
        continue;
      }

      // Create user using Better Auth's signUp method
      const result = await auth.api.signUpEmail({
        body: {
          email: demoUser.email,
          password: demoUser.password,
          name: demoUser.name,
        },
        headers: new Headers(),
      });

      if (result) {
        console.log(
          `✅ Created demo user: ${demoUser.email} (password: ${demoUser.password})`
        );
      }
    } catch (error) {
      console.error(`❌ Failed to create user ${demoUser.email}:`, error);
    }
  }

  console.log("\n🎉 Demo user seeding completed!");
  console.log("\nDemo login credentials:");
  DEMO_USERS.forEach((user) => {
    console.log(`📧 ${user.email} | 🔑 ${user.password}`);
  });

  process.exit(0);
}

seedDemoUsers().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
