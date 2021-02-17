import { PrismaClient, User, Difficulty } from '@prisma/client';
import * as dotenv from 'dotenv';
import faker from 'faker';
import { fakeTab2 } from './fakeTab';

const prisma = new PrismaClient();

const NUMBER_OF_SONGS = 60;

export function pickRandomValueFromEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

async function main() {
  dotenv.config();
  console.log('Seeding...');
  const user1: User = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      username: 'Lisa',
      avatarUrl: faker.image.cats(),
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
      playgroundSettings: {
        create: {},
      },
      userSettings: {
        create: {},
      },
    },
  });
  const user2: User = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      username: 'Bart',
      avatarUrl: faker.image.cats(),
      role: 'USER',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      playgroundSettings: {
        create: {},
      },
      userSettings: {
        create: {},
      },
    },
  });

  const user3: User = await prisma.user.create({
    data: {
      email: 'mihai@gmail.com',
      username: 'Mihai',
      avatarUrl: faker.image.cats(),
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      playgroundSettings: {
        create: {},
      },
      userSettings: {
        create: {},
      },
    },
  });

  const user4: User = await prisma.user.create({
    data: {
      email: 'homer@simpson.com',
      username: 'Homer',
      avatarUrl: faker.image.cats(),
      role: 'USER',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      playgroundSettings: {
        create: {},
      },
      userSettings: {
        create: {},
      },
    },
  });

  const user5: User = await prisma.user.create({
    data: {
      email: 'marge@simpson.com',
      username: 'Marge',
      avatarUrl: faker.image.cats(),
      role: 'USER',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      playgroundSettings: {
        create: {},
      },
      userSettings: {
        create: {},
      },
    },
  });

  const user6: User = await prisma.user.create({
    data: {
      email: 'burns@burns.com',
      username: 'Burns',
      avatarUrl: faker.image.cats(),
      role: 'USER',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      playgroundSettings: {
        create: {},
      },
      userSettings: {
        create: {},
      },
    },
  });

  const user7: User = await prisma.user.create({
    data: {
      email: 'ned@flanders.com',
      username: 'Ned',
      avatarUrl: faker.image.cats(),
      role: 'USER',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      playgroundSettings: {
        create: {},
      },
      userSettings: {
        create: {},
      },
    },
  });

  for (let i = 0; i < NUMBER_OF_SONGS; i++) {
    await prisma.song.create({
      data: {
        title: faker.name.findName(),
        artist: faker.name.findName(),
        difficulty: pickRandomValueFromEnum(Difficulty),
        postedBy: { connect: { id: user1.id } },
        tuning: 'standard',
        style: 'STRUM',
        inReview: false,
        tab: {
          create: {
            tempo: fakeTab2.tempo,
            tempoName: fakeTab2.tempoName,
            tracks: {
              create: [
                {
                  offset: fakeTab2.tracks[0].offset,
                  measures: fakeTab2.tracks[0].measures,
                },
              ],
            },
          },
        },
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Database seeded successfully');
  });
