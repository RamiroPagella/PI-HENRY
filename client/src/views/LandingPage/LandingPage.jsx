import LoginForm from '../../components/LoginForm/LoginForm'
//
import Styles from './landingPage.module.css'
//
import { Link } from 'react-router-dom'

export default function LandingPage () {


    return (
        <div className={Styles['landing-page-container']}>


            <h4>
                H.E.N.R.Y countries
            </h4>

            <LoginForm />

            <Link to='register' style={{textDecoration: 'none', color: 'white'}}>
                <p className={Styles['registrarse-text-button']} >REGISTRARSE</p>
            </Link>

            <h4 className={Styles['PI-text']}> 
                P.I
            </h4>

        </div>
    )

}