import Styles from './home.module.css';
//
import Cards from '../../components/Cards/Cards'
import Filters from '../../components/Filters/Filters';
import PagingButtons from '../../components/PagingButtons/PagingButtons';

function Home () {



    //////////////////////////

    return (
        
        <div className={Styles['home-container']}>

            <div className={Styles['midNav-container']}>
            
                <Filters />

                <PagingButtons />

            </div>

            <Cards />


        </div>

    )

}

export default Home;