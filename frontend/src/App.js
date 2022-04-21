import './App.css';
import { Header } from './Header';
import { SearchContainer } from './search/SearchContainer';

function App() {
  return (
    <div className="App">
      <div className="wrap">
        <Header />
        <SearchContainer />
      </div>

    </div>
  );
}

export default App;
