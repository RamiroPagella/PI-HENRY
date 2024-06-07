function divideCountriesInPages(arr) {
  const divisiones = [];
  for (let i = 0; i < arr.length; i += 15) {
    const division = arr.slice(i, i + 15);
    divisiones.push(division);
  }
  return divisiones;
}

export default divideCountriesInPages;
    