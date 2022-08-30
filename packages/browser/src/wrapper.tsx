import React, { ComponentType, FC } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { NextRouter, useRouter } from 'next/router';

interface GuardProps{
  session: Session;
}

export function withGuard<P extends GuardProps>(WrappedComponent: ComponentType<P>){
  const HOComponent: FC<any> = (props) => {
    const session = useSession();
    const router = useRouter();

    if (session.data === null) {
      router.push('/login');
      return (<>Redirecting...</>)
    }

    return (
      <WrappedComponent session={session.data}  {...props} />
    )
  }
  return HOComponent;
}

interface RouterProps{
  router: NextRouter;
}
export function withRouter<P extends RouterProps>(WrappedComponent: ComponentType<P>){
  const HOComponent: FC<any> = (props) => {
    const router = useRouter();

    return (
      <WrappedComponent router={router} {...props} />
    )
  }
  return HOComponent;
}