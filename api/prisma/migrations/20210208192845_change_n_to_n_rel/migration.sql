-- CreateTable
CREATE TABLE "SongsOnUsersFavorite" (
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,

    PRIMARY KEY ("userId","songId")
);

-- AddForeignKey
ALTER TABLE "SongsOnUsersFavorite" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnUsersFavorite" ADD FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
