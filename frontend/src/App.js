import { Route, Routes } from 'react-router-dom'
import LogInPage from './page/auth/signin/LogInPage.jsx';
import SignupPage from './page/auth/signup/SignupPage.jsx';
import HomePage from './page/homepage/HomePage.jsx';
import Sidebar from './components/common/Sidebar.jsx';
import RightPanel from './components/common/RightPanel.jsx';
import NotificationPage from './page/Notification/NotificationPage.jsx';
import ProfilePage from './page/profile/ProfilePage.jsx';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from './constant/url.js';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';

function App() {
  //  get auth user
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try { 
        const response = await fetch(`${BASE_URL}/api/auth/get`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        if (data.error) return null;

        if (!response.ok) throw new Error(data.error || 'something went wrong in get auth user')
        return data

      } catch (error) {
        console.log(`get auth user error message: ${error}`)
        throw error
      }
    },
    retry: false
  })

  if(isLoading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner size="lg"/> </div>

  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser && <Sidebar />}
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <LogInPage /> } />
          <Route path="/login" element={!authUser ? <LogInPage /> : <HomePage /> } />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <HomePage /> } />
          <Route path="/notifications" element={authUser ? <NotificationPage /> : <LogInPage /> } />
        <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <LogInPage /> } />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;