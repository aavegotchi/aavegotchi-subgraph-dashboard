import Meta from "../meta/subgraphs.json";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export function getSubgraphClients() {
    const clients = [];
    const nodes = Object.keys(Meta.nodes);
    nodes.forEach((n) => {
        // init index Node ApolloClient
        const indexNode = new ApolloClient({
            uri: Meta.nodes[n].indexNode,
            cache: new InMemoryCache(),
        });

        // init Subgraph ApolloClients
        const subgraphNodes = [];
        const domains = Object.keys(Meta.nodes[n].subgraphs);
        domains.forEach((d) => {
            console.log(d);
            Meta.nodes[n].subgraphs[d].forEach((s) => {
                const subgraphEndpoint = `${Meta.nodes[n].apiEndpoint}/${d}/${s}`;
                subgraphNodes[`${d}/${s}`] = new ApolloClient({
                    uri: subgraphEndpoint,
                    cache: new InMemoryCache(),
                });
            });
        });

        // Add to global clients
        clients[n] = { indexNode: indexNode, subgraphs: subgraphNodes };
    });

    return clients;
}
