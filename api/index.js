const app = require('./src/app.js');
const { db } = require('./src/db.js');

// Syncing all the models at once.
//db.sync({force: true}).then(() => console.log("db sync"));

app.listen(3001, () => {
  console.log('Server listening at port 3001'); // eslint-disable-line no-console
  db.sync({ force: true }).then(console.log("DB sync"));
});


// {force: true}
