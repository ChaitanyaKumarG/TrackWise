import axios from "axios";

const BASE_URL = "https://be-six-sandy.vercel.app";

const approveMarksService = {

  releaseMarks: async (testTypeID) => {
    const response = await axios.post(`${BASE_URL}/studentmarks/approve`, testTypeID);
    return response.data;
  },
};

export default approveMarksService;