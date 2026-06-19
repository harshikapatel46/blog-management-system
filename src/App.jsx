import './App.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {login,logout} from './store/authSlice';
import authService from './Appwrite/Auth';
import { Header, Footer } from "./components";
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
   

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}))
        
        }else{
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false);
      })
        
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  else{
  return (
   <> 
   <div className ="App min-h-screen flex content-between  bg-blue-200 ">
  <div className='w-full flex flex-col grow '>
      <Header/>
      <main className ="w-full h-full :grow">
        <Outlet />
      </main  >
      <Footer  />
  </div>
   </div>
   </>
  )
}
}

export default App
