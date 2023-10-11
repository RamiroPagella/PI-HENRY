import Styles from './countryActivities.module.css';
//
import CountryActivityItem from './countryActivityItem/countryActivityItem';
//
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//
import getCountryByIdFromServer from '../../utils/getCountryByIdFromServer';


export default function CountryActivities ({ activities }) {
    

    return (

        <div className={Styles['country-activities-container']}>

            <div className={Styles['country-activities-title-container']}>
                <h1>
                    ACTIVIDADES DEL PAIS
                </h1>
            </div>

            <div className={Styles['country-activities-items']}>
                {
                    activities?.map(({ id, name, difficulty, duration, season }) => 
                        <CountryActivityItem
                            key={id}
                            name={name} 
                            difficulty={difficulty} 
                            duration={duration}
                            season={season}
                        />
                    )
                }
            </div>
            

        </div>

    )

}
