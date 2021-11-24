import { format } from "date-fns";

globalThis.log = function (args) {
  // 1. Convert args to a normal array
  let myArgs = Array.prototype.slice.call(arguments);
  // 2. get our stacktrace
  const err = new Error();
  // 3. make sure its real
  err.stack = err.stack ? err.stack : "";
  // 4. get rid of unneeded stuff
  const regex = /\(|\)|webpack-internal:\/\/\/|:.*/g;
  // 5. create prefix
  const prefix = `[${format(Date.now(), "HH:mm:ss")}][${err.stack
    .split("\n")[2]
    .trim()
    .split(" ")[2]
    .replaceAll(regex, "")}] ->`;
  // 6. Prepend log prefix log string
  myArgs.unshift(prefix);
  // 7. Pass along arguments to console.log
  if (process.env.IS_DEV) {
    console.log.apply(console, myArgs);
  }
};
