import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Database disconnection failed:", error);
  }
};
