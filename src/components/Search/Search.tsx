import * as React from "react";
import { AppContext } from "../../context/AppContext";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { Country } from "../../types";

interface QueryData {
  countries: Country[];
}

interface Props {
  onSearch: () => any;
  countries: Country[];
  totalScore: number;
}

export const Search: React.SFC<Props> = ({
  onSearch,
  countries,
  totalScore
}) => (
  <div className="search">
    <input placeholder="search a country" type="text" name="" id="search-inp" />
    <select style={{ margin: "10px" }} id="region-inp">
      <option value="">none</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
    <button className="btn" onClick={onSearch}>
      ALLEZ!
    </button>
    <h1>
      Score: {totalScore} / {countries.length}{" "}
    </h1>
  </div>
);

export default () => (
  <ApolloConsumer>
    {client => (
      <AppContext.Consumer>
        {({ getCountries, totalScore, countries }) => (
          <Search
            countries={countries}
            totalScore={totalScore}
            onSearch={async () => {
              const { data } = await client.query<QueryData>({
                query: queryCountries,
                variables: {
                  name: (document.getElementById(
                    "search-inp"
                  ) as HTMLInputElement).value,
                  region: (document.getElementById(
                    "region-inp"
                  ) as HTMLInputElement).value
                }
              });
              getCountries(data.countries);
            }}
          />
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
