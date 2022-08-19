import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server';
import { ToastContainer, toast } from 'react-toastify'

type Props = {
  client_id: string;
  redirect_uri: string;
  state: string;
}
type State = {
  version: string;
  userInput: string;
  passInput: string;
  showPass: boolean;
}

export class LoginPage extends React.Component<Props, State> {
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
  async sendLogin(username: string, password: string): Promise<{ auth: string, refresh: string } | null> {
    return new Promise<{ auth: string, refresh: string } | null>(async function (resolve, reject) {
      setTimeout(() => reject(), 10000);
      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      const decodedRes = await res.json();
      console.log('peter', decodedRes)
      if (decodedRes.auth_token && decodedRes.refresh_token) {
        resolve({
          auth: decodedRes.auth_token,
          refresh: decodedRes.refresh_token
        })
        return;
      }
      resolve(null);
    });
  }

  submit = async () => {
    const id = toast.loading('attempting login');
    try {
      const res = await this.sendLogin(this.state.userInput, this.state.passInput);
      if (res === null) {
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
        //Save JWT and redirect to home
        
        //login success
      }
    } catch (error) {
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
            <img src="/SecuroServLogo.png" height="200px" width="200px"></img>
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

export const staticRender = (
  client_id: string,
  redirect_uri: string,
  state: string
) => ReactDOMServer.renderToString(<LoginPage client_id={client_id} redirect_uri={redirect_uri} state={state}/>)
