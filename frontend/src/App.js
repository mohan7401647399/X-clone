import { Route, Routes } from 'react-router-dom'
import LogInPage from './page/auth/signin/LogInPage.jsx';
import SignupPage from './page/auth/signup/SignupPage.jsx';
import HomePage from './page/homepage/HomePage.jsx';
import Sidebar from './components/common/Sidebar.jsx';
import RightPanel from './components/common/RightPanel.jsx';
import NotificationPage from './page/Notification/NotificationPage.jsx';
import ProfilePage from './page/profile/ProfilePage.jsx';

function App() {
  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar/>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/login" element={ <LogInPage /> } />
          <Route path="/signup" element={ <SignupPage /> } />
          <Route path="/notifications" element={ <NotificationPage /> } />
        <Route path="/profile/:username" element={ <ProfilePage /> } />
      </Routes>
      <RightPanel/>
    </div>
  );
}

export default App;