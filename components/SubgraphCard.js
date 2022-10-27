import React, { useEffect } from "react";
import { formatHash } from "../utils/format";
import { SubgraphNode } from "./SubgraphNode";

export function SubgraphCard({ subgraph }) {
  console.log(subgraph);
  return (
    <div className="wrapperantialiased text-gray-900 ">
      <div>
        <div className="relative px-4 mt-16 ">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                Current
              </span>
              <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                Pending
              </div>
            </div>

            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
              {subgraph.name.split("/")[1]}
            </h4>

            <div className="mt-1">
              {subgraph.entities}
              <span className="text-gray-600 text-sm"> /entities</span>
            </div>
            {subgraph.current.nodes.map((n, i) => (
              <div className="mt-4" key={i}>
                <a
                  href={`${n.apiEndpoint}/subgraphs/id/${subgraph.current.hash}`}
                  target="_blank"
                  className="text-teal-600 text-md font-semibold"
                >
                  {n.name}
                </a>
                <span className="text-sm pl-5 text-gray-600">
                  {n.lagsBehind} block(s) behind
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="grid grid-cols-1">
      <div>
        <h3 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
          {subgraph.name.split("/")[1]}
        </h3>
      </div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        {subgraph.current.hash && (
          <>
            <div>
              <a
                href={`https://ipfs.io/ipfs/${subgraph.current.hash}`}
                target="_blank"
              >
                <h4>Current ({formatHash(subgraph.current.hash)})</h4>
              </a>
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
            <a
              href={`https://ipfs.io/ipfs/${subgraph.pending.hash}`}
              target="_blank"
            >
              <h4>Pending ({formatHash(subgraph.pending.hash)})</h4>
            </a>
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

        {subgraph.projects && (
          <>
            <div>
              <h4>Projects</h4>
              <ul>
                {subgraph.projects.map((p) => (
                  <li>
                    <a href={p.meta.link} target="_blank">
                      {p.meta.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
