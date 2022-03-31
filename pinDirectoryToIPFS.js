//imports needed for this function
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');

exports.pinDirectoryToIPFS = (pinataApiKey, pinataSecretApiKey) => {
    console.log('pinDirectoryToIPFS:')
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const src = './assets';

    //we gather the files from a local directory in this example, but a valid readStream is all that's needed for each file in the directory.
    recursive.readdirr(src, function (err, dirs, files) {
        let data = new FormData();
        files.forEach((file) => {
            //for each file stream, we need to include the correct relative file path
            data.append(`file`, fs.createReadStream(file), {
                filepath: basePathConverter(src, file)
            });
        });
        const metadata = JSON.stringify({
            name: 'Project 89 Media - Founders Pass',
            keyvalues: {
                assetType: 'media'
            }
        });
        console.log(metadata)
        data.append('pinataMetadata', metadata);

        return axios
            .post(url, data, {
                maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            })
            .then(function (response) {
                //handle response here
                console.log(response)
            })
            .catch(function (error) {
                //handle error here
                console.log(error)
            });
    });
};