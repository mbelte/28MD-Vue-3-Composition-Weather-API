import axios from "axios";

export default (url = 'https://weatherapi-com.p.rapidapi.com') => {
    return axios.create({
        baseURL: url
    })
}