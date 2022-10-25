const { ApolloClient, InMemoryCache, HttpLink } = require("@apollo/client");
import fetch from "cross-fetch";

export const Meta = {
    nodes: [
        {
            name: "hosted-service",
            indexNode: new ApolloClient({
                link: new HttpLink({
                    uri: "https://api.thegraph.com/index-node/graphql",
                    fetch,
                }),
                cache: new InMemoryCache(),
            }),
            apiEndpoint: "https://api.thegraph.com",
            default: true,
        },
        {
            name: "pixelcraft-dev",
            indexNode: new ApolloClient({
                link: new HttpLink({
                    uri: "http://157.90.182.138:8030/graphql",
                    fetch,
                }),
                cache: new InMemoryCache(),
            }),
            apiEndpoint: "http://157.90.182.138:8000",
            default: false,
        },
    ],
    subgraphs: [
        {
            name: "aavegotchi/aavegotchi-core-matic",
        },
        {
            name: "aavegotchi/gotchiverse-matic",
        },
        {
            name: "aavegotchi/aavegotchi-gltr-staking",
        },
        {
            name: "aavegotchi/aavegotchi-baazaar-gbm",
        },
        {
            name: "aavegotchi/aavegotchi-realm-matic",
        },
        {
            name: "aavegotchi/aavegotchi-svg",
        },
        {
            name: "aavegotchi/aavegotchi-portal-svgs",
        },
        {
            name: "aavegotchi/aavegotchi-gbm-v2",
        },
        {
            name: "aavegotchi/aavegotchi-gbm-wearables",
        },
        {
            name: "aavegotchi/aavegotchi-matic-raffle",
        },
        {
            name: "aavegotchi/aavegotchi-alchemica",
        },
        {
            name: "aavegotchi/gotchi-vault",
        },
    ],
};
