import { Session } from 'next-auth';
import { NextRouter } from 'next/router';
import React, { Component } from 'react'

import { withGuard, withRouter } from '../wrapper';

type Props = {
  session: Session;
  router: NextRouter;
}
type State = {}

class Home extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state={};
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <div>home</div>
    )
  }
}

export default withGuard(withRouter(Home));
