import * as React from "react";
import { Country } from "../types";

export const AppContext = (React as any).createContext();

interface State {
  totalScore: number;
  countries: Country[] | never[];
  getCountries: (countries: Country[]) => void;
  addTotalScore: () => void;
}

interface Props {
  children: React.ReactNode;
}

export default class AppProvider extends React.Component<Props, State> {
  state = {
    totalScore: 0,
    countries: [],
    getCountries: (countries: Country[]) =>
      this.setState({ countries, totalScore: 0 }),
    addTotalScore: () =>
      this.setState((prev: State) => ({ totalScore: (prev.totalScore += 1) }))
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
