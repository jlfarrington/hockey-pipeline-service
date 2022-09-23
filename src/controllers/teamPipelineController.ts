import { Request, Response } from 'express';
import { IScheduleResponse, Game } from '../models/responses/IScheduleResponse';
import { ITeamData } from '../models/ITeamData';
import { ITeamResponse, SplitDataObject, Team } from '../models/responses/ITeamResponse';
import { writeCSVFromData } from '../utils';
import { getTeamSchedule, getTeamStats } from '../actions/nhlApiActions';

export const getTeamDetails = async (req: Request, res: Response) => {
  // teamId and season both required
  const teamId = req.query.teamId?.toString();
  const season = req.query.season?.toString();

  if (!teamId || !season) {
    return res.status(422).json({ msg: 'Please provide both a teamId and season in query parameters.', error: true });
  }

  try {
    // get team stats
    const statsResponse = await getTeamStats(teamId, season);
    if (statsResponse.error) {
      return res.status(500).json({ msg: 'Error calling NHL API', error: true });
    }
    const teamStatsData: ITeamResponse = statsResponse.data;

    // get team regular season schedule
    const scheduleResponse = await getTeamSchedule(teamId, season);
    if (scheduleResponse.error) {
      return res.status(500).json({ msg: 'Error calling NHL API', error: true });
    }
    const scheduleData: IScheduleResponse = scheduleResponse.data;

    // this assumes the API will always return games in order from eariest date to latest
    // if API changes, code will need updated to sort by date
    const firstRegSeasonGame: Game = scheduleData.dates[0].games[0];

    // take the home or away team id, whichever one is not equal to the provided team id is the opponent
    const firstGameOpponent =
      firstRegSeasonGame.teams.home.team.id !== parseInt(teamId)
        ? firstRegSeasonGame.teams.home.team.name
        : firstRegSeasonGame.teams.away.team.name;

    const firstGameDate = firstRegSeasonGame.gameDate;

    const team: Team = teamStatsData.teams[0];
    const statsObj: SplitDataObject = team.teamStats[0].splits[0].stat;

    const teamDataToWrite: ITeamData = {
      teamId: team.id,
      teamName: team.teamName,
      teamVenueName: team.venue.name,
      gamesPlayed: statsObj.gamesPlayed,
      wins: statsObj.wins,
      losses: statsObj.losses,
      points: statsObj.pts,
      goalsPerGame: statsObj.goalsPerGame,
      firstGameSeasonDate: firstGameDate,
      firstOpponentName: firstGameOpponent,
    };
    const csvWriteSuccess = await writeCSVFromData('teamPipeline', teamDataToWrite);

    if (!csvWriteSuccess) {
      return res.status(500).json({ msg: 'Error writing team data to CSV', error: true });
    }
    res.header('Content-Type', 'text/csv');
    return res.status(200).download('./output/teamPipeline.csv');
  } catch (err) {
    console.log(err);
    return res.status(500).json(JSON.stringify(err));
  }
};
