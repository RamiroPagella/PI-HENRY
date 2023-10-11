import Styles from './card.module.css';
//
import { Link, useLocation } from 'react-router-dom'

function Card ({ id, name, capital, flagImage }) {

    
    return (
        
        <div className={Styles['card-container']}>

            <p className={Styles['name']}> {name?.toUpperCase()} </p>

            <p className={Styles['capital']}> {capital} </p>

            <Link to={`detail/:${id}`} className={Styles['Link']}>
                <img src={flagImage}></img>
            </Link>
 
        </div>

    )

}

export default Card