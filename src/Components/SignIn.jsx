
import { Link } from "react-router-dom"


function SignIn() {
  return (
    <div className="signin-div">
         <div className="signin-form">
                <div className="left">
                        <h1>Welcome!</h1>
                        <p>Enter your personal details to use all of site feature</p>
                        <Link to="/login" className="btn-4">LogIn</Link>
                </div>
                <form className="right">
                        <h1>Create Account</h1>
                        <div className="input-div">
                            <label>Full Name</label>
                            <input type="text" required className="signin-input"/>
                        </div>
                        <div className="input-div">
                            <label>Email</label>
                            <input type="email" required className="signin-input"/>
                        </div>
                        <div className="input-div">
                            <label>Password</label>
                            <input type="password" required className="signin-input"/>
                        </div>
                        <button className="btn-3">SignIn</button>
                </form>
         </div>
    </div>
  )
}

export default SignIn

export function Login (){
    return(
        <div className="signin-div">
               <div className="signin-form">
                <div className="left">
                        <h1>Welcome!</h1>
                        <p>Enter your personal details to use all of site feature</p>
                        <Link to= "/signin" className="btn-4">SignIn</Link>
                </div>
                <form className="right">
                        <h1>LogIn Your Account </h1>
                        <div className="input-div">
                            <label>Email</label>
                            <input type="email" required className="signin-input"/>
                        </div>
                        <div className="input-div">
                            <label>Password</label>
                            <input type="password" required className="signin-input"/>
                        </div>
                        <button className="btn-3">Login</button>
                </form>
         </div>
        </div>
    )
}
