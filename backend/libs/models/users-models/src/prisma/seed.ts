import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.user.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      name: 'First Sportsman',
      email: 'first-sportsman@test.ru',
      avatar: 'avatar1.png',
      password:
        'ECD71870D1963316A97E3AC3408C9835AD8CF0F3C1BC703527C30265534F75AE',
      sex: 'male',
      birthDate: '14.10.2023',
      role: 'sportsman',
      description: 'First sportsman description',
      location: 'pionerskaya',
      fitnessLevel: 'beginner',
      workoutType: ['yoga'],
      photo: 'photo1.png',
      sportsmanInfo: {
        create: {
          workoutTime: '10-30 мин',
          caloriesTotal: 1000,
          caloriesPerDay: 1000,
          isReady: true,
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { userId: 2 },
    update: {},
    create: {
      name: 'First Coach',
      email: 'first-coach@test.ru',
      avatar: 'avatar2.png',
      password:
        '50E49EFDE4E37D84B97B14AC4F7D03BA956F1413F7367090BAEABAC67BF69704',
      sex: 'male',
      role: 'coach',
      location: 'petrogradskaya',
      fitnessLevel: 'pro',
      workoutType: ['yoga', 'stretching'],
      photo: 'photo2.png',
      coachInfo: {
        create: {
          certificate: 'certificate1.pdf',
          successInfo: 'First coach success info',
          isPersonal: true,
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { userId: 3 },
    update: {},
    create: {
      name: 'Second Sportsman',
      email: 'second-sportsman@test.ru',
      avatar: 'avatar3.png',
      password:
        '2D0EADFA85A4FB22CFCCB3FB3A731A3A74524F7177F4259D920A5BBCFFEFC040',
      sex: 'any',
      role: 'sportsman',
      location: 'sportivnaya',
      fitnessLevel: 'pro',
      workoutType: ['aerobics', 'boxing', 'crossfit'],
      photo: 'photo3.png',
      sportsmanInfo: {
        create: {
          workoutTime: '30-50 мин',
          caloriesTotal: 5000,
          caloriesPerDay: 3000,
          isReady: false,
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { userId: 4 },
    update: {},
    create: {
      name: 'Second Coach',
      email: 'second-coach@test.ru',
      avatar: 'avatar4.png',
      password:
        'F993A2809AD97D2C76797B1F70B75681B79B49DB3C9CB006529F2214B1B7BD83',
      sex: 'female',
      birthDate: '12.10.2023',
      role: 'coach',
      location: 'pionerskaya',
      photo: 'photo4.png',
      fitnessLevel: 'pro',
      workoutType: ['yoga', 'stretching'],
      coachInfo: {
        create: {
          certificate: 'certificate2.pdf',
          successInfo: 'Second coach success info',
          isPersonal: false,
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { userId: 5 },
    update: {},
    create: {
      name: 'Third Sportsman',
      email: 'third-sportsman@test.ru',
      avatar: 'avatar5.png',
      password:
        '5294BF8DF21216DBD3DC3CE53F0041BBD1533CEDFCDBA4B3B23C2C64A29A85AD',
      sex: 'female',
      role: 'sportsman',
      location: 'zvyozdnaya',
      photo: 'photo5.png',
      fitnessLevel: 'amateur',
      workoutType: ['aerobics'],
      sportsmanInfo: {
        create: {
          workoutTime: '80-100 мин',
          caloriesTotal: 4000,
          caloriesPerDay: 2000,
          isReady: true,
        },
      },
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
