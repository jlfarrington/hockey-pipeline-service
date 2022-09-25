export interface IPlayerStatsResponse {
  copyright: string;
  stats: PlayerStat[];
}

export interface PlayerStat {
  type: Object;
  splits: PlayerStatSplit[];
}

export interface PlayerStatSplit {
  season: string;
  stat: {
    timeOnIce: string;
    assists: number;
    goals: number;
    pim: number;
    shots: number;
    games: number;
    hits: number;
    powerPlayGoals: number;
    powerPlayPoints: number;
    powerPlayTimeOnIce: string;
    evenTimeOnIce: string;
    penaltyMinutes: string;
    faceOffPct: number;
    shotPct: number;
    gameWinningGoals: number;
    overTimeGoals: number;
    shortHandedGoals: number;
    shortHandedPoints: number;
    shortHandedTimeOnIce: string;
    blocked: number;
    plusMinus: number;
    points: number;
    shifts: number;
    timeOnIcePerGame: string;
    evenTimeOnIcePerGame: string;
    shortHandedTimeOnIcePerGame: string;
    powerPlayTimeOnIcePerGame: string;
  };
}