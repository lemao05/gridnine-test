import { getDate, getDuration } from './legUtils';
import TransferCount from './TransferCount';

export default function Leg(props) {
  const { duration, segments } = props;

  const departureCity = segments[0].departureCity?.caption;
  const departureAirport = segments[0].departureAirport.caption;
  const departureAirportUid = segments[0].departureAirport.uid;
  const arrivalCity = segments[segments.length - 1].arrivalCity?.caption;
  const arrivalAirport = segments[segments.length - 1].arrivalAirport.caption;
  const arrivalAirportUid = segments[segments.length - 1].arrivalAirport.uid;
  const airline =
    segments[0].operatingAirline?.caption || segments[0].airline.caption;

  return (
    <div>
      <p className='destination'>
        {departureCity}, {departureAirport}{' '}
        <span className='uid'>({departureAirportUid}) → </span>
        {arrivalCity}, {arrivalAirport}{' '}
        <span className='uid'>({arrivalAirportUid})</span>
      </p>
      <div className='date-time'>
        {getDate(segments, 'departureDate', 0)}
        {getDuration(duration)}
        {getDate(segments, 'arrivalDate', segments.length - 1)}
      </div>
      <TransferCount count={segments.length - 1} />
      <p>Рейс выполняет: {airline}</p>
    </div>
  );
}
