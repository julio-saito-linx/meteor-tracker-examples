message = [];

// from: https://github.com/EventedMind/meteor-build-a-reactive-data-source

// A custom reactive data source that works similarly to
// the Session object
ReactiveDataSource = {

    // keys look like { 'currentDateNow': 'Chris' }
    keys: {},

    // deps store the same keys as above but the value
    // is a Deps.Dependency instance like this:
    // { 'currentDateNow': new Deps.Dependency }
    deps: {},

    get: function (key) {

        // Make sure we've created a dependency object for the key
        this.ensureDeps(key);

        // and then call the depend() method to create a dependency.
        this.deps[key].depend();

        // Finally, return the value.
        return this.keys[key];
    },

    set: function (key, value) {
        // Set the value of the key to the new value and then call
        this.keys[key] = value;

        // the changed() method on the dependency object which will
        // trigger any dependent functions to be re-run.
        this.deps[key].changed();
    },

    // Make sure we create the Deps.Dependency object for the first
    // time
    ensureDeps: function (key) {
        if (!this.deps[key])
            this.deps[key] = new Tracker.Dependency();
    }
};

print1 = function () {
    var currentDateNow = ReactiveDataSource.get('currentDateNow');

    message.push('1: ');
    message.push(currentDateNow);
    message.push('\n');

    $('#message').html(message.join(''));
};

print2 = function () {
    var currentDateNow = ReactiveDataSource.get('currentDateNow');

    message.push('2: ');
    message.push(currentDateNow);
    message.push('<hr>\n');

    $('#message').html(message.join(''));
};

// Re-run each of these functions (print1, print2) any time
// a value changes in a reactive data source
Deps.autorun(print1);
Deps.autorun(print2);

Deps.autorun(print1);
Deps.autorun(print2);

Deps.autorun(print1);
Deps.autorun(print2);



Template.example3.events({
    'click button[data-hook="changeDateNow"]': function() {
        message = [];
        ReactiveDataSource.set('currentDateNow', Date.now().toString());
    }
});
