// Generated by CoffeeScript 1.6.3
// Generated by CoffeeScript 1.6.3
(function() {
  var _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Raffler = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function() {
      new Raffler.Routers.Entries;
      return Backbone.history.start();
    }
  };

  $(document).ready(function() {
    return Raffler.init();
  });

  Raffler.Models.Entry = (function(_super) {
    __extends(Entry, _super);

    function Entry() {
      _ref = Entry.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Entry.prototype.defaults = {
      name: '',
      winner: false
    };

    return Entry;

  })(Backbone.Model);

  Raffler.Collections.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref1 = Entries.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Entries.prototype.url = '/~samueto1/api';

    return Entries;

  })(Backbone.Collection);

  Raffler.Collections.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref2 = Entries.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Entries.prototype.model = Raffler.Models.Entry;

    Entries.prototype.localStorage = new Store("backbone-coffee");

    return Entries;

  })(Backbone.Collection);

  Raffler.Routers.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref3 = Entries.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Entries.prototype.routes = {
      '': 'index',
      'entries/:id': 'show'
    };

    Entries.prototype.initialize = function() {
      this.collection = new Raffler.Collections.Entries();
      return this.collection.fetch();
    };

    Entries.prototype.index = function() {
      var view;
      view = new Raffler.Views.EntriesIndex({
        collection: this.collection
      });
      return $('#container').html(view.render().el);
    };

    return Entries;

  })(Backbone.Router);

  Raffler.Views.EntriesIndex = (function(_super) {
    __extends(EntriesIndex, _super);

    function EntriesIndex() {
      _ref4 = EntriesIndex.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    EntriesIndex.prototype.template = _.template($('#item-template').html());

    EntriesIndex.prototype.events = {
      'click #reset': 'resetwinner',
      'click button': 'kill',
      'click #draw': 'drawWinner',
      'click #new': 'createEntry'
    };

    EntriesIndex.prototype.resetwinner = function() {
      return this.collection.resetwinner();
    };

    EntriesIndex.prototype.drawWinner = function() {
      return this.collection.drawWinner();
    };

    EntriesIndex.prototype.initialize = function() {
      this.collection.on('destroy', this.render, this);
      this.collection.on('sync', this.render, this);
      return this.collection.on('add', this.render, this);
    };

    EntriesIndex.prototype.render = function() {
      $(this.el).html(this.template({
        entries: this.collection.toJSON()
      }));
      return this;
    };

    EntriesIndex.prototype.createEntry = function() {
      return this.collection.create({
        name: $('#new_entry').val()
      });
    };

    EntriesIndex.prototype.drawWinner = function() {
      var winner;
      winner = this.collection.shuffle()[0];
      if (winner) {
        winner.set({
          winner: true
        });
        return winner.save();
      }
    };

    EntriesIndex.prototype.resetwinner = function() {
      var model, _i, _len, _ref5, _results;
      _ref5 = this.collection.models;
      _results = [];
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        model = _ref5[_i];
        model.set({
          winner: false
        });
        _results.push(model.save());
      }
      return _results;
    };

    return EntriesIndex;

  })(Backbone.View);

}).call(this);
