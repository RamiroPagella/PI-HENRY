import Styles from './cards.module.css'
//
import Card from '../Card/Card'
//
import { useSelector } from 'react-redux';
//
import divideCountriesInPages from '../../utils/divideCountriesInPages';


function Cards () {    

    const countries = useSelector(state => state.app.countries);
    const countriesInPages = divideCountriesInPages(countries)
    const currentPage = useSelector(state => state.app.currentPage);

    ///////////////////////


    return (

        <div className={Styles['cards-container']}>
            
            
            {
                countries && countriesInPages.length ? countriesInPages[currentPage].map(({ id, name, capital, flagImage }) => (
                    <Card key={id} id={id} name={name} capital={capital} flagImage={flagImage}/>
                )) 

                :

                (
                    <h1 style={{color: 'white'}}> ¡No se encontraron paises! </h1>
                )
            }
                
            

        </div>

    )

}

export default Cards