/*
  Warnings:

  - A unique constraint covering the columns `[shortName]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Institution_shortName_key" ON "Institution"("shortName");
