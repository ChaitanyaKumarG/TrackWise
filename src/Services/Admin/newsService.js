import axios from "axios";

const BASE_URL = "https://be-six-sandy.vercel.app";

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