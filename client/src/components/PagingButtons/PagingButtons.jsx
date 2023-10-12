import Styles from './pagingButtons.module.css';
//
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
//
import { useSelector, useDispatch } from 'react-redux';
//
import { prevPage, nextPage } from '../../redux/slice.js'
//
import divideCountriesInPages from '../../utils/divideCountriesInPages';
import { current } from '@reduxjs/toolkit';



export default function PagingButtons () {

    const currentPage = useSelector(state => state.app.currentPage);
    const countries = useSelector(state => state.app.countries);
    const countriesInPages = divideCountriesInPages(countries);


    const dispatch = useDispatch(); //corregir el -1

    return (
        <div className={Styles['paging-container']}>
            <div className={Styles['pagingButtons-container']}>

            {
                countries.length && currentPage > 0 ?
                (<button 
                    className={Styles['paging-button']} 
                    onClick={() => {dispatch(prevPage())}}
                    >

                    <MdKeyboardArrowLeft 
                        className={Styles['paging-icon']} 
                        size={50}
                    />
                </button>)
                :
                <div style={{width: '50px'}}></div>
            }
            

            <p>
                {`${currentPage + 1} / ${countriesInPages.length > 0 ? countriesInPages.length : 1 }`}
            </p>

            {
                countries.length && currentPage !== countriesInPages.length - 1 ?
                (<button   
                    className={Styles['paging-button']} 
                    onClick={() => {dispatch(nextPage())}}
                    >

                    <MdKeyboardArrowRight 
                        className={Styles['paging-icon']} 
                        size={50}
                    />
                </button>)
                :
                <div style={{width: '50px'}}></div>
            }
            

            </div>
        </div>
        

    )

}