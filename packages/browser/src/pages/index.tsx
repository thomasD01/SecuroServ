import React, { FC } from 'react'
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

type Props = {}

const indexPage: FC<Props> = () => {
  const session = useSession();
  const router = useRouter();

  if(session.data !== null){
    router.push('/home');
  } else {
    signIn('securoserv');
  }
  return <></>
}
export default dynamic(async() => indexPage, {ssr: false})
