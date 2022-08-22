import React, { ComponentType, FC } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface WrappedProps{
  session: Session;
}

export function withGuard<P extends WrappedProps>(WrappedComponent: ComponentType<P>){
  const HOComponent: FC<any> = ({ ...props }) => {
    const { data, status } = useSession();

    if (data === null) {
      signIn('securoserv')
      return (<>Redirecting...</>)
    }

    return (
      <WrappedComponent session={data}  {...props} />
    )
  }
  return HOComponent
}
