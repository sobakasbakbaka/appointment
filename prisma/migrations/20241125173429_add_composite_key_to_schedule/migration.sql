/*
  Warnings:

  - A unique constraint covering the columns `[masterId,workStartTime]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Schedule_masterId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_masterId_workStartTime_key" ON "Schedule"("masterId", "workStartTime");
