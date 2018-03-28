import * as React from "react";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
import { Country } from "../../types";
import { ListItem } from "../";
import "./ListView.css";
import { AppContext } from "../App/App";

export const ListView = ({ countries }) => {
  const ls: [Country] | null =
    countries &&
    countries.map(c => (
      <AppContext.Consumer key={c.Name}>
        {({ addTotalScore }) => (
          <ListItem country={c} addTotalScore={() => addTotalScore()} />
        )}
      </AppContext.Consumer>
    ));
  return <div className="list">{ls}</div>;
};

export default () => (
  <AppContext.Consumer>
    {countries => <ListView countries={countries.countries} />}
  </AppContext.Consumer>
);
