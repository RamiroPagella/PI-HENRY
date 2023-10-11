import Styles from './navBar.module.css';
//
import NavBarBottom from './NavBarBottom/NavBarBottom';
import NavBarTop from './NavBarTop/NavBarTop';

export default function NavBar () {

    return (

        <div className={Styles['navBar-container']}>

            <NavBarTop />
            <NavBarBottom />

        </div>

    )

}