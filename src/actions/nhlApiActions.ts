const axios = require('axios').default;
const baseUrl = 'https://statsapi.web.nhl.com/api/v1';

interface ApiResponse {
  error: boolean;
  data?: any;
  msg?: string;
}

export const getTeamStats = async (teamId: number | string, season: string): Promise<ApiResponse> => {
  const response: ApiResponse = { error: false };
  const seasonParam = season ? `&season=${season}` : null;
  const statsUrl = `${baseUrl}/teams/${teamId}?expand=team.stats` + seasonParam;
  try {
    const statsResponse = await axios.get(statsUrl);
    if (!statsResponse.data || statsResponse.status !== 200) {
      response.error = true;
      return response;
    }
    response.data = statsResponse.data;
    return response;
  } catch (err) {
    response.error = true;
    console.log(JSON.stringify(err));
    return response;
  }
};

export const getTeamSchedule = async (teamId: number | string, season: string): Promise<ApiResponse> => {
  const response: ApiResponse = { error: false };
  const seasonParam = season ? `&season=${season}` : null;
  const scheduleUrl = `${baseUrl}/schedule?teamId=${teamId}&gameType=R` + seasonParam;

  try {
    const scheduleResponse = await axios.get(scheduleUrl);
    if (!scheduleResponse.data || scheduleResponse.status !== 200) {
      response.error = true;
      return response;
    }
    response.data = scheduleResponse.data;
    return response;
  } catch (err) {
    response.error = true;
    console.log(JSON.stringify(err));
    return response;
  }
};

export const getPlayerInfo = async (playerId: number | string): Promise<ApiResponse> => {
  const response: ApiResponse = { error: false };
  const infoUrl = `${baseUrl}/people/${playerId}`;
  try {
    const statsResponse = await axios.get(infoUrl);
    if (!statsResponse.data || statsResponse.status !== 200) {
      response.error = true;
      return response;
    }
    response.data = statsResponse.data;
    return response;
  } catch (err) {
    response.error = true;
    console.log(JSON.stringify(err));
    return response;
  }
};

export const getPlayerStats = async (playerId: number | string, season: string): Promise<ApiResponse> => {
  const response: ApiResponse = { error: false };
  const statsUrl = `${baseUrl}/people/${playerId}/stats?stats=statsSingleSeason&season=${season}`;
  try {
    const statsResponse = await axios.get(statsUrl);
    if (!statsResponse.data || statsResponse.status !== 200) {
      response.error = true;
      return response;
    }
    response.data = statsResponse.data;
    return response;
  } catch (err) {
    response.error = true;
    console.log(JSON.stringify(err));
    return response;
  }
};
