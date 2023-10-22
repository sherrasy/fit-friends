-- CreateEnum
CREATE TYPE "UserSex" AS ENUM ('male', 'female', 'any');

-- CreateEnum
CREATE TYPE "FitnessLevel" AS ENUM ('beginner', 'amateur', 'pro');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('yoga', 'running', 'boxing', 'stretching', 'crossfit', 'aerobics', 'pilates');

-- CreateTable
CREATE TABLE "workouts" (
    "workout_id" SERIAL NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sex" "UserSex" NOT NULL,
    "photo" TEXT,
    "video" TEXT,
    "price" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "is_special_offer" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "workout_time" TEXT NOT NULL,
    "workout_type" "WorkoutType"[],
    "fitness_level" "FitnessLevel" NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("workout_id")
);
