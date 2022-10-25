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

  useEffect(() => {
    async function updateSubgraphStatus() {
      if (!subgraphStatuses) {
        const data = await (await fetch("/api/subgraphs")).json();
        setSubgraphStatuses(data);
      }
    }

    updateSubgraphStatus();
  });

  if (!subgraphStatuses) {
    return <div>Loading...</div>;
  }

  return (
    <div class="container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <div>
          <h2 class="text-2xl font-semibold leading-tight">
            Subgraphs & Nodes
          </h2>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <SubgraphCard />

          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subgraph Name
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subgraph Hash
                  </th>
                  {subgraphStatuses[0].nodes.map((n) => (
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {n.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subgraphStatuses.map((s) => {
                  return (
                    <tr>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap text-center">
                          {s.name}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap text-center">
                          {s.hash}
                        </p>
                      </td>
                      {s.nodes.map((n) => (
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap text-center">
                            {showStatus(n.status)}
                          </p>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
