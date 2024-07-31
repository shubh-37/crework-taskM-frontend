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
