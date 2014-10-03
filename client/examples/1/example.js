var showCounter = function(computation) {
    var text = [];

    text.push('counter                 : ');
    text.push(Session.get('counter'));
    text.push('\n');

    text.push('computation._id         : ');
    text.push(computation._id.toString());
    text.push('\n');

    text.push('computation.firstRun    : ');
    text.push(computation.firstRun.toString());
    text.push('\n');

    text.push('computation.invalidated : ');
    text.push(computation.invalidated.toString());
    text.push('\n');

    text.push('computation.stopped     : ');
    text.push(computation.stopped.toString());
    text.push('\n');

    $('#example1_counter').html(text);
};

var startTracking = function() {
    if(typeof computation === 'undefined'){
        computation = Tracker.autorun(showCounter);
        computation.onInvalidate(function() {
            console.log('computation.onInvalidate...', arguments);
        });
        Tracker.afterFlush(function() {
            console.log('Tracker.afterFlush...', arguments);
        });
    }

    if(computation && computation.stopped){
        computation = Tracker.autorun(showCounter);
    }

    var sessionDependentsJSON = JSON.stringify(Session.keyDeps.counter._dependentsById, ' ', 2);
    Session.set('sessionDependentsJSON', sessionDependentsJSON);
};


Template.example1.rendered = function() {
    Session.setDefault('counter', 0);
    startTracking();
};

Template.example1.helpers({
    counter: function () {
        var counter = Session.get('counter');
        return counter;
    },
    sessionDependentsJSON: function() {
        return Session.get('sessionDependentsJSON');
    },
});

Template.example1.events({
    'click button[data-hook="add"]': function () {
        var counter = Session.get('counter') + 1;
        Session.set('counter', counter);
    },
    'click button[data-hook="stop"]': function () {
        computation.stop();
        console.log('computation.stop();');
        showCounter(computation);

        var sessionDependentsJSON = JSON.stringify(Session.keyDeps.counter._dependentsById, ' ', 2);
        Session.set('sessionDependentsJSON', sessionDependentsJSON);
    },
    'click button[data-hook="autorun"]': function () {
        if(computation.stopped === true){
            startTracking();
        }
        else{
            console.debug('There is already a computation happening...');
        }

    },
});
