import { Session } from 'next-auth'
import React, { Component } from 'react'
import { withGuard } from '../../wrapper'

type Props = {
  session: Session;
}

type State = {}

class Messaging extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>messaging</div>
    )
  }
}

export default withGuard(Messaging);
