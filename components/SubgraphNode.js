import { Button, Tooltip } from "@material-tailwind/react";
import React from "react";

export function getStatus(lagsBehind) {
  if (lagsBehind < 6) {
    return "🟢 (lag: " + lagsBehind + " block(s))";
  } else if (lagsBehind < 50) {
    return "🟡 (lag: " + lagsBehind + " block(s))";
  } else {
    return "🔴 (lag: " + lagsBehind + " block(s))";
  }
}

export function getSyncStatus(synced) {
  if (synced) {
    return "✅";
  } else {
    return "❌";
  }
}

export function SubgraphNode({ nodeData }) {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <a
            href={
              nodeData.apiEndpoint + "/subgraphs/id/" + nodeData.subgraphHash
            }
            target="_blank"
          >
            <Button className="text-black bg-white pt-0 mt-0" variant="text">
              {nodeData.name}
            </Button>
          </a>
        </div>
        <div className="col-span-2">
          <Button className="text-black bg-white pt-0" variant="text">
            {getSyncStatus(nodeData.synced)}
          </Button>
        </div>
        <div className="col-span-6">
          <Button className="text-black bg-white pt-0 mt-0" variant="text">
            {getStatus(nodeData.lagsBehind)}
          </Button>
        </div>
      </div>
    </div>
  );
}
