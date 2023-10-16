/*
  Warnings:

  - Changed the type of `workout_time` on the `sportsman_info` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "sportsman_info" DROP COLUMN "workout_time",
ADD COLUMN     "workout_time" TEXT NOT NULL;

-- DropEnum
DROP TYPE "WorkoutTime";
