import { getMockReq, getMockRes } from '@jest-mock/express';
import { getTeamDetails } from '../src/controllers/teamPipelineController';
import * as fetchActions from '../src/actions/nhlApiActions';
import * as utils from '../src/utils';
import { testScheduleResponse, testStatsResponse } from './testData';

const getTeamStatsMock = jest.spyOn(fetchActions, 'getTeamStats');
const getTeamScheduleMock = jest.spyOn(fetchActions, 'getTeamSchedule');
const writeCSVFromDataMock = jest.spyOn(utils, 'writeCSVFromData');

describe('teamPipelineController: getTeamDetails', () => {
  const inputReq = {
    query: {
      teamId: '4',
      season: '20182019',
    },
  };

  beforeAll(() => {
    getTeamStatsMock.mockImplementation(async (): Promise<any> => testStatsResponse);
    getTeamScheduleMock.mockImplementation(async (): Promise<any> => testScheduleResponse);
    writeCSVFromDataMock.mockImplementationOnce(async () => true);
  });

  afterAll(() => jest.resetAllMocks());

  it('should return a 200 from API when provided a team ID and season year and csv write is successful', async () => {
    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getTeamDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.download).toHaveBeenCalledWith('./output/teamPipeline.csv');
  });

  it('should call the csvWriter function with the expected data', async () => {
    const expectedTeamData = {
      teamId: 30,
      teamName: 'Wild',
      teamVenueName: 'Xcel Energy Center',
      gamesPlayed: 82,
      wins: 53,
      losses: 22,
      points: 113,
      goalsPerGame: 3.72,
      firstGameSeasonDate: '2018-09-18T00:00:00Z',
      firstOpponentName: 'Winnipeg Jets',
    };

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getTeamDetails(mockRequest, res);
    expect(writeCSVFromDataMock).toHaveBeenCalledWith('teamPipeline', expectedTeamData);
  });

  it('should catch errors', async () => {
    getTeamStatsMock.mockImplementationOnce(() => {
      throw new Error('test error!');
    });

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getTeamDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should handle fetch error for stats call', async () => {
    getTeamStatsMock.mockImplementationOnce(async () => {
      return {
        error: true,
      };
    });

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getTeamDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error calling NHL API', error: true });
  });

  it('should handle fetch error for schedule call', async () => {
    getTeamScheduleMock.mockImplementationOnce(async () => {
      return {
        error: true,
      };
    });

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getTeamDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error calling NHL API', error: true });
  });

  it('should handle csvWriter failure', async () => {
    writeCSVFromDataMock.mockImplementationOnce(async () => false);

    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getTeamDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error writing team data to CSV', error: true });
  });

  it('should pass a 422 if team ID and season year are not provided', async () => {
    const inputReq = {
      query: {
        season: '20182019',
      },
    };
    const mockRequest = getMockReq(inputReq);
    const { res } = getMockRes();
    await getTeamDetails(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(422);
  });
});
