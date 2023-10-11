import Styles from './navBarTop.module.css';
//
import { IoEarthOutline } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
//
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//
import { setCountries, setCurrentPage } from '../../../redux/slice';
//
import getCountriesByNameFromServer from '../../../utils/getCountriesByNameFromServer';
import filterCountries from '../../../utils/filterCountries';

export default function navBarTop () {

    const dispatch = useDispatch();
    const countriesCOPY = useSelector(state => state.app.countriesCOPY);
    const searchFilters = useSelector(state => state.app.searchFilters);
    const [ inputValue, setInputValue ] = useState('');

    function changeHandler (e) {
        const { value } = e.target;
       
        setInputValue(value);
    }


    useEffect(()=>{
        if (inputValue !== '') {
            
            const debounceTimeout = setTimeout(() => { 
                dispatch(setCurrentPage());
                getCountriesByNameFromServer(inputValue).then(data => 
                    dispatch(setCountries(filterCountries(data, searchFilters)))
                );
            }, 200)

            return () => {
                clearTimeout(debounceTimeout);
            }
        }
        else {
            dispatch(setCountries(filterCountries([...countriesCOPY], searchFilters)))
            dispatch(setCurrentPage())
        }
    }, [inputValue])

    //////////////////////////////////////////////////////////////

    return (

        <div className={Styles['navBar-top-container']}>

            <IoEarthOutline className={Styles['earth-icon']} />


            <AiOutlineSearch className={Styles['search-icon']} />

            <input 
                className={Styles['search-input']} 
                onChange={changeHandler}
                >

            </input>

            
        </div>

    )

}