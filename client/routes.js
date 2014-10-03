Router.route('/', {
  controller: 'ApplicationController',
  template: 'home'
});

Router.route('examples/:_id', {
  controller: 'ExamplesController'
});


ApplicationController = RouteController.extend({
  layoutTemplate: 'AppLayout',

  onBeforeAction: function () {
    // console.log('app before hook!', this);
    this.ready();
  },

});

ExamplesController = ApplicationController.extend({

  action: function () {
    var params = this.params;
    var id = params._id;
    this.render('example' + id);
  }

});
