/*
  Warnings:

  - You are about to drop the column `workEndTime` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the column `workStartTime` on the `Master` table. All the data in the column will be lost.
  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('pending', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('color', 'blackAndWhite', 'correction', 'supplies');

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_clientId_fkey";

-- AlterTable
ALTER TABLE "Master" DROP COLUMN "workEndTime",
DROP COLUMN "workStartTime";

-- DropTable
DROP TABLE "Auth";

-- DropTable
DROP TABLE "Sessions";

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "masterId" INTEGER NOT NULL,
    "sessionTime" TIMESTAMP(3) NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "status" "SessionStatus" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
