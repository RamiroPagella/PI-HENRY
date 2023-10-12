import Styles from './activitiesList.module.css';
//
import { useSelector, useDispatch } from 'react-redux'
//
import ActivityItem from '../ActivitiyItem/ActivityItem';
//
//



export default function ActivitiesList () {

    const dispatch = useDispatch();
    const activities = useSelector(state => state.app.activities);
  


    return (

        <div className={Styles['activities-list-container']}>

            <div className={Styles['activities-list-title']}>
                <h1 >Tus Actividades:</h1>
            </div>

            <div className={Styles['activities-list']}>
                
                {
                    activities.length ? activities.map(({ id, name, difficulty, duration, season, countries }) => 
                        <ActivityItem 
                            key={id} 
                            id={id}
                            name={name} 
                            difficulty={difficulty} 
                            duration={duration} 
                            season={season} 
                            countries={countries}
                        />
                    )
                    :
                    <h1 style={{color: 'white', textAlign:'center'}}>¡No hay actividades creadas!</h1>
                }

            </div>
        </div>

    )

}