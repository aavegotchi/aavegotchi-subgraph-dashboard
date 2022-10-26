import React, { useEffect } from "react";
import { formatHash } from "../utils/format";
import { SubgraphNode } from "./SubgraphNode";

export function SubgraphCard({ subgraph }) {
  useEffect(() => {
    console.log(subgraph);
  });

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
            <div className="grid grid-cols-4 gap-4">
              <div>Node name</div>
              <div>Synced</div>
              <div>Status</div>
            </div>
            <div>
              {subgraph.current.nodes.map((n, i) => (
                <div>
                  <SubgraphNode nodeData={n} key={i} />
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
            <div className="grid grid-cols-4 gap-4">
              <div>Node name</div>
              <div>Synced</div>
              <div>Status</div>
            </div>
            <div>
              {subgraph.pending.nodes.map((n, i) => (
                <div>
                  <SubgraphNode nodeData={n} key={i} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
