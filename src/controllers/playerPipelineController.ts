import { Request, Response } from 'express';

export const getPlayerDetails = (req: Request, res: Response): Promise<Response> | void => {
  const playerId = req.query.playerId;
  const season = req.query.season;
  console.log(playerId, season);

  res.header('Content-Type', 'text/csv');
  return res.status(200).download('./output/test.txt');
};
