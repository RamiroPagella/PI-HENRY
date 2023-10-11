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

    const [ inputValues, setInputValues ] = useState({
        name: '',
        difficulty: 5,
        duration: '',
        season: '',
        countries: []
    })
    
    //

    function changeHandler(e) {
        const inputValuesCOPY = {...inputValues};

        if (e.target.selectedOptions) {
            //const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
            inputValuesCOPY.countries = Array.from(e.target.selectedOptions).map(option => option.value);
        }
        else inputValuesCOPY[e.target.name] = e.target.value;
        
        setInputValues(inputValuesCOPY);
    }


    async function submitHandler() {
        try {
            const { name, difficulty, duration, season, countries} = inputValues;
            if (name && difficulty && duration && season && countries.length) {

                await axios.post('http://localhost:3001/activities', inputValues)
                
                setTimeout(() => {
                    getAllActivitiesFromServer().then(data => {dispatch(setActivities(data))})
                    getAllCountriesFromServer().then(data => {
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
            console.log("Error al realizar el post de la actividad", err.message);
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
                    ></input>
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
                    ></input>
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


                <button 
                    type='button'
                    onClick={submitHandler} 
                    className={Styles['create-activity-button']}
                    >

                    Agregar actividad

                </button>

            </form>


           
        </div>
        



    )

}