import axios from 'axios';

import {
    UPLOAD_SUCCESS,
    UPLOAD_FAIL
} from './types';

export const upload = ({ question, answer, marks, difficulty }) => async dispatch => {
    const config = {
            headers: {
                'Content-Type': 'application/json'
            }
    };

    console.log("Upload question API being called");

    const body = JSON.stringify({ question, answer, marks, difficulty });

    try {
        const res = await axios.post('http://localhost:5000/api/questions', body, config);

        dispatch({
            type: UPLOAD_SUCCESS,
            payload: res.data
          });
    }
    catch(err) {
        const errors = err.response.data.errors;
  
      if (errors) {
        console.log(err);
      }

      dispatch({
          type:UPLOAD_FAIL
      });
    }
}
