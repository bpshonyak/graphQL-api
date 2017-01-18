import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';

// Config
const PORT = 3000;

const app = Express();

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
