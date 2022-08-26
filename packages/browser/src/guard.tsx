import React, { ComponentType, FC } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router';

interface WrappedProps{
  session: Session;
}

export function withGuard<P extends WrappedProps>(WrappedComponent: ComponentType<P>){
  const HOComponent: FC<any> = ({ ...props }) => {
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
  return HOComponent
}
