const durationShortMovie = 40; // длительность короткометражек

export const filterKeyWord = (array, key) => {
  return array.filter(elem => {
    return elem.nameRU.toLowerCase().includes(key) || elem.nameEN.toLowerCase().includes(key)
  })
}

export const filterCheckBox = (array, isChecked) => {
  if (isChecked) return array.filter(elem => elem.duration <= durationShortMovie);
  return array;
}