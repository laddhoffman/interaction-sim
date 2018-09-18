const { Core, Actor } = require('./src/core.js');

// class Actor1 extends Actor {
//  onMessage(data) {
    // erlang, elixir, rust would be good choices to model this
    // because of their convenient pattern matching functionality!
    // oh well, let's just play fast and let js throw exceptions

    // because we're trying to do this in a functional style we may not want the
    // actor performing actions directly... I think we just want to return
    // information about the intended actions.
//  }
//}

// actor 1 generates event 1, which contains the name of a fruit.
// actor 2 receives event 1, which adds the name of a month and generates event 2.
// actor 3 receives event 2, and takes some action based on fruit, month values.

const model = new Core();

const filter1 = (type, data) => {
  return true;
};

const handler1 = (type, data) => {
  switch (type) {
    case 'message':
      console.log(`message src: ${data.src}, dest: ${data.dest}, content: ` +
        JSON.stringify(data.content));
      break;
    default:
      console.error('unknown action type "' + type + '"');
      break;
  }
};

const actor0 = new Actor('actor0');

const actor1 = new Actor('actor1', data => {
  let actions = [];
  if (data.content.fruit == 'banana' && data.content.month == 'july') {
    actions.push({
      delay: 0,
      type: 'message',
      data:  {
        dest: 'actor2',
        content: 'july is a good time for bananas'
      }
    });
  }
  return actions;
});

const actor2 = new Actor('actor2', data => {
  console.log(`actor2, message src: ${data.src}, dest: ${data.dest}, ` +
    `content: ${data.content}`);
});

actor0.scheduleAction({
  delay: 0,
  type: 'message',
  data: {
    dest: 'actor1',
    content: {
      fruit: 'banana',
      month: 'july',
    }
  }
});

model.addHandler(filter1, handler1)
  .addActors([actor0, actor1, actor2])
  .execute()
  .then(() => process.exit(0));
