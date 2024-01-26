const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
const utc = require("dayjs/plugin/utc");
dayjs.extend(isBetween);
dayjs.extend(utc);

module.exports = {
  isInputDayClosed,
  isInputTimeClosed,
};

function isInputDayClosed(arr, inputDateTime) {
  const inputDay = dayjs(inputDateTime).day();
  const daysClosed = convertDaysCloseIntoNumArr(arr);
  return daysClosed.includes(inputDay);
}

function convertDaysCloseIntoNumArr(arr) {
  const daysOfWeek = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0,
  };
  const daysCloseArr = arr.map((day) => daysOfWeek[day]);
  return daysCloseArr;
}

function isInputTimeClosed(inputDateTime, timeOpen, timeClose) {
  const dateTime = dayjs(inputDateTime);
  const formattedTimeOpen = formatTime(timeOpen);
  const formattedTimeClose = formatTime(timeClose);
  const [hourOpen, minuteOpen] = formattedTimeOpen.split(":").map(Number);
  const [hourClose, minuteClose] = formattedTimeClose.split(":").map(Number);

  const dateTimeOpen = dayjs(inputDateTime)
    .utcOffset(8 * 60)
    .hour(hourOpen)
    .minute(minuteOpen);
  const dateTimeClose = dayjs(inputDateTime)
    .utcOffset(8 * 60)
    .hour(hourClose)
    .minute(minuteClose);
  return !dateTime.isBetween(dateTimeOpen, dateTimeClose);
}

function formatTime(number) {
  let str = number.toString();
  let hours, minutes;

  if (str.length === 3) {
    hours = str.substring(0, 1);
    minutes = str.substring(1);
  } else if (str.length === 4) {
    hours = str.substring(0, 2);
    minutes = str.substring(2);
  } else {
    return "Invalid input";
  }

  hours = hours.padStart(2, "0");
  minutes = minutes.padStart(2, "0");

  return `${hours}:${minutes}`;
}
