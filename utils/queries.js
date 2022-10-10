import { gql } from "@apollo/client";

const FETCH_SUBGRAPH_STATUSES = gql`
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

module.exports = { FETCH_SUBGRAPH_STATUSES };
