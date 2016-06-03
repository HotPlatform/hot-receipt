var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dashboard/settings/index', { title: 'settings | receipt.io' });
});

router.get('/general', function(req, res, next) {
  res.render('dashboard/settings/index', { title: 'general settings | receipt.io' });
});

router.get('/profile', function(req, res, next) {
  res.render('dashboard/settings/index', { title: 'profile settings | receipt.io' });
});

module.exports = router;
