export const addToFav = (weather: any, fav: boolean) => {
    let favWeather ={...weather}
    console.log(weather, fav)
    favWeather.push(weather)
    return favWeather;
}
