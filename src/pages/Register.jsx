import '../styles/Register.css'
import '../styles/common.css'

const Register = () => (
    <div className="main flex-row justify-between items-center fullscreen">
        <p className='title'>Nostalgia</p>
        <LoginCard />
    </div>
)

const LoginCard = () => (
    <div className='registerCard justify-between flex-col items-center'>
        <p className='cardText bold'>Login</p>
        <div className='flex-col items-center'>
            <input className='cardInput' placeholder='Username'></input>
            <input className='cardInput' placeholder='Password'></input>
        </div>
        
        <div className='flex-col items-center'>
            <button className='cardBtn'>Login</button>
            <button className='cardBtn'>Login with Google</button>
        </div>
        <div className='flex-col items-center'>
            <p className='cardLink'>Not registered yet? Sign up.</p>
            <p className='cardLink'>Forgot password?</p>
        </div>
    </div>
)

export default Register;