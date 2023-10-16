/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserSex" AS ENUM ('male', 'female', 'any');

-- CreateEnum
CREATE TYPE "FitnessLevel" AS ENUM ('beginer', 'amateur', 'pro');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('yoga', 'running', 'boxing', 'stretching', 'crossfit', 'aerobics', 'pilates');

-- CreateEnum
CREATE TYPE "WorkoutTime" AS ENUM ('basic', 'intermediate', 'advanced', 'superior');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('pionerskaya', 'petrogradskaya', 'udelnaya', 'zvyozdnaya', 'sportivnaya');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" "UserSex" NOT NULL,
    "role" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "fitness_level" "FitnessLevel" NOT NULL,
    "workout_type" "WorkoutType"[],
    "workout_time" "WorkoutTime",
    "success_info" TEXT,
    "calories_total" INTEGER,
    "calories_per_day" INTEGER,
    "description" TEXT,
    "birth_date" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "photo" TEXT,
    "certificate" TEXT,
    "is_personal" BOOLEAN DEFAULT false,
    "is_ready" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);
