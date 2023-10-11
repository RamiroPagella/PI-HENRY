import Styles from './activityItem.module.css';
//
import { useState } from 'react';


export default function ActivityItem ({ name, difficulty, duration, season, countries }) {

    const [ isOpen, setIsOpen ] = useState(false);

    return (

        <div className={Styles['activity-item-container']}>
            <div id={Styles['title-container']}>
                <h3>{name}</h3>
            </div>

            <div className={Styles['info-containers']}>

                <div className={Styles['info-container']}>
                    <p className={Styles['info-left']}>Dificultad:</p> <p className={Styles['info-right']}>{difficulty}</p>
                </div>

                <div className={Styles['info-container']} id={Styles['infoContainer-mid']}>
                    <p className={Styles['info-left']}>Duracion:</p> <p className={Styles['info-right']}>{duration}</p>
                </div>

                <div className={Styles['info-container']}>
                    <p className={Styles['info-left']}>Temporada:</p> <p className={Styles['info-right']}>{season}</p>
                </div>

            </div>

            {
                isOpen?
                (<div className={Styles['activity-countries']}>
                    {
                        countries.map(country => 
                            <p key={country}> {country} </p>
                        )
                    }
                </div>)
                :
                null
            }
            


        </div>

    )

}