import { gql } from "@apollo/client";

export const FETCH_SUBGRAPH_STATUSES = gql`
    query fetchSubgraphStatuses($subgraphs: [String!]) {
        indexingStatuses(subgraphs: $subgraphs) {
            subgraph
            synced
            health
            fatalError {
                handler
            }
            nonFatalErrors {
                handler
            }
            chains {
                chainHeadBlock {
                    number
                }
                latestBlock {
                    number
                }
            }
            entityCount
            node
        }
    }
`;

export const FETCH_CURRENT_SUBGRAPH = gql`
    query fetchCurrentSubgraph($subgraphName: String!) {
        indexingStatusForCurrentVersion(subgraphName: $subgraphName) {
            subgraph
        }
        indexingStatusForPendingVersion(subgraphName: $subgraphName) {
            subgraph
        }
    }
`;
