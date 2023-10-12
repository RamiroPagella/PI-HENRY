import Styles from './detail.module.css';
//
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdFavorite } from 'react-icons/md';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
//
import CardDetail from '../../components/CardDetail/CardDetail';
import CountryActivities from '../../components/CountryActivities.jsx/CountryActivities';
//
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
//
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
//
import { addFav, removeFav } from '../../redux/slice';




export default function Detail () {

    const [ forceUpdate, setForceUpdate ] = useState(false);
    const [ isLeftButtonDisabled, setIsLeftButtonDisabled ] = useState(false);
    const [ isRightButtonDisabled, setIsRightButtonDisabled ] = useState(false);

    const { id } = useParams();
    const [ country, setCountry ] = useState({});
    const [ prevCountryID, setPrevCountryID ] = useState('');
    const [ nextCountryID, setNextCountryID ] = useState('');

    const countries = useSelector(state => state.app.countries);
    const favorites = useSelector(state => state.app.favorites);
    const isInFavs = favorites.find(fav => fav.id === country?.id)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    

    function handleFav(e) {
        if (!isInFavs) dispatch(addFav(country));
        else {
            dispatch(removeFav(country.id))
        }
    }
    function handleClick(e) {
        if (e.target.name === 'prevButton') {
            navigate(`/home/detail/:${prevCountryID}`);
            setForceUpdate(!forceUpdate);
        }
        if (e.target.name === 'nextButton')  {
            navigate(`/home/detail/:${nextCountryID}`);
            setForceUpdate(!forceUpdate);
        }
    }
 


    useEffect(() => {

        let actual = countries?.find(countries => countries.id === id.slice(1));

        function setPrevActualNext() {
            let prevID = '';
            let nextID = '';

            //encontrar el anterior y el siguiente
            if (countries) {

                for (let i = 0; i < countries.length; i++) {
                    if (countries[i].id === actual?.id) {

                        let prev = countries[i - 1];
                        let next = countries[i + 1];

                        if (prev && next){
                            setIsLeftButtonDisabled(false);
                            setIsRightButtonDisabled(false);
                            prevID = prev.id;
                            nextID = next.id;
                        }
                        if (!prev && next) {
                            setIsLeftButtonDisabled(true);
                            nextID = next.id;
                        }
                        if (prev && !next) {
                            setIsRightButtonDisabled(true);
                            prevID = prev.id;
                        }
                        if (!prev && !next) {
                            setIsRightButtonDisabled(true);
                            setIsLeftButtonDisabled(true);
                        }
                    }
                }

            }

            setCountry(actual);
            if (prevID) setPrevCountryID(prevID);
            if (nextID) setNextCountryID(nextID);
        }
        setPrevActualNext();

        if(!country) setForceUpdate(!forceUpdate);

    }, [forceUpdate])
   

    /////////////////////////////////////////////////////////////

    return (

        <div className={Styles['detail-view-container']}>

            {
                pathname.includes('/home') ?  
                (<button 
                    name='prevButton' 
                    onClick={handleClick} 
                    disabled={isLeftButtonDisabled}
                    className={Styles['paging-button']}
                    id={!isLeftButtonDisabled ? Styles['paging-button-left'] : Styles['paging-button-off']}
                    >

                    <MdKeyboardArrowLeft className={Styles['paging-icon']} size={50}/>
                </button>)
                :
                null
            }
           
           

            <div className={Styles['detail-items-container']}> 

                <CardDetail
                    id={country?.id}
                    name={country?.name?.toUpperCase()}
                    flagImage={country?.flagImage}
                    continent={country?.continent?.toUpperCase()}
                    capital={country?.capital?.toUpperCase()}
                    population={country?.population}
                    subregion={country?.subregion?.toUpperCase()}
                />
                
                <div className={Styles['icons-container']}>

                    {
                        isInFavs ? 
                        (<MdFavorite 
                            onClick={handleFav}
                            className={Styles.icon}
                            size={50}
                        />) :
                        (<MdOutlineFavoriteBorder 
                            onClick={handleFav}
                            className={Styles.icon}
                            size={50}
                        />)
                    }
                    
                        
                    <Link to={`/activities`} className={Styles.Link}>

                        <AiOutlinePlusCircle 
                            className={Styles.icon}
                            size={50}
                        />

                    </Link>


                </div>

                <CountryActivities activities={country?.activities}/>

            </div>

            {
                pathname.includes('/home') ? 
                (<button 
                    name='nextButton' 
                    onClick={handleClick} 
                    disabled={isRightButtonDisabled}
                    className={Styles['paging-button']}
                    id={!isRightButtonDisabled ? Styles['paging-button-right'] : Styles['paging-button-off']}
                    >

                    <MdKeyboardArrowRight className={Styles['paging-icon']} size={50}/>
                </button>)
                :
                null
            }

            
        </div>

    )

}