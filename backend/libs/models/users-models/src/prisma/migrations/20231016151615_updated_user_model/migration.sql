/*
  Warnings:

  - You are about to drop the column `calories_per_day` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `calories_total` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `certificate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `fitness_level` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_personal` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_ready` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `success_info` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `workout_time` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `workout_type` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "calories_per_day",
DROP COLUMN "calories_total",
DROP COLUMN "certificate",
DROP COLUMN "fitness_level",
DROP COLUMN "is_personal",
DROP COLUMN "is_ready",
DROP COLUMN "success_info",
DROP COLUMN "workout_time",
DROP COLUMN "workout_type";

-- CreateTable
CREATE TABLE "sportsman_info" (
    "sportsman_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fitness_level" "FitnessLevel" NOT NULL,
    "workout_type" "WorkoutType"[],
    "workout_time" "WorkoutTime" NOT NULL,
    "calories_total" INTEGER NOT NULL,
    "calories_per_day" INTEGER NOT NULL,
    "is_ready" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sportsman_info_pkey" PRIMARY KEY ("sportsman_id")
);

-- CreateTable
CREATE TABLE "coach_info" (
    "coach_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fitness_level" "FitnessLevel",
    "workout_type" "WorkoutType"[],
    "success_info" TEXT,
    "certificate" TEXT,
    "is_personal" BOOLEAN DEFAULT false,

    CONSTRAINT "coach_info_pkey" PRIMARY KEY ("coach_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sportsman_info_user_id_key" ON "sportsman_info"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "coach_info_user_id_key" ON "coach_info"("user_id");

-- AddForeignKey
ALTER TABLE "sportsman_info" ADD CONSTRAINT "sportsman_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_info" ADD CONSTRAINT "coach_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
