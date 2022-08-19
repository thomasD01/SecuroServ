import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

//Todo add some Database functions to make access easier
export async function getBusinessData(clientID: number){

}

export async function getRefreshToken(clientID: number){
  const result = await prismaClient.user.findUnique({
    select: {RefreshToken: true},
    where: {id: clientID}
  })
  return result!.RefreshToken;
}