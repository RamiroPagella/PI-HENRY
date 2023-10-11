import Styles from './filters.module.css'
//
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
//
import filterCountries from '../../utils/filterCountries';
//
import { setFilters, setCountries, setCurrentPage } from '../../redux/slice';
//
import { BiSolidDownArrow, BiFilter } from 'react-icons/bi';



export default function Filters () {

    const dispatch = useDispatch();

    const activities = useSelector(state => state.app.activities);
    const countriesCOPY = useSelector(state => state.app.countriesCOPY);
    const searchFilters = useSelector(state => state.app.searchFilters);
    const [ searchFiltersLOCAL, setSearchFiltersLOCAL ] = useState(searchFilters);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        const searchFiltersCOPY = {...searchFilters};

        searchFiltersCOPY[name] = value;

        dispatch(setFilters(searchFiltersCOPY));
        setSearchFiltersLOCAL(searchFiltersCOPY);
        
        dispatch(setCurrentPage());
        dispatch(setCountries(filterCountries(countriesCOPY, searchFiltersCOPY)));
    }
    
    /////////////////////////////////////////////////////////

    return (
        <div className={Styles['filter-buttons-container']}>

            <select 
                name='continent' 
                value={searchFiltersLOCAL.continent} 
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
                value={searchFiltersLOCAL.population} 
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
                value={searchFiltersLOCAL.activity} 
                onChange={handleChange}
                >

                <option value='none'>Actividades</option>
                
                {activities?.map(({ name }) =>
                    <option value={name} key={name}> {name} </option>
                )}
                

            </select>

            <select 
                name='orderBy' 
                value={searchFiltersLOCAL.orderBy} 
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