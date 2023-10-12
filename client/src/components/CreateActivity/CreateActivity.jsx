import Styles from './createActivity.module.css';
//
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//
import getAllActivitiesFromServer from '../../utils/getAllActivitiesFromServer';
import getAllCountriesFromServer from '../../utils/getAllCountriesFromServer';
import filterCountries from '../../utils/filterCountries';
//
import axios from 'axios';
//
import { setActivities, setCountries, setCountriesCOPY, setActivityForm } from '../../redux/slice';
//


export default function CreateActivity () {

    const dispatch = useDispatch();

    const countries = useSelector(state => state.app.countries);
    const searchFilters = useSelector(state => state.app.searchFilters);

    const [ activityAlreadyExists, setActivityAlreadyExists ] = useState(false);

    const activityForm = useSelector(state => state.app.activityForm);
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
        const inputValuesCOPY = {...inputValues};

        if (selectedOptions) {
            inputValuesCOPY.countries = Array.from(e.target.selectedOptions).map(option => option.value)
        }
        else {
            setActivityAlreadyExists(false);
            inputValuesCOPY[name] = value;
        }   

        setInputValues(inputValuesCOPY);
        dispatch(setActivityForm(inputValuesCOPY));

    }


    async function submitHandler() {
        try {
            const { name, difficulty, duration, season, countries} = inputValues;

            if (name !== '' && name.length < 25 &&
                difficulty >= 1 &&  difficulty <= 5 && 
                /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(duration) && 
                season !== '' && 
                countries.length) {

                await axios.post('http://localhost:3001/activities', inputValues);
                
                setTimeout(() => {
                    getAllActivitiesFromServer().then(data => {
                        dispatch(setActivities(data))
                    })
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


    useEffect(() => {
        setInputValues(activityForm);
    }, [])
    ////////////////////////////////////////////////////////////////

    return (
        <div className={Styles['create-activity-container']}>


            <div id={Styles['title-container']}>
                <h1>
                    AGREGAR ACTIVIDAD
                </h1>
            </div>



            <form className={Styles['create-activity-form']}>
                {!inputValues.name.length ? <p className={Styles['red-text']} style={{top: '5%'}}> * </p> : null}

                <div className={Styles['input-container']}>
                    <label>Nombre:</label>
                    <input 
                        type='text' 
                        name='name' 
                        value={inputValues.name}
                        onChange={changeHandler}
                        id={Styles['name-input']}
                        style={inputValues.name > 25 || !inputValues.name.length ? {border: 'solid red 1px'} : null}
                    ></input>

                    
                    {inputValues.name.length > 25 ? <p className={Styles['red-text']} id={Styles['incorrect-name']}> Menor a 25 caracteres. </p> : null}
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
                        style={!inputValues.duration.length ? {border: 'solid red 1px'} : null}
                    ></input>
                    

                </div>
                {!inputValues.duration.length ? <p className={Styles['red-text']} style={{bottom: '53%'}}> * </p> : null}


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
                {!inputValues.season.length ? <p className={Styles['red-text']} style={{bottom: '35%'}}> * </p> : null}


                <select 
                    multiple 
                    onChange={changeHandler}
                    id={Styles['countries-select']}
                    >
                    {
                        countries?.map(country => country.name)
                        .map(name => 
                            <option value={name} key={name} > {name} </option>
                        )
                    }
                </select>
                {!inputValues.countries.length ? <p className={Styles['red-text']} style={{bottom: '15%'}}> * </p> : null}

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