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

export async function getRequest(code: string) {
  const result = await prismaClient.access_Request.findUnique({
    where: { code: code }
  })
  return Promise.resolve(result);
}

export async function getAndDeleteRequest(code: string) {
  const result = await getRequest(code);

  if(result){
    const deleted = await prismaClient.access_Request.delete({
      where: { code: result.code }
    })
    return Promise.resolve(deleted);
  }
  return Promise.reject('nothing found');
}

export async function createRequest(code: string, access_token: string, refresh_token: string){
  const result = await prismaClient.access_Request.create({
    data: {
      code,
      access_token,
      refresh_token
    }
  })
  if(result){
    return Promise.resolve(result);
  }
  return Promise.reject('nothing found');
}