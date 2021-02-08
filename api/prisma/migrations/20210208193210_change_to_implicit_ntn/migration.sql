/*
  Warnings:

  - You are about to drop the `SongsOnUsersFavorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SongsOnUsersFavorite" DROP CONSTRAINT "SongsOnUsersFavorite_songId_fkey";

-- DropForeignKey
ALTER TABLE "SongsOnUsersFavorite" DROP CONSTRAINT "SongsOnUsersFavorite_userId_fkey";

-- CreateTable
CREATE TABLE "_favoriteRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- DropTable
DROP TABLE "SongsOnUsersFavorite";

-- CreateIndex
CREATE UNIQUE INDEX "_favoriteRelation_AB_unique" ON "_favoriteRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_favoriteRelation_B_index" ON "_favoriteRelation"("B");

-- AddForeignKey
ALTER TABLE "_favoriteRelation" ADD FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
