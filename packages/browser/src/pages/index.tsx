import React, { FC } from 'react'
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react'

type Props = {}

const indexPage: FC<Props> = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if(status === 'authenticated'){
    router.push('/home');
  } else {
    signIn('securoserv');
  }

  return <></>
}
export default indexPage;