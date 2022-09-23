export interface ITeamResponse {
  copyright: string;
  teams: Team[];
}

export interface Team {
  id: number;
  name: string;
  link: string;
  venue: {
    id: number;
    name: string;
    link: string;
    city: string;
    timeZone: Object;
  };
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  divison: Object;
  conference: Object;
  franchise: Object;
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
  teamStats: TeamStat[];
}

export interface TeamStat {
  type: Object;
  splits: [
    {
      stat: SplitDataObject;
      team: {
        id: number;
        name: 'Pittsburgh Penguins';
        link: '/api/v1/teams/5';
      };
    },
    {
      stat: Object;
    }
  ];
}

export interface SplitDataObject {
  gamesPlayed: number;
  wins: number;
  losses: number;
  ot: number;
  pts: number;
  ptPctg: string;
  goalsPerGame: number;
  goalsAgainstPerGame: number;
  evGGARatio: number;
  powerPlayPercentage: string;
  powerPlayGoals: number;
  powerPlayGoalsAgainst: number;
  powerPlayOpportunities: number;
  penaltyKillPercentage: string;
  shotsPerGame: number;
  shotsAllowed: number;
  winScoreFirst: number;
  winOppScoreFirst: number;
  winLeadFirstPer: number;
  winLeadSecondPer: number;
  winOutshootOpp: number;
  winOutshotByOpp: number;
  faceOffsTaken: number;
  faceOffsWon: number;
  faceOffsLost: number;
  faceOffWinPercentage: string;
  shootingPctg: number;
  savePctg: number;
}
