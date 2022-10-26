import Meta from "../meta/subgraphs";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { FETCH_SUBGRAPH_STATUSES } from "./queries";

export function fetchStatusOf(indexNode, subgraphHashes = []) {}

export function getSubgraphClients() {
  const clients = [];
  Meta.nodes.forEach((n) => {
    // init index Node ApolloClient
    const indexNode = new ApolloClient({
      uri: n.indexNode,
      cache: new InMemoryCache(),
    });

    // init Subgraph ApolloClients
    const subgraphNodes = [];
    Meta.subgraphs.forEach((s) => {});

    // Add to global clients
    clients[n] = { indexNode: indexNode, subgraphs: subgraphNodes };
  });

  return clients;
}
