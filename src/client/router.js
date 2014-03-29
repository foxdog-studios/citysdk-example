Router.configure({
  layout: 'layout',
  notFoundTemplate: 'notFound'
});

Router.map(function () {
  this.route('home', {path: '/'});
});

