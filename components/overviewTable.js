// @ts-nocheck
import { ApolloClient, InMemoryCache } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Meta from "../meta/subgraphs";
import { FETCH_SUBGRAPH_STATUSES } from "../utils/queries";

export function OverviewTable() {
    const fetchSubgraphStatusesOf = async (node) => {
        const { data } = await node.indexNode.query({
            query: FETCH_SUBGRAPH_STATUSES,
            variables: {
                subgraphs: Meta.subgraphs.map((e) => e.hash),
            },
        });

        return data;
    };

    const getStatusOfNodeAndHash = (hash, index) => {
        if (!subgraphStatuses) {
            return "Pending";
        }

        return "Synced";
    };

    const [subgraphStatuses, setSubgraphStatuses] = useState(null);

    useEffect(() => {
        async function updateSubgraphStatus() {
            if (!subgraphStatuses) {
                const data = await Promise.all(
                    Meta.nodes.map((e) => {
                        return fetchSubgraphStatusesOf(e.indexNode);
                    })
                );

                setSubgraphStatuses(data);
            }
        }

        updateSubgraphStatus();
    });

    return (
        <div>
            <h2>Overview</h2>
            <table>
                <tbody>
                    <tr>
                        <td>test</td>
                        <td>blabla</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
