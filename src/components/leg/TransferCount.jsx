export default function TransferCount({ count }) {
  return (
    <div className='transfers'>
      {count === 0 ? (
        <div className='line'></div>
      ) : (
        <>
          <div className='line'></div>
          <p>{count} пересадка</p>
          <div className='line'></div>
        </>
      )}
    </div>
  );
}
