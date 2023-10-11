import Styles from './registerForm.module.css'
//
import { IoIosArrowRoundBack } from 'react-icons/io';
//
import { Link } from 'react-router-dom'
//
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
//
import axios from 'axios';


function RegisterForm () {

    const navigate = useNavigate();
    const [ inputValues, setInputValues ] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [ errorMsgIsShown, setErrorMsgIsShown ] = useState({
        name: false,
        email: false,
        password: false
    })
    const errorsMsg = {
        name: useRef(null),
        email: useRef(null),
        password: useRef(null)
    }

    //

    function handleChange(event) {
        event.preventDefault();
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
    }
    function handleClick(event) {
        event.preventDefault();
        setErrorMsgIsShown(validate(inputValues), register());

    }

    function validate(inputs) {
        const { name, email, password } = inputs;
        const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        const errorMsgIsShownCOPY = {...errorMsgIsShown}

        //si los datos ingresados son incorrectos:
        if (name.length > 20) {
            errorMsgIsShownCOPY.name = true;
            errorsMsg.name.current.innerHTML = 'Debe contener menos de 20 caracteres'
        } else errorMsgIsShownCOPY.name = false;

        if (!emailValidation.test(email)) {
            errorMsgIsShownCOPY.email = true;
            errorsMsg.email.current.innerHTML = 'Ingrese un correo electronico valido';
        }
        else errorMsgIsShownCOPY.email = false;

        if (password.length > 15) {
            errorMsgIsShownCOPY.password = true;
            errorsMsg.password.current.innerHTML = 'Debe contener menos de 15 caracteres'
        }
        else errorMsgIsShownCOPY.password = false;


        //si faltan datos:
        if (!name.length) {
            errorsMsg.name.current.innerHTML = 'Ingrese un nombre';
            errorMsgIsShownCOPY.name = true;
        }
        if (!email.length) {
            errorsMsg.email.current.innerHTML = 'Ingrese un correo electronico';
            errorMsgIsShownCOPY.email = true;
        }
        if (!password.length) {
            errorsMsg.password.current.innerHTML = 'Ingrese una contraseña';
            errorMsgIsShownCOPY.password = true;
        }
        
        return errorMsgIsShownCOPY;
    }

    async function register() {
        try {
            if (!errorMsgIsShown.name && !errorMsgIsShown.email && !errorMsgIsShown.password) {
                const { response } = await axios.post('http://localhost:3001/register', inputValues);
                navigate('/home')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    //////////////////////////////////////////

    return (

        <div className={Styles['register-form-container']}>
            
            <Link to='/' className={Styles['arrowBack-icon-container']}>
                <IoIosArrowRoundBack 
                    color='white' 
                    size='30'
                    className={Styles['arrowBack-icon']}
                />
            </Link>
                
            
            <h2>
                REGISTRARSE 
            </h2>


            <div className={Styles['register-form-input-container']}>

                <label htmlFor='name'> 
                    Nombre: 
                </label>

                <input 
                    type='text' 
                    name='name' 
                    value={inputValues.name} 
                    onChange={handleChange}
                    id={ errorMsgIsShown.name ? Styles['name-input'] : '' }
                ></input>

            </div>
            <p ref={errorsMsg.name} className={ errorMsgIsShown.name ? Styles['invalid-name-message-shown'] : Styles['invalid-name-message'] }>
                -mensaje de error de nombre-
            </p>



            <div className={Styles['register-form-input-container']}>

                <label htmlFor='email'>
                    Correo Electronico: 
                </label>

                <input
                    type='text'
                    name='email'
                    value={inputValues.email} 
                    onChange={handleChange}
                    id={ errorMsgIsShown.email ? Styles['email-input'] : '' }
                ></input>

            </div>
            <p ref={errorsMsg.email} className={errorMsgIsShown.email ? Styles['invalid-email-message-shown'] : Styles['invalid-email-message'] } > 
                -mensaje de error de email-
            </p>



            <div className={Styles['register-form-input-container']}>

                <label htmlFor='password'>
                    Contraseña: 
                </label>

                <input
                    type='password'
                    name='password' 
                    value={inputValues.password} 
                    onChange={handleChange}
                    id={ errorMsgIsShown.password ? Styles['password-input'] : '' }
                ></input>

            </div>
            <p ref={errorsMsg.password} className={ errorMsgIsShown.password ? Styles['invalid-password-message-shown'] : Styles['invalid-name-message'] }> 
                -mensaje de error de contraseña-
            </p>



            <button onClick={handleClick}>
                Confirmar 
            </button>

        </div>

    )

}

export default RegisterForm