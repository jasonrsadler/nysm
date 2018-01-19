const router = require('express').Router();
var User = require('../model/Users');

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized'});
});

router.route('/users')
.get(function(req, res) {
    User.find(function(err, users) {
        if (err) { res.send(err);}
        res.json(users);
    });
})
.post(function(req, res) {
    var user = new User();
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    user.passwordConf = req.body.passwordConf;
    user.save(function(err) {
        if (err) { res.send(err); }
        else {
        res.json({message: 'User added' });
        }
    });
});

module.exports = router;