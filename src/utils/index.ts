import { createObjectCsvWriter } from 'csv-writer';
import { IPlayerData } from '../models/IPlayerData';
import { ITeamData } from '../models/ITeamData';

export const writeCSVFromData = async (pipeline: string, data: ITeamData | IPlayerData): Promise<boolean> => {
  const dataKeys = Object.keys(data);
  const headerArr = dataKeys.map((key) => {
    return { id: key, title: key };
  });

  const csvWriter = createObjectCsvWriter({
    path: `./output/${pipeline}.csv`,
    header: headerArr,
    append: false,
  });

  try {
    await csvWriter.writeRecords([data]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
