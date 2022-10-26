const { ApolloClient, InMemoryCache, HttpLink } = require("@apollo/client");
import fetch from "cross-fetch";
import {
  PROJECT_AAVEGOTCHI,
  PROJECT_FAKEGOTCHI,
  PROJECT_GOTCHIVERSE,
  PROJECT_GOTCHI_VAULT,
} from "./projects";

export const Meta = {
  nodes: [
    {
      name: "hosted-service",
      indexNode: new ApolloClient({
        link: new HttpLink({
          uri: "https://api.thegraph.com/index-node/graphql",
          fetch,
        }),
        cache: new InMemoryCache({ resultCaching: false }),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: "cache-first",
            errorPolicy: "ignore",
          },
          query: {
            fetchPolicy: "cache-first",
            errorPolicy: "all",
          },
        },
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
        defaultOptions: {
          watchQuery: {
            fetchPolicy: "cache-first",
            errorPolicy: "ignore",
          },
          query: {
            fetchPolicy: "cache-first",
            errorPolicy: "all",
          },
        },
      }),
      apiEndpoint: "http://157.90.182.138:8000",
      default: false,
    },
  ],
  subgraphs: [
    {
      name: "aavegotchi/aavegotchi-core-matic",
      projects: [PROJECT_AAVEGOTCHI, PROJECT_GOTCHIVERSE],
    },
    {
      name: "aavegotchi/gotchiverse-matic",
      projects: [PROJECT_AAVEGOTCHI, PROJECT_GOTCHIVERSE],
    },
    {
      name: "aavegotchi/fake-gotchis-matic",
      projects: [PROJECT_AAVEGOTCHI, PROJECT_FAKEGOTCHI],
    },
    {
      name: "aavegotchi/aavegotchi-gltr-staking",
      projects: [],
    },
    {
      name: "aavegotchi/aavegotchi-baazaar-gbm",
      projects: [],
    },
    {
      name: "aavegotchi/aavegotchi-realm-matic",
      deprecated: true,
      projects: [PROJECT_GOTCHIVERSE],
    },
    {
      name: "aavegotchi/aavegotchi-svg",
      projects: [PROJECT_AAVEGOTCHI, PROJECT_GOTCHIVERSE],
    },
    {
      name: "aavegotchi/aavegotchi-portal-svgs",
      projects: [PROJECT_AAVEGOTCHI],
    },
    {
      name: "aavegotchi/aavegotchi-gbm-v2",
      projects: [],
    },
    {
      name: "aavegotchi/aavegotchi-gbm-wearables",
      deprecated: true,
      projects: [],
    },
    {
      name: "aavegotchi/aavegotchi-matic-raffle",
      projects: [PROJECT_AAVEGOTCHI],
    },
    {
      name: "aavegotchi/aavegotchi-alchemica",
      projects: [],
    },
    {
      name: "aavegotchi/gotchi-vault",
      projects: [PROJECT_GOTCHI_VAULT],
    },
  ],
};
