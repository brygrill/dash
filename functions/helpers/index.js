// Helpers for interacting with Strava data
const moment = require('moment');
const _ = require('lodash');

const weekStart = moment().startOf('isoWeek');

module.exports = {
  currentWeekStart: moment().startOf('isoWeek'),
  lastXWeeks(x) {
    // x would be 12 for example
    // to get the last 12 including the current week
    // we would only want to subtract the last 11
    return moment()
      .subtract(x - 1, 'weeks')
      .startOf('isoWeek')
      .unix();
  },
  seedWeeks(weeks) {
    const range = _.range(weeks).map((item, index) => {
      return {
        weekOf: moment(weekStart)
          .subtract(item, 'week')
          .format('MMM Do'),
        totalTimeSec: 0,
        totalTimeHrs: 0,
        totalSuffer: 0,
        weekNum: index,
      };
    });
    return range.reverse();
  },
  weeksAgoNum(date) {
    const current = moment(weekStart);
    return Math.abs(Math.ceil(current.diff(date, 'weeks', true)));
  },
  weekStartDate(date) {
    return moment(date)
      .startOf('isoWeek')
      .format('MMM Do');
  },
  formatHoursStr(sec) {
    const duration = Number(sec);
    const hrs = Math.floor(duration / 3600);
    const mins = Math.floor((duration % 3600) / 60);
    const minsStr = (`0${mins}`).slice(-2);
    return `${hrs}h ${minsStr}m`;
  },
  formatHoursNum(sec) {
    const hrs = moment.duration(sec, 'seconds').asHours();
    return Math.round(hrs * 100) / 100;
  },
  formatMiles(meters) {
    const miles = meters * 0.000621371192;
    const milesRounded = Math.round(miles * 100) / 100;
    return milesRounded.toString();
  },
};
