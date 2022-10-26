import React, { useEffect, useState } from "react";
import { SubgraphCard } from "./SubgraphCard";

export function OverviewTable() {
  const [updating, setUpdating] = useState(false);
  const [subgraphStatuses, setSubgraphStatuses] = useState([]);

  useEffect(() => {
    let interval = setInterval(async () => {
      if (updating) return;
      setUpdating(true);
      updateSubgraphStatus();
    }, 5000);
    //destroy interval on unmount
    return () => clearInterval(interval);
  });

  async function updateSubgraphStatus() {
    const myHeaders = new Headers();
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("cache-control", "no-cache");

    const myInit = {
      method: "GET",
      headers: myHeaders,
    };
    await fetch("http://localhost:3000/api/subgraphs", myInit)
      .then((e) => e.json())
      .then((e) => {
        setSubgraphStatuses(e);
        setUpdating(false);
      });
  }

  if (!subgraphStatuses || subgraphStatuses.length == 0) {
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
