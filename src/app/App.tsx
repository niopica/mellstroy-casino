import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './providers/AppProvider';
import { HomePage } from '../pages/home';
import { StreamPage } from '../pages/stream';
import { GamesPage } from '../pages/games';
import { ChallengesPage } from '../pages/challenges';
import { HelpPage } from '../pages/help';
import { AboutPage } from '../pages/about';
import { Layout } from '../widgets/layout';
import '../shared/ui/styles/index.scss';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stream" element={<StreamPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
