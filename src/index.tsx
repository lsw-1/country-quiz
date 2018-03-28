import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
