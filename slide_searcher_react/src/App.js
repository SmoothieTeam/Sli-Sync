import './App.css';
import FilePanel from './components/FilePanel.js'

function App() {
  return (
    <div className="App">
      <FilePanel onSubmit={(e, v) => {console.log(e); console.log(v);}}></FilePanel>
    </div>
  );
}

export default App;
