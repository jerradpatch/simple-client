

export enum FREQUENCY {
  DAILY="DAILY",
  WEEKLY="WEEKLY",
  BIWEEKLY="BIWEEKLY"
}
export const DEFAULT_FEQUENCY = FREQUENCY.WEEKLY;

export const frequencyToDays = {
  DAILY: 1,
  WEEKLY: 7,
  BIWEEKLY: 14
}