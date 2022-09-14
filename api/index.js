const server = require('./src/app.js');
const { db } = require('./src/db.js');

// Syncing all the models at once.
db.sync({force: true}).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

// {force: true}
