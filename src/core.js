const Promise = require('bluebird'),
  _ = require('underscore'),
  debug = require('debug')('core');

class Core {
  constructor() {
    this.actors = [];
    this.handlers = [];
  }

  addActor(actor) {
    this.actors.push(actor);
    return this;
  }

  addActors(actors) {
    actors.forEach(actor => this.addActor(actor));
    return this;
  }

  addHandler(filter, func) {
    let handler = {
      filter,
      func
    };
    this.handlers.push(handler);
    return this;
  }

  callHandlers(action) {
    debug('callHandlers');
    this.handlers.forEach(handler => {
      if (handler.filter(action.type, action.data)) {
        debug('filter passed');
        handler.func(action.type, action.data);
      } else {
        debug('filter failed');
      }
    });
  }

  sendMessage(data) {
    // TODO: multicast/broadcast by matching dest expression?
    let actor = this.actors.find(actor => actor.id === data.dest);
    if (!actor) {
      throw new Error(`actor '${data.dest}' not found`);
    }
    let actions = actor.onMessage(data);
    debug('sendMessage, resulting actions:', actions);
    if (!actions) {
      return Promise.resolve();
    }
    actor.scheduleActions(actions);
    return this.executeActions(actor);
  }

  execute() {
    return Promise.map(this.actors, actor => this.executeActions(actor));
  }

  executeActions(actor) {
    let actions = actor.actions;
    debug('executeActions, actions: ' + JSON.stringify(actions, null, 2));
    actor.actions = [];
    return Promise.map(actions, action => {
      return Promise.delay(action.delay)
        .then(() => this.executeNow(actor, action));
    });
  }

  executeNow(actor, action) {
    switch (action.type) {
      case 'message':
        action.data.src = actor.id;
        this.callHandlers(action);
        return this.sendMessage(action.data);
        break;
      default:
        throw new Error(`unrecognized action type '${action.type}'`);
        break;
    }
  }
}

class Actor {
  constructor(id, onMessage) {
    this.id = id;
    this.onMessage = onMessage;
    this.actions = [];
  }
  scheduleAction(data) {
    // data.delay
    // data.action
    this.actions.push(data);
    return this;
  }
  scheduleActions(array) {
    array.forEach(data => this.scheduleAction(data));
    return this;
  }
  // spawnActor() {}
  // suggest((whatYouSee, whatISee, conditionsToSatisfy) => {});
}

/**
 * messages can represent actions and events
 * they are initiated by actors and received by actors
 */
class message {
}

// the following are a different level / different type of abstraction
// class context { }
// class intention { }
// class assumption { }
// class expectation { }

/**
 * You'll define the actions actors can take, and then your function(s) will be
 * called when the actors perform those actions.
 */
class actionHandler {
}

function summarize(events) {
  let summary;
  // Like a 'reduce' function?
  return summary;
}

function updateContext(context, event) {
  let newContext;
  return newContext;
}

function decision(event) {
  let actions;
  // recentEvents
  // inferences previously drawn from recentEvents
  // -- not just by ourselves, but possibly by others;
  // what is thought to be true; by whom; and why?
  return actions;
}

module.exports = {
  Core,
  Actor,
};
