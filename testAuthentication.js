import axios from 'axios';
import 'dotenv/config'
export const testAuthentication = () => {
    const url = `https://api.pinata.cloud/data/testAuthentication`;
    console.log('hit')
    return axios
        .get(url, {
            headers: {
                'pinata_api_key': process.env.API_KEY,
                'pinata_secret_api_key': process.env.API_SECRET
            }
        })
        .then(function (response) {
            //handle your response here
            console.log(response)
            console.log('SUCCESS!')

        })
        .catch(function (error) {
            //handle error here
            console.log(error)
        });
};
