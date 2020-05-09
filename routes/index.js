var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();

function authCheck(req,res,next){
  if (req.cookies.cookieid) {
    res.redirect("/users/dashboard");
  } else {
    res.redirect('users/login');
  }
  next();
}

/* GET home page. */
router.get('/', authCheck, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/routeparameter/:id', function(req, res, next) {
  res.json(req.params);
});

router.get('/promisetest', function(req, res, next) {
  let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
  ];
  
  // map every url to the promise fetch(github url)
  let requests = urls.map(url => fetch(url));
  
  // Promise.all waits until all jobs are resolved
  Promise.all(requests)
    .then(responses => responses.forEach(
      // response => console.log(`${response.url}: ${response.status}`)
      response => console.log(response)
    ));
});

module.exports = router;
