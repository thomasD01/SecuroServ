import React, { ComponentType, FC } from 'react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router';

interface WrappedProps{
  session: Session;
}

export function withGuard<P extends WrappedProps>(WrappedComponent: ComponentType<P>){
  const HOComponent: FC<any> = ({ ...props }) => {
    const { data: session } = useSession();

    if (session === null) {
      const router = useRouter();
      router.push('/login');
      return (<>Redirecting...</>)
    }

    return (
      <WrappedComponent session={session}  {...props} />
    )
  }
  return HOComponent
}
