import moment from 'moment';
export function getTimeOfDay() {
  const currentHour = moment().hour();

  if (currentHour >= 5 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}

export function getTimeDifferenceInHours(createdAt) {
  const now = moment();
  const createdTime = moment(createdAt);
  const duration = moment.duration(now.diff(createdTime));
  const hours = duration.asHours();

  return hours;
}
