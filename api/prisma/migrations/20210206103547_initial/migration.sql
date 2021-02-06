-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "GuitarStyle" AS ENUM ('STRUM', 'FINGERPICK');

-- CreateEnum
CREATE TYPE "GuitarOrientation" AS ENUM ('LEFT_HANDED', 'RIGHT_HANDED');

-- CreateEnum
CREATE TYPE "GuitarType" AS ENUM ('CLASSICAL', 'ACOUSTIC', 'ELECTRICAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "avatarUrl" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaygroundSettings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "guitarStyle" "GuitarStyle" DEFAULT E'STRUM',
    "guitarOrientation" "GuitarOrientation" DEFAULT E'RIGHT_HANDED',
    "guitarType" "GuitarType" DEFAULT E'ACOUSTIC',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "postedById" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "tuning" TEXT NOT NULL,
    "style" "GuitarStyle",

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tab" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "songId" TEXT NOT NULL,
    "tempo" INTEGER NOT NULL,
    "tempoName" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offset" INTEGER NOT NULL,
    "measures" JSONB NOT NULL,
    "tabId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PlaygroundSettings_userId_unique" ON "PlaygroundSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tab_songId_unique" ON "Tab"("songId");

-- AddForeignKey
ALTER TABLE "PlaygroundSettings" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tab" ADD FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD FOREIGN KEY ("tabId") REFERENCES "Tab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
