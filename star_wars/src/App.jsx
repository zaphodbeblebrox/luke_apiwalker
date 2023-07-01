import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import SearchBar from './components/SearchBar';
import Display from './components/Display';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchBar />
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/:type/:id" element={<Display />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
