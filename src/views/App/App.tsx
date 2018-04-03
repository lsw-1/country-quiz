import * as React from "react";
import "./App.css";
import { List, Search } from "../../components/";
import AppProvider from "../../context/AppContext";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppProvider>
          <header className="App-header">
            <h1 className="App-title">Countries App</h1>
            <Search />
          </header>
          <div style={{ margin: "2%" }}>
            <List />
          </div>
        </AppProvider>
      </div>
    );
  }
}

export default App;
