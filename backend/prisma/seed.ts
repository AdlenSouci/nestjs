import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Admin
  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedAdminPassword,
      role: Role.ADMIN, // ← utilise l'enum
    },
  });

  // User non-admin
  const hashedUserPassword = await bcrypt.hash("user123", 10);
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: hashedUserPassword,
      role: Role.USER,
    },
  });

  console.log("Admin et User seedés !");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
