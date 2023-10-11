import Styles from './registerPage.module.css'
//
import RegisterForm from '../../components/RegisterForm/RegisterForm';

function RegisterPage () {

    


    return (

        <div className={Styles['register-page']}>
            
            <RegisterForm />

        </div>

    )

}

export default RegisterPage;