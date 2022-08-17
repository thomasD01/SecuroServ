import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Router, withRouter } from 'next/router';
import { signIn } from 'next-auth/react'

type Props = {
  router: Router
}
type State = {
  version: string;
  userInput: string;
  passInput: string;
  showPass: boolean;
}

class LoginPage extends Component<Props, State> {
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
      const res = await fetch('http://127.0.0.1:3000/login', {
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
        signIn();
        this.props.router.push('/');
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
      <div className="page justify-center items-center">
        <div
          className="h-[500px] w-[550px] shadow-xl flex border-t-4 
                     border-t-red-600 bg-[#222222] flex-col items-center text-white"
        >
          <img src="img/SecuroServLogo.png" height="200px" width="200px"></img>
          <h1 className="text-2xl">Please log in</h1>
          <div className="flex-col flex justify-evenly h-[50%] w-full px-[15%]">
            <div className="w-full flex flex-row justify-between text-2xl">
              Username
              <input
                className="w-[70%] bg-[#666666] pl-2 text-xl"
                type="text"
                value={this.state.userInput}
                onChange={this.editUsername}
              />
            </div>
            <div className="w-full flex flex-row justify-between text-2xl">
              Password
              <input
                className="w-[70%] bg-[#666666] pl-2 text-xl"
                type={this.state.showPass ? 'text' : 'password'}
                value={this.state.passInput}
                onChange={this.editPassword}
              />
            </div>
            <div className="text-white flex flex-row justify-between w-full">
              Version {this.state.version}
              <button className="bg-red-600 text-xl px-4 py-1" onClick={this.submit}>
                Log In
              </button>
            </div>
          </div>
        </div>
        <ToastContainer theme='dark' />
      </div>
    )
  }
}

export default withRouter(LoginPage)
