// @ts-nocheck
import { ApolloClient, InMemoryCache } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Meta from "../meta/subgraphs";
import { FETCH_SUBGRAPH_STATUSES } from "../utils/queries";
import { SubgraphCard } from "./SubgraphCard";

export function OverviewTable() {
  const showStatus = (s) =>
    !s ? (
      <div>Not deployed on node</div>
    ) : (
      <div>
        {s.health}, {s.lagsBehind} Blocks behind
      </div>
    );

  const [subgraphStatuses, setSubgraphStatuses] = useState(null);

  async function updateSubgraphStatus() {
    if (!subgraphStatuses) {
      const data = await (await fetch("/api/subgraphs")).json();
      console.log(data);
      setSubgraphStatuses(data);
    }
  }

  useEffect(() => {
    setInterval(() => {
      console.log("refresh");
      updateSubgraphStatus();
    }, 5000);
  }, [subgraphStatuses]);

  if (!subgraphStatuses) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Subgraphs & Nodes
          </h2>
        </div>
        <div className="grid grid-cols-2">
          {subgraphStatuses.map((e, i) => (
            <SubgraphCard subgraph={e} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
