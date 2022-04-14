
const xml2js = require('xml2js');

 

// Reading Content from local Files

const fs = require('fs')

const api1Response = fs.readFileSync('JsonResponse.json', 'utf8');

const api2Response = fs.readFileSync('XMLResponse.xml', 'utf8');

 

// convert XML Response to JSON

xml2js.parseString(api2Response, (err, api2ResponseJson) => {

    if (err) {

        throw err;

    }

 

    //Initializing response variables

    var api1ResponseInJson = JSON.parse(api1Response).person;

    api2ResponseInJson = JSON.parse(JSON.stringify(api2ResponseJson)).persons.person;

    var finalResult = api1ResponseInJson;

 

    //Merge responses from both apis      

    for (var i = 0; i < api2ResponseInJson.length; i++) {

        finalResult.push({

            "id": parseInt(api2ResponseInJson[i].id[0]),

            "firstName": api2ResponseInJson[i].firstName[0],

            "lastName": api2ResponseInJson[i].lastName[0]

        });

    }

 

    //Sort final result        


    finalResult.sort(function(a, b) {

        if (a.id > b.id) {

            return 1;

        }

        if (a.id < b.id) {

            return -1;

        }

        return 0;

    })

 

    console.log(finalResult);

});