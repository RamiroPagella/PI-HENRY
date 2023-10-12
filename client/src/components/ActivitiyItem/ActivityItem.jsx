import Styles from './activityItem.module.css';
//
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
//
import { setActivities, setCountries } from '../../redux/slice';
//
import axios from 'axios';
//
import getAllActivitiesFromServer from '../../utils/getAllActivitiesFromServer';
import getAllCountriesFromServer from '../../utils/getAllCountriesFromServer';




export default function ActivityItem ({ id, name, difficulty, duration, season, countries }) {

    const dispatch = useDispatch();

    const [ isOpen, setIsOpen ] = useState(false);
    const activities = useSelector(state => state.app.activities);

    //

    function handleDelete (e) {
        axios.delete(`http://localhost:3001/activities/query?name=${name}`)
        .catch(err => console.log(err));

        let activitiesCOPY = [...activities];
        let index = activities.findIndex(act => act.name === name);
        activitiesCOPY.splice(index, 1);

        dispatch(setActivities(activitiesCOPY));
        setTimeout(() => {
            getAllCountriesFromServer().then(data => dispatch(setCountries(data)));
        }, 50)
    }

    function handleDeleteCountry(e) {
        const countryName = e.target.innerHTML;

        axios.put('http://localhost:3001/activities', {activityID: id, countryName: countryName})
        .catch(error => console.log(error));
        setTimeout(() => {
            getAllActivitiesFromServer().then(data => dispatch(setActivities(data)))
            getAllCountriesFromServer().then(data => dispatch(setCountries(data)));
        }, 50)
    }

    ///////////////////////////////////////////////

    return (

        <div className={Styles['activityItem-container-closed']} id={isOpen ? Styles['activityItem-container-open'] : ''} >

            <div id={Styles['title-container']}>
                <h3>
                    {name}
                </h3>
            </div>

            <div className={Styles['info-containers']} onClick={() => setIsOpen(!isOpen)}>

                <div id={Styles['deleteIcon-container']} onClick={handleDelete}>
                    <MdDeleteForever
                    id={Styles['delete-icon']} size={35}/>
                </div>

                <div className={Styles['info-container']}>
                    <p className={Styles['info-left']}>Dificultad:</p> 
                    <p className={Styles['info-right']}>{difficulty}</p>
                </div>

                <div className={Styles['info-container']} id={Styles['infoContainer-mid']}>
                    <p className={Styles['info-left']}>Duracion:</p> 
                    <p className={Styles['info-right']}>{duration}</p>
                </div>

                <div className={Styles['info-container']}>
                    <p className={Styles['info-left']}>Temporada:</p> 
                    <p className={Styles['info-right']}>{season}</p>
                </div>

            </div>

            {
                isOpen ? 
                <MdKeyboardArrowLeft id={Styles.iconOpen} size={30}/> 
                : 
                <MdKeyboardArrowDown id={Styles.iconClosed} size={30}/>
            }
            
            

            {
                isOpen?
                (<div className={Styles['activity-countries']}>
                    <p>La actividad se puede llevar a cabo en:</p>

                    <div id={Styles['countries-list']}>
                    {
                        countries?.map(country => 
                            <p 
                                id={Styles.countryItem}style={{color: 'white'}} 
                                key={country}
                                onClick={countries.length === 1 ? handleDelete : handleDeleteCountry}

                            > 
                                {country} 
                            </p>
                        )
                    }                   
                    </div>

                    <h5>Click en algun pais para eliminarlo.</h5>

                </div>)
                :
                null
            }
            


        </div>

    )

}