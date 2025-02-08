import { PrismaClient } from "@prisma/client";
import { initData } from "./data";

const prisma = new PrismaClient();

async function main() {
  for (const i of Array.from(Array(25).keys())) {
    await prisma.user.upsert({
      where: { name: `Admin` },
      update: {},
      create: {
        name: `Admin`,
        password: `Admin`
    },
    });
  }

  for (const country of initData.countries) {
    const existingCountry = await prisma.country.findFirst({
      where: { code: country.id },
    });

    if (!existingCountry) {
      await prisma.country.create({
        data: {
          code: country.id,
          name: country.name
        },
      });
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });