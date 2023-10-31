-- CreateTable
CREATE TABLE "workout_requests" (
    "id" SERIAL NOT NULL,
    "initiator_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "statusRequest" TEXT NOT NULL,

    CONSTRAINT "workout_requests_pkey" PRIMARY KEY ("id")
);
