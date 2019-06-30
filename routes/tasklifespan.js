var express = require('express');
var router = express.Router();
var jira = require('../app.js').jira;

/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.send(await getResponse(req.query['issuekey']));
});

async function getResponse(issuekey) {
    return new Promise(function (resolve) {

        require('../app.js').jira.issue.getIssue({
            issueKey: issuekey
        }, function (error, issue) {
            var creationDate = Date.parse(issue.fields.created);
            // var resolutionDate = Date.parse(issue.fields.resolutiondate);
            var resolutionDate = Date.parse(issue.fields.updated);

            var numberdifference = resolutionDate - creationDate;

            var data = {
                difference:numberdifference
            };

            resolve(JSON.stringify(data))
        });
    })
}

module.exports = router;
