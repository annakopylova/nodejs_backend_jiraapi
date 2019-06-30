var express = require('express');
var router = express.Router();
var jira = require('../app.js').jira;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    res.send(await getResponse(req.query['typeid']));
});

async function getResponse(typeId){
    return new Promise(function (resolve) {
        var status;
        switch(typeId){
            case 0:
                status = 'status = \'In Progress\'';
                break;
            case 1:
                status = 'status = \'Resolved\'';
                break;
            case 2:
                status = 'status = \'Closed\'';
                break;
        }
        var search_options = {
            jql: status,
        };

        require('../app.js').jira.search.search(search_options, function (error, result) {
            // console.log(error);
            // console.log(result)
            resolve(result);
            
        });
    })
}

module.exports = router;
