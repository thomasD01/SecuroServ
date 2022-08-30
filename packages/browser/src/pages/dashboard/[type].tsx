import React, { Component } from 'react'
import { NextRouter, useRouter } from 'next/router'

type Props = {
  router: NextRouter;
}
type State = {
  type?: string|string[];
}

class Dashboard extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      type: this.props.router.query.type
    }
  }

  render() {
    return (
      <div>Dashboard type: {this.state.type}</div>
    )
  }
}

export default () => {
  const router = useRouter();

  return <Dashboard router={router}/>
}