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
    await fetch("/api/subgraphs", myInit)
      .then((e) => e.json())
      .then((e) => {
        setSubgraphStatuses(e);
        setUpdating(false);
      });
  }

  if (!subgraphStatuses || subgraphStatuses.length == 0) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">
          Loading...
        </h2>
        <p className="w-1/3 text-center text-white">
          This may take a few seconds, please don't close this page.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 flex items-stretch">
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {subgraphStatuses.map((e, i) => (
            <SubgraphCard subgraph={e} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
