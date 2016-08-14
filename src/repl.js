import repl from 'repl';

// async function setup() {
//   const bot = new WitBot(user.id, witApi);
//   await bot.wakeUp();
//   await bot.sleep();
// }

function evalMessage(cmd, context, filename, callback) {
  callback(null, 'ok');
}

repl.start({
  prompt: '> ',
  eval: evalMessage,
});
