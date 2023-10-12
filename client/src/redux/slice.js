import { createSlice, current } from '@reduxjs/toolkit'
//
import divideCountriesInPages from '../utils/divideCountriesInPages';



const initialState = {
    countries: [],
    countriesCOPY: [],
    currentPage: 0,
    searchFilters: {
        continent: 'none',
        population: 'none',
        activity: 'none',
        orderBy: 'A-Z'
    },
    activities: [],

    favorites: [],
    favoritesCOPY: [],
    favCurrentPage: 0,
    favSearchFilters: {
        continent: 'none',
        population: 'none',
        activity: 'none',
        orderBy: 'A-Z'
    },
    activityForm: {
        name: '',
        difficulty: 5,
        duration: '',
        season: '',
        countries: []
    }
}



export const slice = createSlice({
    name: 'globalState',
    initialState,
    reducers: {
        setCountries: (state, action) => {
            const countries = action.payload
            state.countries = countries;
        },
        setCountriesCOPY: (state, action) => {
            state.countriesCOPY = action.payload;
        },
        nextPage: (state) => {
            if (state.currentPage < divideCountriesInPages(state.countries).length - 1) state.currentPage++;
        },
        prevPage: (state) => {
            if (state.currentPage > 0) state.currentPage--;
        },
        setCurrentPage: (state) => {
            state.currentPage = 0;
        },
        setFavCurrentPage: (state) => {
            state.favCurrentPage = 0;
        },
        favPrevPage: (state) => {
            state.favCurrentPage--
        },
        favNextPage: (state) => {
            state.favCurrentPage++
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        setActivities: (state, action) => {
            state.activities = action.payload;
        },
        addFav: (state, action) => {
            state.favorites.push(action.payload);
            state.favoritesCOPY.push(action.payload);
        },
        removeFav: (state, action) => {
            const id = action.payload;
            state.favorites = state.favorites.filter(fav => fav.id !== id)
            state.favoritesCOPY = state.favoritesCOPY.filter(fav => fav.id !== id);
        },
        setFilters: (state, action) => {
            state.searchFilters = action.payload;
        },
        setFavFilters: (state, action) => {
            state.favSearchFilters = action.payload;
        },
        setActivityForm: (state, action) => {
            state.activityForm = action.payload;
        }

    }
})


export const { 
    setCountries, 
    setCountriesCOPY, 
    nextPage, 
    prevPage,
    setCurrentPage, 
    setFavCurrentPage,
    setActivities, 
    addFav, 
    removeFav, 
    setFavorites,
    setFilters,
    setFavFilters,
    favPrevPage,
    favNextPage,
    setActivityForm
} = slice.actions;
export default slice.reducer;
