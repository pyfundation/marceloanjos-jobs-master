import axios from 'axios'
import * as RNLocalize from "react-native-localize";
const domain = "http://localhost:3001"
// const domain = "https:jobstrends.herokuapp.com"
export const trendData = (trend1, trend2, trend3) => async (dispatch) => {
    try {
        dispatch({
            type: 'SENDING'
        })
        console.log('dispatched')
        //const country = RNLocalize.getCountry();

        const result = await axios.get(`${domain}/${trend1}/${trend2}/${trend3}`)
        // const result2 = await axios.get(`${domain}/${trend2}`)
        // console.log(result.data)
        dispatch({
            type: 'TREND_RECEIVED',
            payload: result.data
        });
    } catch (error) {

        if (error.response) {

            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'TREND_ERROR',
        });
    }
};
//----------------------------------------------------
export const sendData = (spread) => async (dispatch) => {
    try {
       
        console.log('dispatched')
        //const country = RNLocalize.getCountry();
        //console.log("spreadSheet => ",{spread});
        const spreads = JSON.stringify(spread);
        const result = await axios.post(`${domain}/`,spreads)
      
    } catch (error) {

        if (error.response) {
            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {

            console.log("Error", error.message);
        }
        console.log(error);

    }
};
//----------------------------------------------------
export const getTrending = (Countrytrend1, Countrytrend2, Countrytrend3) => async (dispatch) => {
    try {
        dispatch({
            type: 'TRENDING'
        })
        console.log('dispatched')
        const country = RNLocalize.getCountry();
        /*
        const result1 = await axios.get(`${domain}/${Countrytrend1}`);
        const result2 = await axios.get(`${domain}/${Countrytrend2}`);
        const result3 = await axios.get(`${domain}/${Countrytrend3}`);
        var resultS = [];
        resultS.push(result1.data);
        resultS.push(result2.data);
        resultS.push(result3.data);
        // const result2 = await axios.get(`${domain}/${trend2}`)
        // console.log(JSON.parse(result.data).default.trendingSearchesDays[0].trendingSearches)
        */
        const result = await axios.get(`${domain}/${country}`)
        dispatch({
            type: 'TRENDING_RECEIVED',
            payload: result.data
        });
    } catch (error) {

        if (error.response) {
            console.log(error.response.data.errors);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error);

        dispatch({
            type: 'TRENDING_ERROR',
        });
    }
};
//----------------------------------------------------
//----------------------------------------------------
