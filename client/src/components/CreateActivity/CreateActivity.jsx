import Styles from './createActivity.module.css';
//
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//
import getAllActivitiesFromServer from '../../utils/getAllActivitiesFromServer';
import getAllCountriesFromServer from '../../utils/getAllCountriesFromServer';
import filterCountries from '../../utils/filterCountries';
//
import axios from 'axios';
//
import { setActivities, setCountries, setCountriesCOPY } from '../../redux/slice';
//


export default function CreateActivity () {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.app.countries);
    const searchFilters = useSelector(state => state.app.searchFilters);
    const countryNames = countries.map(country => country.name);

    const [ isNameEmpty, setIsNameEmpty ] = useState(true);
    const [ isDurationEmpty, setIsDurationEmpty ] = useState(true);
    const [ isNameIncorrect, setIsNameIncorret] = useState(false);
    const [ isSeasonEmpty, setIsSeasonEmpty] = useState(true);
    const [ isCountriesEmpty, setIsCountriesEmpty ] = useState(true);
    const [ activityAlreadyExists, setActivityAlreadyExists ] = useState(false);

    const [ inputValues, setInputValues ] = useState({
        name: '',
        difficulty: 5,
        duration: '',
        season: '',
        countries: []
    })
    
    //

    function changeHandler(e) {
        const { selectedOptions, name, value} = e.target;

        if (selectedOptions) {
            setIsCountriesEmpty(false);
            setInputValues({
                ...inputValues,
                countries: Array.from(e.target.selectedOptions).map(option => option.value)
            })
        }
        else {
            if (name === 'name') {
                if (value === '') setIsNameEmpty(true);
                if (value.length > 25) setIsNameIncorret(true)
                else {
                    setIsNameEmpty(false);
                    setIsNameIncorret(false);
                    setActivityAlreadyExists(false);
                }
            }
            if (name === 'duration') {
                if (value === '') setIsDurationEmpty(true);
                else setIsDurationEmpty(false);
            }
            if (name === 'season') {
                if (value === '') setIsSeasonEmpty(true);
                else setIsSeasonEmpty(false);
            }

            setInputValues({
                ...inputValues,
                [name]: value
            })
        }
    }


    async function submitHandler() {
        try {
            const { name, difficulty, duration, season, countries} = inputValues;
            if (name !== '' &&
             difficulty >= 1 && 
             difficulty <= 5 && 
             /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(duration) && 
             season !== '' && 
             countries.length) {

                const { response } = await axios.post('http://localhost:3001/activities', inputValues);
                
                setTimeout(() => {
                    getAllActivitiesFromServer().then(data => {dispatch(setActivities(data))})
                    getAllCountriesFromServer().then(data => {
                        //se actualizan los paises y se vuelven a aplicar los filtros
                        dispatch(setCountries(filterCountries(data, searchFilters)));
                        dispatch(setCountriesCOPY(data))
                    })
                }, 100) 
                
                setInputValues({
                    name: '',
                    difficulty: 5,
                    duration: '',
                    season: '',
                    countries: []
                })

            }
        } catch (err) {
            if (err.response.data.activityAlreadyExists) setActivityAlreadyExists(true);
            console.log("Error al realizar el post de la actividad", err);
        }
    }   

    ////////////////////////////////////////////////////////////////

    return (
        <div className={Styles['create-activity-container']}>


            <div id={Styles['title-container']}>
                <h1>
                    AGREGAR ACTIVIDAD
                </h1>
            </div>



            <form className={Styles['create-activity-form']}>


                <div className={Styles['input-container']}>
                    <label>Nombre:</label>
                    <input 
                        type='text' 
                        name='name' 
                        value={inputValues.name}
                        onChange={changeHandler}
                        id={Styles['name-input']}
                        style={isNameEmpty || isNameIncorrect ? {border: 'solid red 1px'} : null}
                    ></input>

                    {isNameEmpty ? <p className={Styles['red-text']}> * </p> : null}
                    {isNameIncorrect ? <p className={Styles['red-text']} id={Styles['incorrect-name']}> Menor a 25 caracteres. </p> : null}
                    {activityAlreadyExists ? <p className={Styles['red-text']} id={Styles['activity-already-exists']}> Ya existe una actividad con el mismo nombre. </p> : null}

                </div>               

                <div className={Styles['input-container']}>
                    <label>Dificultad:</label>
                    <input
                        type='range'
                        min='1'
                        max='5'
                        name='difficulty'
                        value={inputValues.difficulty}
                        onChange={changeHandler}
                    ></input>
                    <p id={Styles.p}>{inputValues.difficulty}</p>
                </div>


                <div className={Styles['input-container']}>
                    <label>Duracion:</label>
                    <input
                        type='time' 
                        min='00:00' 
                        max='12:00' 
                        name='duration'
                        value={inputValues.duration}
                        onChange={changeHandler}
                        style={isDurationEmpty ? {border: 'solid red 1px'} : null}
                    ></input>
                    
                    {isDurationEmpty ? <p className={Styles['red-text']} style={{right: '30%'}}> * </p> : null}

                </div>

                <div className={Styles['input-container']} id={Styles['input-container-last']}>

                    <label>Temporada:</label>
                    <div id={Styles['radioInputs-container']}>

                        <label>
                            Verano
                            <input 
                                type='radio' 
                                name='season' 
                                value='Verano'
                                onChange={changeHandler}
                            ></input>
                        </label>

                        <label>
                            Otoño
                            <input
                                type='radio' 
                                name='season' 
                                value='Otoño'
                                onChange={changeHandler}
                            ></input>
                        </label>

                        <label>
                            Invierno
                            <input 
                                type='radio' 
                                name='season' 
                                value='Invierno'
                                onChange={changeHandler}
                            ></input>
                        </label>

                        <label>
                            Primavera
                            <input 
                                type='radio' 
                                name='season' 
                                value='Primavera'
                                onChange={changeHandler}
                            ></input>
                        </label>

                    </div>
            
                    {isSeasonEmpty ? <p className={Styles['red-text']} style={{top: '8%', right: '32%'}}> * </p> : null}


                </div>

                <select 
                    multiple 
                    onChange={changeHandler}
                    id={Styles['countries-select']}
                    >
                    {
                        countryNames?.map(name => <option value={name} key={name} > {name} </option>)
                    }
                </select>
                {isCountriesEmpty ? <p className={Styles['red-text']} style={{bottom: '17%'}}> * </p> : null}

                {
                    inputValues.name !== '' &&
                    inputValues.difficulty >= 1 && 
                    inputValues.difficulty <= 5 && 
                    /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(inputValues.duration) && 
                    inputValues.season !== '' && 
                    inputValues.countries.length ?
                    (<button 
                    type='button'
                    onClick={submitHandler} 
                    className={Styles['create-activity-button']}
                    >

                    Agregar actividad

                    </button>)
                    :
                    null
                } 

                

            </form>


           
        </div>
        



    )

}