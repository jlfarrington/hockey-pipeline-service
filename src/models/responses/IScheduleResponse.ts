export interface IScheduleResponse {
  copyright: string;
  totalItems: number;
  totalGames: 82;
  totalMatches: 0;
  metaData: {
    timeStamp: string | Date;
  };
  wait: number;
  dates: IDate[];
}

export interface IDate {
  date: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalMatches: number;
  games: Game[];
  events: any[];
  matches: any[];
}

export interface Game {
  gamePk: number;
  link: string;
  gameType: string;
  season: string;
  gameDate: string | Date;
  status: {
    abstractGameState: string;
    codedGameState: string;
    detailedState: string;
    statusCode: string;
    startTimeTBD: false;
  };
  teams: {
    away: {
      leagueRecord: {
        wins: number;
        losses: number;
        ot: number;
        type: string;
      };
      score: number;
      team: {
        id: number;
        name: string;
        link: string;
      };
    };
    home: {
      leagueRecord: {
        wins: string;
        losses: number;
        ot: number;
        type: string;
      };
      score: number;
      team: {
        id: number;
        name: string;
        link: string;
      };
    };
  };
  venue: {
    name: string;
    link: string;
  };
  content: {
    link: string;
  };
}
