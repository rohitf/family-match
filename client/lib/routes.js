//Routing
Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', {
    template: 'login'
});


Router.route('/list', {
    template: 'list'
});

Router.route('/feedback', {
    template: 'feedback'
});

Router.route('/search', {
    template: 'search'
});

Router.route('/profile', {
    template: 'profile'
});

Router.route('/about', {
    template: 'about'
});