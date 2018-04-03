import * as React from "react";

import { Country } from "../../types";
import { ListItem } from "../";
import "./ListView.css";
import { AppContext } from "../../context/AppContext";

interface Props {
  countries: Country[] | null;
}

export const ListView: React.SFC<Props> = ({ countries }) => {
  const ls =
    countries && countries.map(c => <ListItem key={c.Name} country={c} />);
  return <div className="list">{ls}</div>;
};

export default () => (
  <AppContext.Consumer>
    {countries => <ListView countries={countries.countries} />}
  </AppContext.Consumer>
);
