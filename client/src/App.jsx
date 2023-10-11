import './App.css'
//
import LandingPage from './views/LandingPage/LandingPage';
import RegisterForm from './views/Register/RegisterPage';
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Detail from './views/Detail/Detail';
import Favorites from './views/Favorites/Favorites';
import Activities from './views/Activities/Activities';
//
import { Routes, Route, useLocation } from 'react-router-dom'
//
import { useEffect } from 'react';
//
import { useDispatch } from 'react-redux'
import { setCountries, setCountriesCOPY, setActivities } from './redux/slice.js';
//
import getAllCountriesFromServer from './utils/getAllCountriesFromServer';
import getAllActivitiesFromServer from './utils/getAllActivitiesFromServer';


function App() {

  const location = useLocation();
  const dispatch = useDispatch()


  useEffect(() => {
    
    getAllCountriesFromServer().then(data => {
      dispatch(setCountries(data));
      dispatch(setCountriesCOPY(data))
    })

    getAllActivitiesFromServer().then(data => {
      dispatch(setActivities(data))
    }).catch(err => console.log("No hay actividades creadas", err.message))


  }, []) 

  ////////////////////////////////////

  return (
    <div className='App'>

      { location.pathname !== '/' && location.pathname !== '/register' ? (<NavBar />) : null }
      
      <Routes>

        <Route path='/' element={ <LandingPage/> } />

        <Route path='/register' element={ <RegisterForm/> } />

        <Route path='/favorites' element={ <Favorites/> } />

        <Route path='/home' element={ <Home /> } />

        <Route path='home/detail/:id' element={ <Detail/> } />
        <Route path='favorites/detail/:id' element={ <Detail/> } />

        <Route path='/activities' element={ <Activities/> } />


      </Routes>

    </div>
  )
}

export default App
