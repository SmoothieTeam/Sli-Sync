import UploadPanel from './components/UploadPanel.js'

function App() {
  const handleSubmit = (t, v, s) => {
    console.log(t);
    console.log(v);
    console.log(s);
  }

  return (
    <div className="App">
      <UploadPanel onSubmit={handleSubmit}></UploadPanel>
    </div>
  );
}

export default App;
