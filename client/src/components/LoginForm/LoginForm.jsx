import Styles from './loginForm.module.css'
//
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
//
import axios from 'axios';


export default function LoginForm () {

    const boton = useRef(null);
    const [ inputsValue, setInputsValue ] = useState({
        email: '',
        password: ''
    })
    const [ isInputRed, setIsInputRed ]= useState({
        email: false,
        password: false
    });
    const errorsMsg = {
        email: useRef(null),
        password: useRef(null)
    }
    const errorMsgIsShwon = useState({
        email: false,
        password: false
    })

    const navigate = useNavigate();

    function handleClick (event) {
        event.preventDefault();
        setIsInputRed(validate(inputsValue), login())
    }

    function handleChange (event) {
        event.preventDefault();
        setInputsValue({ ...inputsValue, [event.target.name]: event.target.value }, setIsInputRed(validate(inputsValue)));
    }
    
    function validate (inputs) {
        const { email, password } = inputs;
        const isInputRedCOPY = {...isInputRed}
        const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!email || !emailValidation.test(email)) isInputRedCOPY.email = true;
        else isInputRedCOPY.email = false;

        if (!password || password.length > 15) isInputRedCOPY.password = true;
        else isInputRedCOPY.password = false;
        
        return isInputRedCOPY
    }

    async function login() {
        try {
            if (!isInputRed.email && !isInputRed.password ) {
                const { data } = await axios.post('http://localhost:3001/login', inputsValue);
                if (data.access) navigate('/home');
            }
        } catch (error) {
            const { response: {data} } = error;

            const isInputRedCOPY = {...isInputRed};
            if (data === "Faltan datos") {
                isInputRedCOPY.email = !inputsValue.email.length ? true : false;
                isInputRedCOPY.password = !inputsValue.password.length ? true : false;
            }
            if (data === "Usuario inexistente") {
                isInputRedCOPY.email = true;
                isInputRedCOPY.password = true;
            }
            if(!data.access) {
                isInputRedCOPY.email = true;
                isInputRedCOPY.password = true;
            } 

            setIsInputRed(isInputRedCOPY);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className={Styles['login-form-container']}>

            <h2>
                ¡BIENVENIDO!
            </h2>

            <div className={Styles['login-form-input-container']}>

                <label htmlFor='email'> Correo Electronico: </label>
                <input 
                    type='text' 
                    name='email'
                    value={inputsValue.email}
                    onChange={handleChange}
                    id={ isInputRed.email ? Styles['email-input'] : '' }
                ></input>

            </div>
            <p ref={errorsMsg.email} id={ errorMsgIsShwon.email ? Styles['email-error-message'] : '' }>
                -
            </p>



            <div className={Styles['login-form-input-container']}>

                <label htmlFor='password'> Contraseña: </label>
                <input 
                    type='password' 
                    name='password'
                    value={inputsValue.password}
                    onChange={handleChange}
                    id={ isInputRed.password ? Styles['password-input'] : '' }
                ></input>
                <p ref={errorsMsg.password} id={ errorMsgIsShwon.password ? Styles['password-error-message'] : '' }>
                    -
                </p>

            </div>

            <button ref={boton} disabled={inputsValue.email === '' || inputsValue.password === ''} onClick={handleClick} >Iniciar Sesión</button>

        </div>
    )

}