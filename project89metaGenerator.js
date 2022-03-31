
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const destDir = path.join(__dirname, 'metadata');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir);
}

const raw = `{
    "name": "Founders Pass #001",
    "symbol": "FP-P89",
    "description": "Collection of 333 Founders Passes, Which Grant You Special Perks Within Project89",
    "seller_fee_basis_points": 500,
    "image": "0.png",
    "animation_url": "0.mp4",
    "external_url": "https://project89.io",
    "attributes": [
      {
        "trait_type": "Founder Tier",
        "value": "Diamond"
      }
    ],
    "collection": {
       "name": "Founders Pass",
       "family": "Project89"
    },
    "properties": {
      "files": [
        {
          "uri": "0.png",
          "type": "image/png"
        },
        {
          "uri": "https://res.cloudinary.com/dceu0qvxs/video/upload/v1647550720/Project89/Diamond_n5rc0r.mp4",
          "type": "video/mp4",
          "cdn": true
        },
        {
          "uri": "0.mp4",
          "type": "video/mp4"
        }
      ],
      "category": "video",
      "creators": [
        {
          "address": "P89sA4FGX6ynPVXWjEVeX1WJuVTXK6Z6bWg81qa3NK7",
          "share": 100
        }
      ]
    }
  }`

const renameKey = ( obj, oldKey, newKey ) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}
const copyFile = (source, dest) => {
    fs.copyFile(source, dest, (err) => {
        if (err) throw err;
        console.log(`${source} copied to destination - ${dest}`);
    });
}
const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 4))
    } catch (err) {
        console.error(err)
    }
}
function getlength(number) {
    return number.toString().length;
}
function writeProject89Meta() {
    for (let i = 0;i <= 332; i++) {
        let tier, zeroes, ipfs_vid, ipfs_img;
        if (i < 16) {
            tier = 'Diamond';
            cdn = 'https://res.cloudinary.com/dceu0qvxs/video/upload/v1647550720/Project89/Diamond_n5rc0r.mp4';
            ipfs_vid = 'ipfs://Qma2qTj2ATz3VMpGkztkv5WiQBASANvsEMCnbRdV7eSdqQ';
            ipfs_img = 'ipfs://QmT4NGqUfboVzXG6BQEp7mv6VoY7xxADFwwtjPqh8ZHcfg'
        } else if (i < 65) {
            tier = 'Gold';
            cdn = 'https://res.cloudinary.com/dceu0qvxs/video/upload/v1647550715/Project89/Gold_mapqoz.mp4';
            ipfs_vid = 'ipfs://Qmc8DSsuq4pCPz6xutN2V6D5Np9AU6xK4f8q2pAv1gBiwA'
            ipfs_img = 'QmTTmPxXvJV11HXtMxeNwarTosHKFQo2cDDwrznyU8rcWv'
        } else if (i < 166) {
            tier = 'Silver';
            cdn = 'https://res.cloudinary.com/dceu0qvxs/video/upload/v1647550708/Project89/Silver_trivf8.mp4';
            ipfs_vid = 'ipfs://QmWszbR5N4Dtd8sFyPvrt9V2WU9dekoAsCXZDpiTs4GTxo'
            ipfs_img = 'ipfs://QmNPignqgz273NTBayNFUuye5F73E92ss8LKFUaQZyMs8J'
          } else {
            tier = 'Bronze';
            cdn = 'https://res.cloudinary.com/dceu0qvxs/video/upload/v1647550706/Project89/Bronze_btk5a3.mp4';
            ipfs_vid = 'ipfs://Qmdhe7bXgfRHkrKt34yvAax1rDuqB1WSsUU2pfA1PM7FAC'
            ipfs_img = 'ipfs://QmXJUyXVFHEsYyBN52agyfUAEoNAj56uvL2wQovqMf6BCE'
        }
        
        // check if number needs 0's in front of it
        const numberOfDigits = getlength(i+1);
        switch (numberOfDigits)
        {
            case 1:
                zeroes = '00';
                break
            case 2:
                zeroes = '0';
                break
            default:
                zeroes = '';
                break
        }
        
        const json = JSON.parse(raw);
    
        //Fields that we will modify
        const name = `Founders Pass #${zeroes}${i+1}`;
        const image = `${i}.png`;
        const animation = `${i}.mp4`;
    
        json['name'] = name;
        json['image'] = image;
        json['animation_url'] = ipfs_vid;
        json['attributes'][0].value = tier;
        json['properties']['files'][0]['uri'] = ipfs_img;
        json['properties']['files'][1]['uri'] = cdn;
        json['properties']['files'][2]['uri'] = ipfs_vid;
    
    
        storeData(json,`${destDir}/${i}.json`);
        console.log(json)
    
    }
}


writeProject89Meta();


// createImages() {

// }

