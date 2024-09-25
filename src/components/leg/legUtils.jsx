export function getDate(segments, dateTime, i) {
  const departureTime = segments[i][dateTime].split('T')[1].slice(0, 5);
  const day = segments[i][dateTime].split('T')[0].split('-')[2];
  const date = new Date(segments[i][dateTime].split('T')[0]);

  const dayIndex = date.getDay();

  const monthIndex = date.getMonth();

  const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const months = [
    'янв.',
    'фев.',
    'март',
    'апр.',
    'май',
    'июнь',
    'июль',
    'авг.',
    'сен.',
    'окт.',
    'нояб.',
    'дек.',
  ];

  const dayOfWeek = daysOfWeek[dayIndex];
  const month = months[monthIndex];

  if (dateTime === 'arrivalDate') {
    return (
      <p className='time'>
        <span className='date'>
          {day} {month} {dayOfWeek}
        </span>{' '}
        {departureTime}
      </p>
    );
  }

  return (
    <p className='time'>
      {departureTime}{' '}
      <span className='date'>
        {day} {month} {dayOfWeek}
      </span>
    </p>
  );
}

export function getDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  return (
    <p>
      {'\u{1F554}'} {hours} ч {minutes} мин
    </p>
  );
}
