import { PrismaClient } from '@prisma/client';
import { zip } from 'rxjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.institution.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'vishwanathsinha@gmail.com',
      firstname: 'Vishwanath',
      lastname: 'Sinha',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'ADMIN',
      posts: {
        create: {
          title: 'NestJS, Prisma and Postgres together is amazing combination!',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'ramshankar@gmail.com',
      firstname: 'Ram',
      lastname: 'Shankar',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: [
          {
            title: 'Lets create something cool',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Twitter vs Threads',
            content: 'https://twitter.com/',
            published: false,
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'ram.shankar@gmail.com',
      firstname: 'Ram',
      lastname: 'Shankar',
      role: 'USER',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: [
          {
            title: 'Starman team',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'How we can revolutionized Indian education system',
            content: 'https://twitter.com/',
            published: false,
          },
        ],
      },
    },
  });

  console.log({ user1, user2, user3 });

  const institution1 = await prisma.institution.create({
    data: {
      name: "Sat Sai Baba Institution",
      shortName: "sstech",
      address1: "Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "111111"
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
