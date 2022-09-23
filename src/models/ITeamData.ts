export interface ITeamData {
  teamId: number;
  teamName: string;
  teamVenueName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  points: number;
  goalsPerGame: number;
  firstGameSeasonDate: Date | string;
  firstOpponentName: string;
}
