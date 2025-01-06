import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const newsService = {

    getNews: async()=>{
        const response = await axios.get(`${BASE_URL}/news`);
        return response.data
    },

    postNews: async(newsData)=>{
        const response = await axios.post(`${BASE_URL}/news`, newsData)
        return response.data

    }
}

export default newsService