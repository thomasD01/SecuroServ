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
  return result!.RefreshToken;
}

export async function getRequest(code: string) {
  const result = await prismaClient.access_Request.findUnique({
    select: {
      access_token: true,
      refresh_token: true
    },
    where: { code: code }
  })

  if(result){
    await prismaClient.access_Request.delete({where: {code: code}})
  }

  return result
}

export async function createRequest(code: string, access_token: string, refresh_token: string){
  const result = await prismaClient.access_Request.create({
    data: {
      code,
      access_token,
      refresh_token
    }
  })
}