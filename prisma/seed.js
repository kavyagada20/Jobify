const { PrismaClient } = require("@prisma/client");
const data = require("./mock-data.json");
const prisma = new PrismaClient();

async function main() {
  const clerkId = "user_2yTTqgm2E3PfnFJKwdpp0OXRoky"; // Replace with my actual Clerk user ID
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId,
    };
  });
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }

  const products = [
    {
      slug: "nova-suite",
      name: "Nova Suite",
      company: "NovaTech Labs",
      description:
        "Unified workflow platform for tracking applications, interviews, and offers in real time.",
      price: 79,
      status: "in-stock",
      category: "Productivity",
      image: "/main.svg",
    },
    {
      slug: "orbit-finance",
      name: "Orbit Finance",
      company: "Orbit Finance",
      description:
        "Financial planning assistant that forecasts salary targets and tracks total compensation.",
      price: 59,
      status: "backorder",
      category: "Analytics",
      image: "/main.svg",
    },
    {
      slug: "pixel-insights",
      name: "Pixel Insights",
      company: "PixelForge Studios",
      description:
        "Visual analytics module turning hiring signals into actionable dashboards.",
      price: 49,
      status: "in-stock",
      category: "Insights",
      image: "/main.svg",
    },
    {
      slug: "helios-careers",
      name: "Helios Careers",
      company: "Helios Health",
      description:
        "Healthcare talent CRM with automated reminders and compliance-ready notes.",
      price: 99,
      status: "discontinued",
      category: "Operations",
      image: "/main.svg",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: product,
      update: product,
    });
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
