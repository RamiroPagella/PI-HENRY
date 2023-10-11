import Styles from './favorites.module.css';
//
import FavFilters from '../../components/Filters/FavFilters/FavFilters';
import FavPagingButtons from '../../components/PagingButtons/FavPagingButtons/FavPagingButtons';
import FavCards from '../../components/Cards/FavCards/FavCards';

export default function Favorites () {

    return (

        <div className={Styles['favorites-view-container']}>

            <div className={Styles['midNav-container']}>

                <FavFilters />

                <FavPagingButtons />

            </div>

            <FavCards />

        </div>

    )

}