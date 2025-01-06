import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const approveMarksService = {

  releaseMarks: async (testTypeID) => {
    const response = await axios.post(`${BASE_URL}/studentmarks/approve`, testTypeID);
    return response.data;
  },
};

export default approveMarksService;