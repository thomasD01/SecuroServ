import React, { FC } from 'react'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

import LoginPage from '../components/loginPage';

type Props = {}

const indexPage: FC<Props> = () => {
  const session = useSession();
  const router = useRouter();

  if(session.status === 'authenticated'){
    router.push('/home');
  }
  return <LoginPage/>
}
export default dynamic(async() => indexPage, {ssr: false})
