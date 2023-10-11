import Styles from './favPagingButtons.module.css';
//
import { useSelector, useDispatch } from 'react-redux';
//
import divideCountriesInPages from '../../../utils/divideCountriesInPages';
//
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
//
import { favPrevPage, favNextPage } from '../../../redux/slice';



export default function FavPagingButtons () {

    const dispatch = useDispatch();

    const favCurrentPage = useSelector(state => state.app.favCurrentPage);
    const favorites = useSelector(state => state.app.favorites);
    const favoritesInPages = divideCountriesInPages(favorites);

    return (
        <div className={Styles['paging-container']}>
            <div className={Styles['pagingButtons-container']}>
                
            <MdKeyboardArrowLeft 
                id={favCurrentPage === 0 || !favorites.length ? Styles['paging-button-off'] : ''}
                className={Styles['paging-button']} 
                size={50}
                onClick={() => {dispatch(favPrevPage())}}
            />

            <p>
                {`${favCurrentPage} / ${favoritesInPages.length ? favoritesInPages.length - 1 : 0}`}
            </p>

            <MdKeyboardArrowRight 
                id={favorites.length && favCurrentPage === favoritesInPages.length - 1 || !favorites.length ? Styles['paging-button-off'] : ''}
                className={Styles['paging-button']} 
                size={50}
                onClick={() => {dispatch(favNextPage())}}
            />

            </div>
        </div>
    )

}