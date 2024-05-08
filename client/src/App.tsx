import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='flex flex-col min-h-screen bg-fuchsia-50'>
      <Header />
      <main className='flex-grow flex items-center justify-center'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
