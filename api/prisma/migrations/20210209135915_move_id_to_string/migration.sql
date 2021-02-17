/*
  Warnings:

  - The migration will change the primary key for the `PlaygroundSettings` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `UserSettings` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `notificationRecomanded` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlaygroundSettings" DROP CONSTRAINT "PlaygroundSettings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "PlaygroundSettings_id_seq";

-- AlterTable
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_pkey",
DROP COLUMN "notificationRecomanded",
ADD COLUMN     "notificationRecommended" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "UserSettings_id_seq";
