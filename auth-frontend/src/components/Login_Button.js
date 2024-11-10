import { React } from 'react'

const Login_Button = ({eventListener, type}) => {
    return (
        <button
            type={type}
            onClick={eventListener}
        >
            Submit
        </button>
    );
}

export default Login_Button;