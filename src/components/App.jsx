import Footer from './layout/Footer';
import Header from './layout/Header';

import TicketList from './TicketList';

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <TicketList />
      </div>
      <Footer />
    </>
  );
}

export default App;
