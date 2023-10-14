-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "fitness_level" TEXT NOT NULL,
    "workout_type" TEXT[],
    "workout_time" TEXT NOT NULL,
    "successInfo" TEXT,
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);
