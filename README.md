# MIGHTY MIGHTY BOT

A discord bot exclusively for MIT Manipal. Still under work

---
## Color Codes

- Help: 6789FF
- Profile: 0BEBBC
- Success: 8DFF75
- Question/Alert: FFBE52
- Failure: FF4F4F
- Event/smth: 9237FA

---
## Logging

Logging can be done in the following way

- **log**: `client.logger.log()`
- **error**: `client.logger.error()`
- **warn**: `client.logger.warn()`
- **debug**: `client.logger.debug()`
- **cmd**: `client.logger.cmd()`
- **ready**: `client.logger.ready()`

---
## Adding Commands

- Make a new file *`<command-name>.js`* in `./commands/`
- Write your valid functions in the function
- Final executive function should be in `exports.run = (client,message,args) => {`*`<function>`*`}` where the client is Discord.client object and message is the message object and args is an array containing every argument after the command
- Add the following to the bottom of the file
 ```javascript
exports.help = {
    name: '<command-name>',
    alias: ['<command-name>','<command-alias1>'],
    category: '<command-category>',
    description: '<command-desc>',
    usage: `<command-usage> [<kind of arguments>]`
};
```
- For list of Categories defined so far [click here](#categories)
- Append the command aliases to `./commands.js`

---
## Categories

- Info
  - Help
  - Ping
- ????
