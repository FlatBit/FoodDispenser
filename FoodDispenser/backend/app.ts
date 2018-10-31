import * as express from 'express';
import {Request, Response} from 'express';

const app = express();

// Start server
app.listen(8080, 'localhost', () => {
  console.log('Server started on http://localhost:8080');
});

app.use( express.json() );  // parsing json



// import sub-routers
import * as customerRouter from './customer.js';


const router = express.Router();

// mount express paths, any addition middleware can be added as well.
// ex. router.use('/pathway', middleware_function, sub-router);

router.use('/customer', customerRouter);

// Export the router
// export = router;
