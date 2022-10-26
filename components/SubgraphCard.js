import React, { useEffect } from "react";
import { formatHash } from "../utils/format";
import { SubgraphNode } from "./SubgraphNode";

export function SubgraphCard({ subgraph }) {
  return (
    <div className="grid grid-cols-1">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {subgraph.name.split("/")[1]}
        </h5>
      </div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        {subgraph.current.hash && (
          <>
            <div>
              <h6>Current ({formatHash(subgraph.current.hash)})</h6>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">Node name</div>
              <div className="col-span-2">Synced</div>
              <div className="col-span-6">Status</div>
            </div>
            <div>
              {subgraph.current.nodes.map((n, i) => (
                <div key={i}>
                  <SubgraphNode nodeData={n} />
                </div>
              ))}
            </div>
          </>
        )}

        {subgraph.pending.hash && (
          <>
            <div>
              <h6>Pending ({formatHash(subgraph.pending.hash)})</h6>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">Node name</div>
              <div className="col-span-2">Synced</div>
              <div className="col-span-6">Status</div>
            </div>
            <div>
              {subgraph.pending.nodes.map((n, i) => (
                <div key={i}>
                  <SubgraphNode nodeData={n} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
