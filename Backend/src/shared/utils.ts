import { CAPITALIZE_CASE_REGEX } from '@constants/index';

const convertSecondsToMilliseconds = (seconds: number): number => seconds * 1000;
const convertMinutesToMilliseconds = (
  minutes: number,
): number => convertSecondsToMilliseconds(minutes * 60);
const convertHoursToMilliseconds = (
  hours: number,
): number => convertMinutesToMilliseconds(hours * 60);
const convertDaysToMilliseconds = (days: number): number => convertHoursToMilliseconds(days * 24);
const convertMillisecondsToSeconds = (milliseconds: number): number => milliseconds / 1000;

const capitalizeCase = (str: string): string => {
  str = str.toLowerCase();
  return str.replace(CAPITALIZE_CASE_REGEX, (wordFirstLetter) => wordFirstLetter.toUpperCase());
};

export {
  convertDaysToMilliseconds, convertHoursToMilliseconds, capitalizeCase,
  convertMinutesToMilliseconds, convertSecondsToMilliseconds, convertMillisecondsToSeconds,
};
