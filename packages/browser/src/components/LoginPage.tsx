import { signIn, SignInResponse } from 'next-auth/react';
import { Router, withRouter } from 'next/router';
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server';
import { ToastContainer, toast } from 'react-toastify'

type Props = {
  router: Router;
}
type State = {
  version: string;
  userInput: string;
  passInput: string;
  showPass: boolean;
}

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      version: '1.0',
      userInput: 'TDAdmin',
      passInput: '123456789',
      showPass: false
    }
  }
  editUsername: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ userInput: event.target.value });
  }
  editPassword: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ passInput: event.target.value });
  }

  /**
   * create Promise for toast notification to display information about login status
   * @returns JWT as string
   */
  async sendLogin(username: string, password: string): Promise<SignInResponse | undefined> {
    return new Promise<SignInResponse | undefined>(async function (resolve, reject) {
      setTimeout(()=>reject(), 10000);
      const response = await signIn<'credentials'>('securoserv', {
        redirect: false,
        username,
        password
      })
      resolve(response);
    });
  }

  submit = async () => {
    const id = toast.loading('attempting login');
    try {
      const res = await this.sendLogin(this.state.userInput, this.state.passInput);
      if (res == null) {
        toast.update(id, {
          type: toast.TYPE.ERROR,
          render: 'wrong credentials',
          isLoading: false,
          autoClose: 3000
        })
      } else {
        toast.update(id, {
          type: toast.TYPE.SUCCESS,
          render: 'success',
          isLoading: false,
          autoClose: 3000
        })
        setTimeout(()=>{
          this.props.router.push('/home')
        }, 1500)
      }
    } catch (error) {
      console.error(error);
      toast.update(id, {
        type: toast.TYPE.WARNING,
        render: 'timeout, please try again',
        isLoading: false,
        autoClose: 3000
      })
    }
  }

  render() {
    return (
      <>
        <div className="page justify-center items-center">
          <div className="container">
            <img src="/img/SecuroServLogo.png" height="200px" width="200px"></img>
            <h1>Please log in</h1>
            <div className="inputs">
              <div className="input">
                Username
                <input
                  className="inputField"
                  type="text"
                  value={this.state.userInput}
                  onChange={this.editUsername}
                />
              </div>
              <div className="input">
                Password
                <input
                  className="inputField"
                  type={this.state.showPass ? 'text' : 'password'}
                  value={this.state.passInput}
                  onChange={this.editPassword}
                />
              </div>
              <div className="footer">
                Version {this.state.version}
                <button className="button" onClick={this.submit}>
                  Log In
                </button>
              </div>
            </div>
          </div>
          <ToastContainer theme='dark' />
        </div>
      </>
    )
  }
}

export default withRouter(LoginPage);
