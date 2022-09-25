import { getMockReq, getMockRes } from '@jest-mock/express';
import { getPlayerDetails } from '../src/controllers/playerPipelineController';
import * as fetchActions from '../src/actions/nhlApiActions';
import * as utils from '../src/utils';
import { testPlayerStatsResponse, testPlayerInfoResponse } from './testData';

const getPlayerInfoMock = jest.spyOn(fetchActions, 'getPlayerInfo');
const getPlayerStatsMock = jest.spyOn(fetchActions, 'getPlayerStats');
const writeCSVFromDataMock = jest.spyOn(utils, 'writeCSVFromData');

describe('playerPipelineController: getTeamDetails', () => {
  const inputReq = {
    query: {
      playerId: '8476792',
      season: '20182019',
    },
  };

  beforeAll(() => {
    getPlayerInfoMock.mockImplementation(async (): Promise<any> => testPlayerInfoResponse);
    getPlayerStatsMock.mockImplementation(async (): Promise<any> => testPlayerStatsResponse);
    writeCSVFromDataMock.mockImplementationOnce(async () => true);
  });

  afterAll(() => jest.resetAllMocks());

  it('should return a 200 from API when provided a player ID and season year and csv write is successful', async () => {
    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getPlayerDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.download).toHaveBeenCalledWith('./output/playerPipeline.csv');
  });

  it('should call the csvWriter function with the expected player data', async () => {
    const expectedPlayerData = {
      playerId: 8476792,
      playerName: 'Torey Krug',
      currentTeam: 'Boston Bruins',
      playerAge: 28,
      playerNumber: '47',
      playerPosition: 'Defenseman',
      rookie: false,
      assists: 43,
      goals: 38,
      games: 66,
      hits: 57,
      points: 81,
    };

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getPlayerDetails(mockRequest, res);
    expect(writeCSVFromDataMock).toHaveBeenCalledWith('playerPipeline', expectedPlayerData);
  });

  it('should catch errors', async () => {
    getPlayerStatsMock.mockImplementationOnce(() => {
      throw new Error('test error!');
    });

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getPlayerDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should handle fetch error for stats call', async () => {
    getPlayerStatsMock.mockImplementationOnce(async () => {
      return {
        error: true,
      };
    });

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getPlayerDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error calling NHL API', error: true });
  });

  it('should handle fetch error for info call', async () => {
    getPlayerInfoMock.mockImplementationOnce(async () => {
      return {
        error: true,
      };
    });

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getPlayerDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error calling NHL API', error: true });
  });

  it('should handle csvWriter failure', async () => {
    writeCSVFromDataMock.mockImplementationOnce(async () => false);

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getPlayerDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error writing player data to CSV', error: true });
  });

  it('should pass a 422 if player ID and season year are not provided', async () => {
    const inputReq = {
      query: {
        season: '20182019',
      },
    };
    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getPlayerDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(422);
  });
});
