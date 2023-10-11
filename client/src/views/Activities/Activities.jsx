import Styles from './activities.module.css';
//
import CreateActivity from '../../components/CreateActivity/CreateActivity';
import ActivitiesList from '../../components/ActivitiesList/ActivitiesList';


export default function Activities () {

    return (

        <div className={Styles['activities-view-container']}>
            

            <CreateActivity />

            <ActivitiesList/>


        </div>

    )

}