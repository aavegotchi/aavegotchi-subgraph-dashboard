const { ApolloClient, InMemoryCache, HttpLink } = require("@apollo/client");
import { InvalidationPolicyCache } from "apollo-invalidation-policies";
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
        cache: new InvalidationPolicyCache({
          invalidationPolicies: {
            timeToLive: 10000,
          },
        }),
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
        cache: new InvalidationPolicyCache({
          invalidationPolicies: {
            timeToLive: 10000,
          },
        }),
      }),
      apiEndpoint: "http://157.90.182.138:8000",
      default: false,
    },
  ],
  subgraphs: [
    {
      name: "aavegotchi/aavegotchi-core-matic",
      projects: [PROJECT_AAVEGOTCHI, PROJECT_GOTCHIVERSE],
      github: "https://github.com/aavegotchi/aavegotchi-matic-subgraph",
    },
    {
      name: "aavegotchi/gotchiverse-matic",
      projects: [PROJECT_AAVEGOTCHI, PROJECT_GOTCHIVERSE],
      github: "https://github.com/aavegotchi/gotchiverse-subgraph",
    },
    {
      name: "aavegotchi/fake-gotchis-matic",
      projects: [PROJECT_AAVEGOTCHI, PROJECT_FAKEGOTCHI],
      github: "https://github.com/aavegotchi/aavegotchi-fakegotchi-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-gltr-staking",
      projects: [],
      github: "https://github.com/aavegotchi/aavegotchi-gltr-staking-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-baazaar-gbm",
      projects: [],
      github: "https://github.com/aavegotchi/aavegotchi-baazaar-gbm-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-realm-matic",
      deprecated: true,
      projects: [PROJECT_GOTCHIVERSE],
      github: "https://github.com/aavegotchi/aavegotchi-realm-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-svg",
      projects: [PROJECT_AAVEGOTCHI, PROJECT_GOTCHIVERSE],
      github: "https://github.com/aavegotchi/aavegotchi-svg-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-portal-svgs",
      projects: [PROJECT_AAVEGOTCHI],
      github: "https://github.com/aavegotchi/aavegotchi-portal-svg-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-gbm-v2",
      projects: [],
      github: "https://github.com/aavegotchi/aavegotchi-baazaar-gbm-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-gbm-wearables",
      deprecated: true,
      projects: [],
      github: "https://github.com/aavegotchi/aavegotchi-gbm-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-matic-raffle",
      projects: [PROJECT_AAVEGOTCHI],
      github: "https://github.com/aavegotchi/aavegotchi-raffle-subgraph",
    },
    {
      name: "aavegotchi/aavegotchi-alchemica",
      projects: [],
      github: "https://github.com/aavegotchi/aavegotchi-alchemica-subgraph",
    },
    {
      name: "aavegotchi/gotchi-vault",
      projects: [PROJECT_GOTCHI_VAULT],
      github: "https://github.com/aavegotchi/aavegotchi-vault-subgraph",
    },
  ],
};
