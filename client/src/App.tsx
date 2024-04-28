import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

export default function App() {
  return (
    <div className='flex flex-col min-h-screen bg-orange-50'>
      <Header />
      <main className='flex-grow flex items-center justify-center'>
        <Outlet />
      </main>
      <footer className=' p-4 text-center border border-t-black/10'>
        Footer
      </footer>
    </div>
  );
}
