import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Request, Response } from 'express';
import { getTeamDetails } from './controllers/teamPipelineController';

dotenv.config();
const app = express();
const port = process.env.PORT ?? 82;

app.use(require('./middleware/headers'));
app.use(cors());
app.use(express.json());

//healthcheck test outputting csv functionality
app.get('/healthcheck', (req: Request, res: Response) => {
  console.log('healthcheck pinged');
  res.header('Content-Type', 'text/csv');
  res.status(200).download('./output/test.txt', 'test.txt', (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.get('/teamPipeline', getTeamDetails);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
