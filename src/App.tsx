import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import HomeScreen from './screens/HomeScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import PrivateRoute from './components/Router/PrivateRoute';
import SigninScreen from './screens/SigninScreen';
import AccountScreen from './screens/AccountScreen';
import SignupScreen from './screens/SignUpScreen';
import TagsScreen from './screens/TagsScreen';
import TagsContainer from './containers/TagsContainer';
import TagInfoScreen from './screens/TagInfoScreen';
import ParksContainer from './containers/ParksContainer';
import ParksScreen from './screens/ParksScreen';
import TrackInfoScreen from './screens/TrackInfoScreen';
import ParkTracksScreen from './screens/ParkTracksScreen';
import TracksContainer from './containers/TracksContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppContainer />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="events" element={<LeaderboardScreen />} />
          <Route path="receivers" element={<LeaderboardScreen />} />
          <Route path="tags" element={<TagsContainer />}>
            <Route path="" element={<TagsScreen />} />
            <Route path=":tagId" element={<TagInfoScreen />} />
          </Route>
          <Route path="parks" element={<ParksContainer />}>
            <Route path="" element={<ParksScreen />} />
            <Route path=":parkId/tracks" element={<TracksContainer />}>
              <Route path="" element={<ParkTracksScreen />} />
              <Route path=":trackId" element={<TrackInfoScreen />} />
            </Route>
          </Route>
          <Route path="account" element={<AccountScreen />} />
          <Route path="leaderboard" element={<LeaderboardScreen />} />
        </Route>
        <Route path="signin" element={<SigninScreen />} />
        <Route path="signup" element={<SignupScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
