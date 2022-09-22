import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Request, Response } from 'express';

dotenv.config();
const app = express();
const port = process.env.PORT ?? 82;

app.use(require('./middleware/headers'));
app.use(cors());
app.use(express.json());

app.get('/healthcheck', (req: Request, res: Response) => {
  console.log('healthcheck pinged');
  res.status(200).json({ msg: "Successfully pinged hockey pipeline service." })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
