import React, { useEffect } from "react";

export function SubgraphCard({ subgraph }) {
  useEffect(() => {
    console.log(subgraph);
  });

  return (
    <>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {subgraph.name}
      </h5>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id={"versionTab-" + subgraph.name.split("/")[1]}
          data-tabs-toggle={"#versionTabContent-" + subgraph.name.split("/")[1]}
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-4 rounded-t-lg border-b-2"
              id={"current-tab-" + subgraph.current.hash}
              data-tabs-target={"#current-" + subgraph.current.hash}
              type="button"
              role="tab"
              aria-controls="current"
              aria-selected="false"
            >
              Current
            </button>
          </li>
          {/* {subgraph.pending.hash && ( */}
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-4 rounded-t-lg border-b-2 border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id={"pending-tab-" + subgraph.pending.hash}
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              // disabled
              aria-selected="false"
            >
              Pending
            </button>
          </li>
          {/* )} */}
        </ul>
      </div>
      <div id={"versionTabContent-" + subgraph.name.split("/")[1]}>
        <div
          className=" p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
          id={"current-" + subgraph.current.hash}
          role="tabpanel"
          aria-labelledby="current-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
          id={"pending-" + subgraph.name}
          role="tabpanel"
          aria-labelledby="pending-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </p>
        </div>
      </div>
    </>
  );
}
