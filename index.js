require('dotenv').config()
const {pinDirectoryToIPFS} = require('./pinDirectoryToIPFS')
const {pinFileToIPFS} = require('./pinFileToIPFS');
const key = process.env.API_KEY
const secret = process.env.API_SECRET;

pinFileToIPFS(key, secret);