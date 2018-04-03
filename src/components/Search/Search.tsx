import * as React from "react";
import { AppContext } from "../../context/AppContext";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { Country } from "../../types";

interface QueryData {
  countries: Country[];
}

const Search = () => (
  <ApolloConsumer>
    {client => (
      <AppContext.Consumer>
        {({ getCountries, totalScore, countries }) => (
          <div className="search">
            <input
              placeholder="search a country"
              type="text"
              name=""
              id="search-inp"
            />
            <select style={{ margin: "10px" }} id="region-inp">
              <option value="">none</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <button
              className="btn"
              onClick={async () => {
                const schInp: HTMLInputElement = document.getElementById(
                  "search-inp"
                ) as HTMLInputElement;
                const regInp: HTMLInputElement = document.getElementById(
                  "region-inp"
                ) as HTMLInputElement;
                const { data } = await client.query<QueryData>({
                  query: queryCountries,
                  variables: {
                    name: schInp.value,
                    region: regInp.value
                  }
                });
                getCountries(data.countries);
              }}
            >
              ALLEZ!
            </button>
            <h1>
              Score: {totalScore} / {countries.length}{" "}
            </h1>
          </div>
        )}
      </AppContext.Consumer>
    )}
  </ApolloConsumer>
);

const queryCountries = gql`
  query($region: String, $name: String) {
    countries(region: $region, name: $name) {
      Name
      Flag
    }
  }
`;

export default Search;
