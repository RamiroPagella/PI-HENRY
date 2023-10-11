import Styles from './favCards.module.css';
//
import { useSelector } from 'react-redux';
//
import divideCountriesInPages from '../../../utils/divideCountriesInPages';
//
import Card from '../../Card/Card';


export default function FavCards () {

    const favorites = useSelector(state => state.app.favorites);
    const favoritesInPages = divideCountriesInPages(favorites);
    const favCurrentPage = useSelector(state => state.app.favCurrentPage);

    
    //////////////////////

    return (
        <div className={Styles['cards-container']}>
            
            {
                favorites && favoritesInPages.length ? favoritesInPages[favCurrentPage].map(({ id, name, capital, flagImage }) => 
                    <Card key={id} id={id} name={name} capital={capital} flagImage={flagImage}/>
                )
                :
                <h1 style={{color: 'white'}}> ¡No hay paises en favoritos! </h1>
            }

        </div>
    )

}