/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MediaPurpose" AS ENUM ('PRODUCT_DISPLAY', 'MEASUREMENT_GUIDE', 'PRODUCT_DETAIL');

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_user_id_fkey";

-- DropIndex
DROP INDEX "Order_measurement_id_key";

-- DropIndex
DROP INDEX "Order_product_id_key";

-- DropIndex
DROP INDEX "Review_user_id_key";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "purpose" "MediaPurpose" NOT NULL DEFAULT 'PRODUCT_DISPLAY',
ALTER COLUMN "user_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_user_id_product_id_key" ON "Review"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
