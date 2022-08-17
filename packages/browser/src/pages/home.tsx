import { Session } from 'next-auth';
import React, { Component } from 'react'

import { withGuard } from '../guard';

type Props = {
  session: Session;
}
type State = {}

class Home extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>home</div>
    )
  }
}

export default withGuard(Home);
