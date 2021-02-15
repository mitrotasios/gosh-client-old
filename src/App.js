import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from './components/Content';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar/>
        <Content/>
      </div>
    </BrowserRouter>    
  );
}

export default App;
