
import { useState } from "react"

const LogInForm = ({setShow, logInFunction, registerFunction, logInState, errorState, setLogInState, setErrorState }) =>{

    //Register
    const [newUser, setNewUser] = useState({username:'', password:''})
    //Log In
    const [logInUser, setLogInUser] = useState({username:'', password:''})

    //Handle Submit
    //Login
    const handleSubmit = e =>{
        e.preventDefault()
        if (logInState) {
            logInFunction(logInUser.username, logInUser.password)
        }else{
            registerFunction(newUser.username, newUser.password)
        }
        setNewUser({username:'', password:''})
        setLogInUser({username:'', password:''})
        setErrorState('')
    }

    const handleUsernameChange = e =>{
        if (logInState) {
            setLogInUser(prevState => ({...prevState, username:e.target.value}))
        }else{
            setNewUser(prevState => ({...prevState, username:e.target.value}))
        }
    } 
    const handlePasswordChange = e =>{
        if (logInState) {
            setLogInUser(prevState => ({...prevState, password:e.target.value}))
        }else{
            setNewUser(prevState => ({...prevState, password:e.target.value}))
        }
    }    
    const handleFormChange = () =>{
        setLogInState(prevState => !prevState)
        setLogInUser({username:'', password:''})
        setNewUser({username:'', password:''})
    }
    return(
    <div className='logInForm'>
        <h2>{logInState ? 'Log In' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>{logInState ? null : 'New'} Username</label>
                <input onChange={handleUsernameChange}
                value={logInState ? logInUser.username : newUser.username} type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
            </div>
            <div className="form-group">
                <label>{logInState ? null : 'New'} Password</label>
                <input onChange={handlePasswordChange} 
                value={logInState ? logInUser.password : newUser.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <h6 onClick={handleFormChange} className='mt-2 ' style={{cursor:'pointer'}} >
                {logInState ? 'You don´t have an account?' : 'Do you have an account?'}
            </h6>
            <button 
            type="submit" className=" btn btn-primary"> 
                {logInState ? 'LogIn' : 'Create new Account'} 
            </button>
            <p className='my-1 logInError'> {errorState} </p>
        </form>
    </div>
    )
}

export default LogInForm;