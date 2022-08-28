import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

//Todo add some Database functions to make access easier
export async function getBusinessData(clientID: number) {

}

export async function getRefreshToken(clientID: number) {
  const result = await prismaClient.user.findUnique({
    select: { RefreshToken: true },
    where: { id: clientID }
  })
  if(result){
    return Promise.resolve(result.RefreshToken);
  }
  return Promise.reject('nothing found');
}

export async function getUser(username: string){
  const result = await prismaClient.user.findUnique({
    where: { username: username }
  })
  if(result){
    return Promise.resolve(result);
  }
  return Promise.reject('nothing found');
}