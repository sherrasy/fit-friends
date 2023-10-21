/*
  Warnings:

  - The values [beginer] on the enum `FitnessLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FitnessLevel_new" AS ENUM ('beginner', 'amateur', 'pro');
ALTER TABLE "users" ALTER COLUMN "fitness_level" TYPE "FitnessLevel_new" USING ("fitness_level"::text::"FitnessLevel_new");
ALTER TYPE "FitnessLevel" RENAME TO "FitnessLevel_old";
ALTER TYPE "FitnessLevel_new" RENAME TO "FitnessLevel";
DROP TYPE "FitnessLevel_old";
COMMIT;
