var requireAll = require('../lib/require-all');
var passport = require('./initializers/passport.js');
var ctrls = requireAll({
  dirname: __dirname + '/../app/controllers',
  filter: /(.+)\.js(on)?$/
})

module.exports = (function(){
  function configure(app) {
    app.get('/', function(req, res){ res.render('index.html') })
    /////////////////////////
    //  Unauthenticated Resources

    app.get('/api/v1/gateway/settings', 
      passport.authentication('basic', { session: false },
      ctrls['settings'].index);

    app.post('/api/v1/gateway/users', 
      passport.authentication('basic', { session: false },
      ctrls['users'].create)

    app.post('/api/v1/admin/users', 
      passport.authentication('basic', { session: false },
      ctrls['users'].createAdmin);

    ////////////////////////
    // User Authenticated Resources

    app.get('/api/v1/users/:id/ripple_addresses', 
      passport.authentication('basic', { session: false },
      ctrls['ripple_addresses'].userIndex);

    app.get('/api/v1/users/:id/ripple_transactions', 
      passport.authentication('basic', { session: false },
      ctrls['ripple_transactions'].index);

    app.post('/api/v1/users/:user_id/ripple_transactions', 
      passport.authentication('basic', { session: false },
      ctrls['ripple_transactions'].create);

    app.get('/api/v1/users/:id/external_accounts', 
      passport.authentication('basic', { session: false },
      ctrls['external_accounts'].index);

    app.post('/api/v1/users/:id/external_accounts', 
      passport.authentication('basic', { session: false },
      ctrls['external_accounts'].create);

    app.get('/api/v1/users/:id/external_transactions', 
      passport.authentication('basic', { session: false },
      ctrls['external_transactions'].userIndex);

    app.post('/api/v1/users/:id/external_transactions', 
      passport.authentication('basic', { session: false },
      ctrls['external_transactions'].create);

    app.get('/api/v1/users/:id/balances', 
      passport.authentication('basic', { session: false },
      ctrls['balances'].userIndex);

    app.post('/api/v1/gateway/users/login', 
      passport.authenticate('basic', { session: false }),
      ctrls['users'].login);

    app.get('/api/v1/gateway/user', 
      passport.authenticate('basic', { session: false }), 
      ctrls['users'].show);

    /////////////////////////
    // Admin Authenticated Resources

    app.get('/api/v1/users', 
      ctrls['users'].index);

    app.get('/api/v1/external_transactions', 
      passport.authentication('basic', { session: false },
      ctrls['external_transactions'].index);

    /////////////////////////
  }

  return { route: configure }
})()
