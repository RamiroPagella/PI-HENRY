import Styles from './favFilters.module.css';
//
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
//
import { setFavFilters, setFavCurrentPage, setFavorites } from '../../../redux/slice';
//
import filterCountries from '../../../utils/filterCountries'
//
import { BiSolidDownArrow, BiFilter } from 'react-icons/bi';



export default function FavFilters () {

    const dispatch = useDispatch();

    const activities = useSelector(state => state.app.activities);
    const favoritesCOPY = useSelector(state => state.app.favoritesCOPY);
    const favSearchFilters = useSelector(state => state.app.favSearchFilters);
    const [ favSearchFiltersLOCAL, setFavSearchFiltersLOCAL ] = useState(favSearchFilters);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        const favSearchFiltersCOPY = {...favSearchFilters};

        favSearchFiltersCOPY[name] = value;

        dispatch(setFavFilters(favSearchFiltersCOPY));
        setFavSearchFiltersLOCAL(favSearchFiltersCOPY);
        
        dispatch(setFavCurrentPage());
        dispatch(setFavorites(filterCountries(favoritesCOPY, favSearchFiltersCOPY)));
    }

    useEffect(() => {
        dispatch(setFavCurrentPage());
        dispatch(setFavorites(filterCountries(favoritesCOPY, {...favSearchFilters})));
    }, [favoritesCOPY])
    /////////////////////////////////////////////////////////

    return (
        <div className={Styles['filter-buttons-container']}>

            <select 
                name='continent' 
                value={favSearchFiltersLOCAL.continent} 
                onChange={handleChange}
                >

                <option value='none'>Continentes</option>
                <option value='Africa'>África</option>
                <option value='Antarctica'>Antartida</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europa</option>
                <option value='North America'>America Del Norte</option>
                <option value='Oceania'>Oceania</option>
                <option value='South America'>America del Sur</option>

            </select>

            <select 
                name='population' 
                value={favSearchFiltersLOCAL.population} 
                onChange={handleChange}
                >

                <option value='none'>Población</option>
                <option value='0-10000000'> 0 - 10.000.000 </option>
                <option value='10000000-50000000'> 10.000.000 - 50.000.000 </option>
                <option value='50000000-100000000'> 50.000.000 - 100.000.000 </option>
                <option value='100000000-200000000'> 100.000.000 - 200.000.000 </option>
                <option value='200000000-500000000'> 200.000.000 - 500.000.000 </option>
                <option value='500000000-1000000000'> 500.000.000 - 1.000.000.000 </option>
                <option value='1000000000-1500000000'> 1.000.000.000 - 1.500.000.000 </option>

            </select>        

            <BiFilter
                style={{color: 'white'}}
                size={40}
            />

            <select 
                name='activity' 
                value={favSearchFiltersLOCAL.activity} 
                onChange={handleChange}
                >

                <option value='none'>Actividades</option>
                
                {activities?.map(({ name }) =>
                    <option value={name} key={name}> {name} </option>
                )}
                
            </select>

            <select 
                name='orderBy' 
                value={favSearchFiltersLOCAL.orderBy} 
                onChange={handleChange}
                >

                <option value='A-Z'> A-Z </option>
                <option value='Z-A'> Z-A </option>
                <option value='populationAsc'> Poblacion ascendente </option>
                <option value='populationDesc'> Poblacion descendiente </option>

            </select>


            <BiSolidDownArrow className={Styles['icon']} id={Styles.icon1}/>
            <BiSolidDownArrow className={Styles['icon']} id={Styles.icon2}/>
            <BiSolidDownArrow className={Styles['icon']} id={Styles.icon3}/>
            <BiSolidDownArrow className={Styles['icon']} id={Styles.icon4}/>


        </div>
    )

}