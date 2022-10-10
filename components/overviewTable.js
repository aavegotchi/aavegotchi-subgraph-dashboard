// @ts-nocheck
import { ApolloClient, InMemoryCache } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Meta from "../meta/subgraphs";
import { FETCH_SUBGRAPH_STATUSES } from "../utils/queries";

export function OverviewTable() {
    const fetchSubgraphStatusesOf = async (node) => {
        const { data } = await node.query({
            query: FETCH_SUBGRAPH_STATUSES,
            variables: {
                subgraphs: Meta.subgraphs.map((e) => e.hash),
            },
        });
        return data.indexingStatuses;
    };

    const getStatusOfNodeAndHash = (hash, index) => {
        console.log(hash, index);
        if (!subgraphStatuses) {
            return "Loading...";
        }

        const filteredStatuses = subgraphStatuses[index].filter(
            (e) => e.subgraph == hash
        );

        if (filteredStatuses.length === 0) {
            return "Not deployed";
        }

        const chainHead = filteredStatuses[0].chains[0].chainHeadBlock.number;
        const latestBlock = filteredStatuses[0].chains[0].latestBlock.number;
        const lag = chainHead - latestBlock;

        if (!filteredStatuses[0].synced) {
            return `Syncing... (${lag} blocks to go)`;
        }

        if (filteredStatuses[0].health === "failed") {
            return `Error`;
        }

        if (lag > 2) {
            return `Lagging ${lag} blocks behind`;
        }

        return `Synced`;
    };

    const formatHash = (hash) => {
        return `${hash.substring(0, 4)}...${hash.substring(hash.length - 4)}`;
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

                console.log(data);
                setSubgraphStatuses(data);
            }
        }

        updateSubgraphStatus();
    });

    return (
        <div>
            <h2>Overview</h2>
            <table>
                <thead>
                    <tr>
                        <th>Subgraph Name</th>
                        <th>Subgraph Hash</th>
                        {Meta.nodes.map((e, i) => (
                            <th key={i}>{e.name}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {Meta.subgraphs.map((e, i) => {
                        return (
                            <tr key={i}>
                                <td>{e.name}</td>
                                <td>{formatHash(e.hash)}</td>
                                {Meta.nodes.map((n, j) => {
                                    return (
                                        <td key={j}>
                                            {getStatusOfNodeAndHash(e.hash, j)}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
