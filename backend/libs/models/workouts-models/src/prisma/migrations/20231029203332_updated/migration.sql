-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "amount_ordered" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price_ordered" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "workout_orders" (
    "order_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "orderType" TEXT NOT NULL DEFAULT '',
    "workout_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "paymentOption" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_orders_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "workout_orders" ADD CONSTRAINT "workout_orders_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("workout_id") ON DELETE CASCADE ON UPDATE CASCADE;
