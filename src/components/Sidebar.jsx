import { useRef } from 'react';

export default function Sidebar({
  onSortChange,
  onTransferChange,
  onPriceChange,
  filters,
}) {
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  const handlePriceChange = () => {
    onPriceChange(minPriceRef.current.value, maxPriceRef.current.value);
  };

  return (
    <aside>
      <section>
        <h3>Сортировать</h3>
        <ul>
          <li>
            <input
              onChange={() => onSortChange('inc')}
              checked={filters.sort === 'inc'}
              type='radio'
              id='inc'
            />
            <label htmlFor='inc'> - по возрастанию цены</label>
          </li>
          <li>
            <input
              onChange={() => onSortChange('dec')}
              checked={filters.sort === 'dec'}
              type='radio'
              id='dec'
            />
            <label htmlFor='dec'> - по убыванию цены</label>
          </li>
          <li>
            <input
              onChange={() => onSortChange('time')}
              checked={filters.sort === 'time'}
              type='radio'
              id='time'
            />
            <label htmlFor='time'> - по времени в пути</label>
          </li>
        </ul>
      </section>
      <section>
        <h3>Фильтровать</h3>
        <ul>
          <li>
            <input
              onChange={() => onTransferChange('1')}
              type='checkbox'
              id='withTransfer'
              checked={filters.transfers['1']}
            />
            <label htmlFor='withTransfer'>- 1 пересадка</label>
          </li>
          <li>
            <input
              onChange={() => onTransferChange('0')}
              type='checkbox'
              id='withoutTransfer'
              checked={filters.transfers['0']}
            />
            <label htmlFor='withoutTransfer'>- 0 пересадок</label>
          </li>
        </ul>
      </section>
      <section>
        <h3>Цена</h3>
        <ul>
          <li>
            <label htmlFor='minPrice'>От</label>
            <input
              onChange={handlePriceChange}
              ref={minPriceRef}
              type='text'
              id='minPrice'
            />
          </li>
          <li>
            <label htmlFor='maxPrice'>До</label>
            <input
              onChange={handlePriceChange}
              ref={maxPriceRef}
              type='text'
              id='maxPrice'
            />
          </li>
        </ul>
      </section>
    </aside>
  );
}
