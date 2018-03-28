import * as React from "react";
import "./App.css";
import ListView from "../List/ListView";
import gql from "graphql-tag";
import { Query, ApolloConsumer } from "react-apollo";

export const AppContext = React.createContext();

class AppProvider extends React.Component {
  state = {
    totalScore: 0,
    countries: [],
    open: false,
    toggle: () => this.setState(prev => ({ open: !prev.open })),
    getCountries: countries => this.setState({ countries }),
    addTotalScore: () =>
      this.setState(prev => ({ totalScore: (prev.totalScore += 1) }))
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

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
            <ListView />
          </div>
        </AppProvider>
      </div>
    );
  }
}

const queryCountries = gql`
  query($region: String, $name: String) {
    countries(region: $region, name: $name) {
      Name
      Flag
      CurrencyName
      CurrencySymbol
    }
  }
`;

const Search = () => (
  <ApolloConsumer>
    {client => (
      <AppContext.Consumer>
        {({ getCountries, totalScore }) => (
          <div>
            <input
              style={{
                borderRadius: "20px",
                height: "20px",
                padding: "10px",
                width: "20%",
                marginRight: "10px"
              }}
              placeholder="search a country"
              type="text"
              name=""
              id="search-inp"
            />
            <button
              style={{
                height: "40px",
                padding: "10px",
                backgroundColor: "#44aabb",
                borderRadius: "20px",
                minWidth: "20px",
                color: "#fff"
              }}
              onClick={async () => {
                const { data } = await client.query({
                  query: queryCountries,
                  variables: {
                    name: document.getElementById("search-inp").value
                  }
                });
                getCountries(data.countries);
              }}
            >
              ALLEZ!
            </button>
            <h1>Score: {JSON.stringify(totalScore)} </h1>
          </div>
        )}
      </AppContext.Consumer>
    )}
  </ApolloConsumer>
);
export default App;
