import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'First Sportsman',
      email: 'first@test.ru',
      password: 'test',
      sex: 'male',
      role: 'sportsman',
      location: 'pionerskaya',
      fitnessLevel: 'beginer',
      workoutType: ['yoga'],
      workoutTime: 'basic',
      caloriesTotal: 1000,
      caloriesPerDay: 1000,
      description: 'First sportsman description',
      birthDate: '14.10.2023',
      avatar: 'avatar1.png',
      photo: 'photo1.png',
      isReady: true,
    },
  });

  console.info('Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
