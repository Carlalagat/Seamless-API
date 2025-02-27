/*
  Warnings:

  - You are about to drop the column `weist` on the `Measurement` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Measurement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `waist` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measurement" DROP COLUMN "weist",
ADD COLUMN     "waist" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery_address",
DROP COLUMN "delivery_date",
DROP COLUMN "delivery_price",
DROP COLUMN "order_date",
DROP COLUMN "total_price",
ADD COLUMN     "deliveryAddress" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "deliveryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deliveryPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "product_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_user_id_key" ON "Measurement"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_product_id_key" ON "Order"("product_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_fabric_id_fkey" FOREIGN KEY ("fabric_id") REFERENCES "Fabric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
