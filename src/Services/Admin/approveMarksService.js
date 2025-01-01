import axios from "axios";

const BASE_URL = "http://127.0.0.1:1321";

const approveMarksService = {

  releaseMarks: async (testTypeID) => {
    const response = await axios.post(`${BASE_URL}/studentmarks/approve`, testTypeID);
    return response.data;
  },
};

export default approveMarksService;