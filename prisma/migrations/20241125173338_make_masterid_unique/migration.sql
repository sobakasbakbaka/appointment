/*
  Warnings:

  - A unique constraint covering the columns `[masterId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Schedule_masterId_key" ON "Schedule"("masterId");
