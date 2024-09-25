import Leg from './leg/Leg';
import './ticket.scss';

export default function Ticket(props) {
  const {
    flight: {
      price: {
        total: { amount: price },
      },
    },
    flight: { legs },
    flight: {
      carrier: { caption },
    },
  } = props;
  return (
    <div className='ticket'>
      <section className='ticket-title'>
        <p>{price} ₽</p>
        <p>Стоимость для одного взрослого пассажира</p>
      </section>
      <section className='legs'>
        {legs.map((leg, i) => {
          return <Leg key={i} {...leg} caption={caption} />;
        })}
      </section>
      <button>ВЫБРАТЬ</button>
    </div>
  );
}
