import React, { useEffect, useState } from "react";
import { formatHash, formatNumber } from "../utils/format";
import { SubgraphNode } from "./SubgraphNode";

export function SubgraphCard({ subgraph }) {
  const [current, setCurrent] = useState(subgraph.current);
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    if (!current) {
      setCurrent(subgraph.current);
    }
  }, [subgraph, current]);

  useEffect(() => {
    if (showPending) {
      setCurrent(subgraph.pending);
    } else {
      setCurrent(subgraph.current);
    }
  }, [showPending, subgraph]);

  const getColor = (lagsBehind) => {
    if (lagsBehind < 5) {
      return "text-teal-600";
    } else if (lagsBehind < 20) {
      return "text-yellow-600";
    }

    return "text-red-600";
  };

  return (
    <div className="wrapperantialiased text-gray-900 mb-10">
      <div className="h-full">
        <div className="relative m-5 h-full">
          <div className="bg-white p-5 rounded-lg shadow-lg h-full">
            <div className="flex items-baseline">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPending(false);
                }}
                className={`${
                  !showPending && `bg-teal-200 animate-pulse `
                } text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide `}
              >
                Current
              </a>
              {
                <div
                  className={`${
                    showPending && `bg-red-200 animate-pulse `
                  } text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide `}
                >
                  {subgraph.pending?.hash && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPending(true);
                      }}
                    >
                      Pending
                    </a>
                  )}
                </div>
              }
            </div>

            <a href={subgraph.github} target="_blank" rel="noreferrer">
              <h2 className="mt-1 text-md font-semibold uppercase leading-tight truncate">
                {subgraph.name.split("/")[1]}
              </h2>
            </a>

            <div className="mt-1">
              {subgraph.entities}
              {current.hash && (
                <span className="text-gray-600 text-sm ">
                  <span className="font-semibold">Hash:</span>{" "}
                  <a
                    href={`https://ipfs.io/ipfs/${current.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-600 text-sm"
                  >
                    {formatHash(current.hash)}
                  </a>
                </span>
              )}
              {current.nodes.length > 0 && current.nodes[0].entityCount && (
                <div className="text-gray-600 text-sm ">
                  <span className="font-semibold">Entities:</span>{" "}
                  {formatNumber(parseInt(current.nodes[0].entityCount), 0)}
                </div>
              )}
            </div>

            {current.nodes.length > 0 && (
              <div className="mt-3">
                <span className="text-gray-600 font-semibold">Nodes</span>
                <div className="float-right">
                  <span className="text-gray-600 font-semibold"> Lag</span>
                </div>
                {current.nodes.map((n, i) => (
                  <div className="text-right" key={i}>
                    <div className="float-left">
                      <a
                        href={`${n.apiEndpoint}/subgraphs/id/${current.hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-600 text-md font-semibold"
                      >
                        {n.name}
                      </a>
                    </div>
                    <div>
                      <span
                        className={`text-sm pl-5 ${getColor(
                          n.lagsBehind
                        )} text-right`}
                      >
                        {formatNumber(n.lagsBehind, 0)}{" "}
                        {n.lagsBehind == 1 ? "block" : "blocks"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {subgraph.projects && subgraph.projects.length > 0 && (
              <div className="mt-3">
                <span className="text-gray-600 font-semibold">Projects</span>
                {subgraph.projects.map((n, i) => (
                  <div className="" key={i}>
                    <a
                      href={`${n.meta.link}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-600 text-md font-semibold"
                    >
                      {n.meta.name}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
