import { getTeamStats, getTeamSchedule, getPlayerInfo, getPlayerStats } from '../src/actions/nhlApiActions';
import axios from 'axios';

const getMock = jest.spyOn(axios, 'get');
const teamInput = {
  teamId: '40',
  season: '20182019',
};
const playerInput = {
  playerId: '8476792',
  season: '20182019',
};

describe('getTeamStats', () => {
  it('returns data from api if fetch is successful', async () => {
    getMock.mockImplementationOnce(() =>
      Promise.resolve({
        data: { msg: 'the data' },
        status: 200,
      })
    );
    const response = await getTeamStats(teamInput.teamId, teamInput.season);
    expect(response).toEqual({ error: false, data: { msg: 'the data' } });
  });

  it('returns an error if fetch is unsuccessful', async () => {
    getMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        data: {},
      })
    );
    const response = await getTeamStats(teamInput.teamId, teamInput.season);
    expect(response).toEqual({ error: true });
  });
});

describe('getTeamSchedule', () => {
  it('returns data from api if fetch is successful', async () => {
    getMock.mockImplementationOnce(() =>
      Promise.resolve({
        data: { msg: 'the data' },
        status: 200,
      })
    );
    const response = await getTeamSchedule(teamInput.teamId, teamInput.season);
    expect(response).toEqual({ error: false, data: { msg: 'the data' } });
  });

  it('returns an error if fetch is unsuccessful', async () => {
    getMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        data: {},
      })
    );
    const response = await getTeamSchedule(teamInput.teamId, teamInput.season);
    expect(response).toEqual({ error: true });
  });
});

describe('getPlayerInfo', () => {
  it('returns data from api if fetch is successful', async () => {
    getMock.mockImplementationOnce(() =>
      Promise.resolve({
        data: { msg: 'the data' },
        status: 200,
      })
    );
    const response = await getPlayerInfo(playerInput.playerId);
    expect(response).toEqual({ error: false, data: { msg: 'the data' } });
  });

  it('returns an error if fetch is unsuccessful', async () => {
    getMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        data: {},
      })
    );
    const response = await getPlayerInfo(playerInput.playerId);
    expect(response).toEqual({ error: true });
  });
});

describe('getPlayerStats', () => {
  it('returns data from api if fetch is successful', async () => {
    getMock.mockImplementationOnce(() =>
      Promise.resolve({
        data: { msg: 'the data' },
        status: 200,
      })
    );
    const response = await getPlayerStats(playerInput.playerId, playerInput.season);
    expect(response).toEqual({ error: false, data: { msg: 'the data' } });
  });

  it('returns an error if fetch is unsuccessful', async () => {
    getMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        data: {},
      })
    );
    const response = await getPlayerStats(playerInput.playerId, playerInput.season);
    expect(response).toEqual({ error: true });
  });
});
