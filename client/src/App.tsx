import { Link, Outlet } from 'react-router-dom';
import './App.css';

// function App() {
//   return (
//     <div className=' flex flex-col min-h-screen'>
//       <header className=' flex justify-between bg-sky-100 p-4 font-extrabold'>
//         <Link to='/'>Home</Link>
//         <Link to='/login'>Login</Link>
//       </header>
//       <main>
//         <Outlet />
//       </main>
//       <footer>Footer</footer>
//     </div>
//   );
// }

export default App;

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-gray-100 p-4 font-extrabold text-xl'>
        <div className='flex justify-between max-w-7xl mx-auto'>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
        </div>
      </header>
      <main className='flex-grow flex items-center justify-center'>
        <Outlet />
      </main>
      <footer className='bg-gray-100 p-4 text-center'>Footer</footer>
    </div>
  );
}
