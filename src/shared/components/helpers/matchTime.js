function kickOffTime(time) {
  return new Date(parseInt(time, 10) * 1000).toLocaleTimeString(
    'en-GB',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );
}

function minuteTime(minutes, seconds, half) {
  let tm = minutes;
  if (minutes > 45 && half === 0) {
    tm = `45(+${minutes - 45})`;
  } else if (minutes === 45 && seconds === 0 && half === 1) {
    tm = 'HT';
  } else if (minutes > 90) {
    tm = `90(+${minutes - 90})`;
  } else if (minutes !== 'FT') {
    tm = `${minutes}`;
  }
  return tm;
}

module.exports = { kickOffTime, minuteTime };
