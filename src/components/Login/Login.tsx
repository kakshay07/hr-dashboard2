import { h } from 'preact'
import './Login.css'

const Login : preact.FunctionComponent<any> = ({setisLoggedIn} : {setisLoggedIn : (state : any)=>void } ) => {

    const handleSubmit = (e : h.JSX.TargetedEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.isloggedin = 'true';
        setisLoggedIn('true')
    }

  return (
    <div id="login_main_container">
        <form onSubmit={(e)=>{handleSubmit(e)}} class='border border-2 p-4 rounded-4' data-bs-theme="dark">
            <h2 class='text-light mb-4 text-center'>Login</h2>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="mb-4">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="text-center">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login