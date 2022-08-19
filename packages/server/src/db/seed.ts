import { PrismaClient } from '@prisma/client'

import { hashPass } from '../auth/auth.service';

const prisma = new PrismaClient();

async function main(){
  const admin = await prisma.role.upsert({
    where: { name: 'admin'},
    update: {},
    create: {
      name: 'admin',
      level: 4,
    }
  }) 
  const ceo = await prisma.role.upsert({
    where: { name: 'ceo'},
    update: {},
    create: {
      name: 'ceo',
      level: 3,
    }
  })
  const vip = await prisma.role.upsert({
    where: { name: 'vip'},
    update: {},
    create: {
      name: 'vip',
      level: 2,
    }
  })
  const member = await prisma.role.upsert({
    where: { name: 'member'},
    update: {},
    create: {
      name: 'member',
      level: 1,
    }
  })
  const visitor = await prisma.role.upsert({
    where: { name: 'visitor'},
    update: {},
    create: {
      name: 'visitor',
      level: 0,
    }
  })

  const thomas = await prisma.user.upsert({
    where: { username: 'TDAdmin' },
    update: {},
    create: {
      name: 'Düren',
      prename: 'Thomas',
      email: 'thomas@prisma.io',
      username: 'TDAdmin',
      password: hashPass('123456789', 'TDAdmin'),
      role: { connect : {id: admin.id}}
    },
  })

  const jouline = await prisma.user.upsert({
    where: { username: 'Jouline25' },
    update: {},
    create: {
      name: 'Grabbe',
      prename: 'Jouline',
      email: 'jouline@prisma.io',
      username: 'Jouline25',
      password: hashPass('Passwort', 'Jouline25'),
      role: { connect: {id: ceo.id} }
    },
  })

  const authorizedDevClient = await prisma.authorized_Clients.upsert({
    where: { client_id: '13'},
    update: {},
    create: {
      client_id: '13',
      client_secret: 'changeme'
    }
  });
  console.log({ thomas, jouline });
}

main()
  .then(async ()=>{
    await prisma.$disconnect();
  })
  .catch(async (error)=>{
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })