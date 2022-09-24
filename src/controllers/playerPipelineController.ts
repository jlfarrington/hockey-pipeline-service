import { Request, Response } from 'express';
import { IPlayerData } from '../models/IPlayerData';
import { IPlayerResponse, Player } from '../models/responses/IPlayerResponse';
import { IPlayerStatsResponse, PlayerStatSplit } from '../models/responses/IPlayerStatsResponse';
import { writeCSVFromData } from '../utils';
import { getPlayerInfo, getPlayerStats } from '../actions/nhlApiActions';

export const getPlayerDetails = async (req: Request, res: Response) => {
  // playerId and season both required
  const playerId = req.query.playerId?.toString();
  const season = req.query.season?.toString();

  if (!playerId || !season) {
    return res.status(422).json({ msg: 'Please provide both a playerId and season in query parameters.', error: true });
  }

  try {
    // get player info
    const infoResponse = await getPlayerInfo(playerId);
    if (infoResponse.error) {
      return res.status(500).json({ msg: 'Error calling NHL API', error: true });
    }
    const playerInfoData: IPlayerResponse = infoResponse.data;

    // get player season stats
    const statsResponse = await getPlayerStats(playerId, season);
    if (statsResponse.error) {
      return res.status(500).json({ msg: 'Error calling NHL API', error: true });
    }
    const statsData: IPlayerStatsResponse = statsResponse.data;

    const player: Player = playerInfoData.people[0];
    const playerSeasonInfo: PlayerStatSplit = statsData.stats[0].splits[0];

    const playerDataToWrite: IPlayerData = {
      playerId: player.id,
      playerName: player.fullName,
      currentTeam: player.currentTeam.name,
      playerAge: player.currentAge,
      playerNumber: player.primaryNumber,
      playerPosition: player.primaryPosition.name,
      rookie: player.rookie,
      assists: playerSeasonInfo.stat.assists,
      goals: playerSeasonInfo.stat.goals,
      games: playerSeasonInfo.stat.games,
      hits: playerSeasonInfo.stat.hits,
      points: playerSeasonInfo.stat.points,
    };
    const csvWriteSuccess = await writeCSVFromData('playerPipeline', playerDataToWrite);

    if (!csvWriteSuccess) {
      return res.status(500).json({ msg: 'Error writing player data to CSV', error: true });
    }
    res.header('Content-Type', 'text/csv');
    return res.status(200).download('./output/playerPipeline.csv');
  } catch (err) {
    console.log(err);
    return res.status(500).json(JSON.stringify(err));
  }
};
