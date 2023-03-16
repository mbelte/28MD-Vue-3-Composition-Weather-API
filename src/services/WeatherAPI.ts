import API from "./API";
import type WeatherRequest from '../App.vue'

export default {
    getWeather(location: string) {
        const options = {
            params: {q: location},
            headers: {
                'X-RapidAPI-Key': 'b8ff242432msh370030fda091be9p129342jsn20f414b4e5a8',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }
        return API().get<WeatherRequest>('/current.json', options)
    }
}