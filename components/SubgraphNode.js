import { Button, Tooltip } from "@material-tailwind/react";
import React from "react";

export function getStatus(lagsBehind) {
  if (lagsBehind < 6) {
    return "🟢";
  } else if (lagsBehind < 50) {
    return "🟡";
  } else {
    return "🔴";
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
  console.log(nodeData);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Button className="text-black bg-white pt-0 mt-0" variant="text">
            {nodeData.name}
          </Button>
        </div>
        <div>
          <Button className="text-black bg-white pt-0" variant="text">
            {getSyncStatus(nodeData.synced)}
          </Button>
        </div>
        <div>
          <Tooltip
            className="text-black text-right mt-0 pt-0"
            content={nodeData.lagsBehind + " blocks behind"}
          >
            <Button className="text-black bg-white pt-0 mt-0" variant="text">
              {getStatus(nodeData.lagsBehind)}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
