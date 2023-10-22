import { PrismaClient } from '../../../../../node_modules/.prisma/client/workouts';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.workout.upsert({
    where: { workoutId: 1 },
    update: {},
    create: {
      name: 'First workout',
      coachId: 2,
      sex: 'male',
      photo: 'workout-photo-1.png',
      video: 'workout-video-1.mov',
      price: 1000,
      calories: 1000,
      description: 'First workout description',
      workoutTime: '10-30 мин',
      workoutType: ['crossfit', 'aerobics'],
      fitnessLevel: 'beginner',
    },
  });
  await prisma.workout.upsert({
    where: { workoutId: 2 },
    update: {},
    create: {
      name: 'Second workout',
      coachId: 4,
      sex: 'female',
      photo: 'workout-photo-2.png',
      video: 'workout-video-2.mov',
      price: 2000,
      calories: 2000,
      description: 'Second workout description',
      workoutTime: '30-50 мин',
      workoutType: ['boxing', 'running'],
      fitnessLevel: 'amateur',
    },
  });
  await prisma.workout.upsert({
    where: { workoutId: 3 },
    update: {},
    create: {
      name: 'Third workout',
      coachId: 2,
      sex: 'any',
      photo: 'workout-photo-3.png',
      video: 'workout-video-3.mov',
      price: 3000,
      calories: 3000,
      description: 'Third workout description',
      workoutTime: '50-80 мин',
      workoutType: ['crossfit', 'stretching', 'yoga'],
      fitnessLevel: 'amateur',
      isSpecialOffer: true,
    },
  });
  await prisma.workout.upsert({
    where: { workoutId: 4 },
    update: {},
    create: {
      name: 'Fourth workout',
      coachId: 4,
      sex: 'male',
      photo: 'workout-photo-4.png',
      video: 'workout-video-4.mov',
      price: 4000,
      calories: 4000,
      description: 'Fourth workout description',
      workoutTime: '80-100 мин',
      workoutType: ['aerobics'],
      fitnessLevel: 'pro',
    },
  });
  await prisma.workout.upsert({
    where: { workoutId: 5 },
    update: {},
    create: {
      name: 'Fifth workout',
      coachId: 2,
      sex: 'female',
      photo: 'workout-photo-5.png',
      video: 'workout-video-5.mov',
      price: 5000,
      calories: 5000,
      description: 'Fifth workout description',
      workoutTime: '80-100 мин',
      workoutType: ['crossfit', 'boxing'],
      fitnessLevel: 'pro',
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
