export default function filterCountries(countries, filters) {
    let filteredCountries = [...countries]
    const { continent, population, activity, orderBy } = filters
    if (continent !== 'none') {
        filteredCountries = filteredCountries.filter(country => country.continent === continent)
    }
    if (population !== 'none') {
        let [ min, max ] = population.split('-');
        filteredCountries = filteredCountries.filter(({ population }) => population >= min && population <= max ? true : false)
    }
    if (activity !== 'none') {
        filteredCountries = filteredCountries.filter(country => {
            if (Array.isArray(country) && !country.activities.length) return false;
            else {
                for (const act of country.activities) {
                    if (act.name === activity) return true;
                }
                return false;
            }
        })
    }
    if (orderBy !== 'A-Z') {
        if (orderBy === 'Z-A') filteredCountries = filteredCountries.sort((a, b) => a.name < b.name ? 1 : -1);
        if (orderBy === 'populationAsc') filteredCountries = filteredCountries.sort((a, b) => Number(a.population) - Number(b.population))
        if (orderBy === 'populationDesc') filteredCountries = filteredCountries.sort((a, b) => Number(b.population) - Number(a.population))
    }

    return filteredCountries;
}
