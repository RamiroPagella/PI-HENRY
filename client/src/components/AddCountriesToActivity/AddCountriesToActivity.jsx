import Styles from './addCountryToActivity.module.css';
//
import { AiOutlineSearch } from 'react-icons/ai';
//
import { useSelector } from 'react-redux';
//
import CountryItem from '../CountryItem/CountryItem';



export default function AddCountryToActivity({ handleCheckbox, isCheckboxChecked }) {

    const countries = useSelector(state => state.app.countries);

    /////////////////////////////

    return (

        <div className={Styles['addCountriesToActivity-container']}>

            <div className={Styles['input-container']}>
                <AiOutlineSearch className={Styles['search-icon']}/>
                <input className={Styles['addCountry-input']} />
            </div>

            <div className={Styles['countries-list-container']}>
                {
                    countries?.map(country => 
                        <CountryItem 
                            key={country.id} 
                            name={country.name} 
                            flagImage={country.flagImage}
                            handleCheckbox={handleCheckbox}
                            isCheckboxChecked={isCheckboxChecked[country.name]}
                        />
                    )
                }
            </div>

        </div>

    )

}