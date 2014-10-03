someData = {
    dateNow: Date.now(),
    dep: new Tracker.Dependency()
};

Template.example2.helpers({
    dependency1: function () {
        someData.dep.depend();
        return 'Dependency 1: ' + someData.dateNow;
    },
    dependency2: function () {
        someData.dep.depend();
        return 'Dependency 2: ' + someData.dateNow;
    }
});

Template.example2.events({
    'click button[data-hook="changed"]': function () {
        someData.dateNow = Date.now();
        someData.dep.changed();
    },
    'click button[data-hook="stop1"]': function (ev) {
        var dependencies = _.pairs(someData.dep._dependentsById);
        var first = _.first(dependencies);

        if(!first){
            return;
        }

        var computed = first[1];

        $(ev.target).text('STOPED');

        computed.stop();
    },
    'click button[data-hook="stop2"]': function (ev) {
        var dependencies = _.pairs(someData.dep._dependentsById);
        var last = _.last(dependencies);

        if(!last){
            return;
        }

        var computed = last[1];

        $(ev.target).text('STOPED');

        computed.stop();
    },
});
