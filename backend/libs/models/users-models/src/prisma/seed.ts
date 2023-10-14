import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'First Sportsman',
      email: 'first-sportsman@test.ru',
      avatar: 'avatar1.png',
      password: 'test123',
      sex: 'male',
      birthDate: '14.10.2023',
      role: 'sportsman',
      description: 'First sportsman description',
      location: 'pionerskaya',
      photo: 'photo1.png',
      fitnessLevel: 'beginer',
      workoutType: ['yoga'],
      workoutTime: 'basic',
      caloriesTotal: 1000,
      caloriesPerDay: 1000,
      isReady: true,
    },
  });

  await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'First Coach',
      email: 'first-coach@test.ru',
      avatar: 'avatar2.png',
      password: 'test456',
      sex: 'male',
      role: 'coach',
      location: 'petrogradskaya',
      photo: 'photo2.png',
      fitnessLevel: 'pro',
      workoutType: ['yoga', 'stretching'],
      certificate: 'certificate1.pdf',
      successInfo: 'First coach success info',
      isPersonal: true,
    },
  });

  await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Second Sportsman',
      email: 'second-sportsman@test.ru',
      avatar: 'avatar3.png',
      password: 'test789',
      sex: 'any',
      role: 'sportsman',
      location: "sportivnaya",
      photo: 'photo3.png',
      fitnessLevel: 'pro',
      workoutType: ['aerobics','boxing','crossfit'],
      workoutTime: 'intermediate',
      caloriesTotal: 5000,
      caloriesPerDay: 3000,
      isReady: false,
    },
  });

  await prisma.user.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Second Coach',
      email: 'second-coach@test.ru',
      avatar: 'avatar4.png',
      password: 'test147',
      sex: 'female',
      birthDate: '12.10.2023',
      role: 'coach',
      location: 'pionerskaya',
      photo: 'photo4.png',
      fitnessLevel: 'pro',
      workoutType: ['yoga', 'stretching'],
      certificate: 'certificate2.pdf',
      successInfo: 'Second coach success info',
      isPersonal: false,
    },
  });

  await prisma.user.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Third Sportsman',
      email: 'third-sportsman@test.ru',
      avatar: 'avatar5.png',
      password: 'test258',
      sex: 'female',
      role: 'sportsman',
      location: 'zvyozdnaya',
      photo: 'photo5.png',
      fitnessLevel: 'amateur',
      workoutType: ['aerobics'],
      workoutTime: 'superior',
      caloriesTotal: 4000,
      caloriesPerDay: 2000,
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
