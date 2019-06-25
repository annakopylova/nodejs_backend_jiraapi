var express = require('express');
var router = express.Router();
var jira = require('../app.js').jira;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    res.send(await getResponse(req.query['labels']));
});

async function getResponse(label){
    return new Promise(function (resolve) {

        var jqlquery = 'labels = ' + label;

        var search_options = {
            jql: jqlquery
        };

        require('../app.js').jira.search.search(search_options, function (error, result) {
            resolve(result);
        });
    })
}

module.exports = router;
