import Styles from './navBarBottom.module.css';
//
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { RiHome2Line } from 'react-icons/ri';
import { GiMountains } from 'react-icons/gi'
//
import { Link, useLocation } from 'react-router-dom';

export default function NavBarBottom () {

    const { pathname } = useLocation();

    return (

        <div className={Styles['navBar-bottom-container']}>


            <Link 
                to='/favorites'
                className={Styles['navBarBottom-icon-container']} 
                id={pathname === '/favorites' ? Styles.isSelected : ''}
                >

                <MdOutlineFavoriteBorder 
                    color='white' 
                    className={Styles['navBarBottom-icon']} 
                    style={{width: '35px', height: '35px'}}
                />

            </Link>


            <Link 
                to='/home'
                className={Styles['navBarBottom-icon-container']}
                id={pathname === '/home' ? Styles.isSelected : ''}
                >

                <RiHome2Line 
                    color='white' 
                    className={Styles['navBarBottom-icon']} 
                    style={{width: '35px', height: '35px'}}
                />

            </Link>


            <Link 
                to='/activities'
                className={Styles['navBarBottom-icon-container']}
                id={pathname === '/activities' ? Styles.isSelected : ''}
                >

                <GiMountains 
                    color='white' 
                    className={Styles['navBarBottom-icon']} 
                    style={{width: '35px', height: '35px'}}
                />

            </Link>



        </div>

    )

}