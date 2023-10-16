/*
  Warnings:

  - You are about to drop the column `fitness_level` on the `coach_info` table. All the data in the column will be lost.
  - You are about to drop the column `workout_type` on the `coach_info` table. All the data in the column will be lost.
  - You are about to drop the column `fitness_level` on the `sportsman_info` table. All the data in the column will be lost.
  - You are about to drop the column `workout_type` on the `sportsman_info` table. All the data in the column will be lost.
  - Added the required column `fitness_level` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coach_info" DROP COLUMN "fitness_level",
DROP COLUMN "workout_type";

-- AlterTable
ALTER TABLE "sportsman_info" DROP COLUMN "fitness_level",
DROP COLUMN "workout_type";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "fitness_level" "FitnessLevel" NOT NULL,
ADD COLUMN     "workout_type" "WorkoutType"[];
