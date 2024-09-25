import { useEffect, useState } from 'react';
import { fetchFlights } from '../services/api.service';
import Ticket from './Ticket';
import Sidebar from './Sidebar';

export default function TicketList() {
  const [flights, setFlights] = useState([]);
  const [flightAmount, setFlightAmount] = useState(2);
  const [originalFlights, setOriginalFlights] = useState([]);
  const [filters, setFilters] = useState({
    sort: null,
    transfers: {
      0: false,
      1: false,
    },
    price: {
      min: 0,
      max: Infinity,
    },
  });

  useEffect(() => {
    async function getFlights() {
      const data = await fetchFlights();
      setFlights(data);
      setOriginalFlights(data);
    }

    getFlights();
  }, []);

  useEffect(() => {
    const filterByTransfers = (flights) => {
      if (filters.transfers['0'] && !filters.transfers['1']) {
        return flights.filter((el) =>
          el.flight.legs.every((leg) => leg.segments.length === 1)
        );
      } else if (!filters.transfers['0'] && filters.transfers['1']) {
        return flights.filter((el) =>
          el.flight.legs.some((leg) => leg.segments.length === 2)
        );
      }
      return flights;
    };

    const sortFlights = (flights) => {
      const sortedFlights = [...flights];
      switch (filters.sort) {
        case 'inc':
          sortedFlights.sort(
            (a, b) =>
              +a.flight.price.total.amount - +b.flight.price.total.amount
          );
          break;
        case 'dec':
          sortedFlights.sort(
            (a, b) =>
              +b.flight.price.total.amount - +a.flight.price.total.amount
          );
          break;
        case 'time':
          sortedFlights.sort(
            (a, b) =>
              +a.flight.legs.reduce((acc, el) => acc + el.duration, 0) -
              +b.flight.legs.reduce((acc, el) => acc + el.duration, 0)
          );
          break;
      }
      return sortedFlights;
    };

    const filteredAndSortedFlights = sortFlights(
      filterByTransfers(
        originalFlights.filter(
          (el) =>
            el.flight.price.total.amount >= filters.price.min &&
            el.flight.price.total.amount <= filters.price.max
        )
      )
    );

    setFlights(filteredAndSortedFlights);
  }, [filters]);

  const handleSortChange = (sort) => {
    setFilters({ ...filters, sort: sort });
  };

  const handleTransferChange = (key) => {
    setFilters({
      ...filters,
      transfers: { ...filters.transfers, [key]: !filters.transfers[key] },
    });
  };

  const handlePriceChange = (min, max) => {
    setFilters({
      ...filters,
      price: { min: min === '' ? 0 : +min, max: max === '' ? Infinity : +max },
    });
  };

  return (
    <>
      <Sidebar
        onSortChange={handleSortChange}
        onTransferChange={handleTransferChange}
        onPriceChange={handlePriceChange}
        filters={filters}
      />
      <main>
        <div className='ticket-list'>
          {flights.slice(0, flightAmount).map((el, i) => (
            <Ticket key={i} {...el} />
          ))}
        </div>
        <button onClick={() => setFlightAmount((prev) => prev + 5)}>
          Показать еще
        </button>
      </main>
    </>
  );
}
