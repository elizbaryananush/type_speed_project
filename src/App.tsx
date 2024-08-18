import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypePage from './Pages/TypePage';
import ResultsPage from './Pages/ResultsPage';

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TypePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

