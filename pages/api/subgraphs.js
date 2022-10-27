import { Meta } from "../../meta/subgraphs";

import {
  FETCH_CURRENT_SUBGRAPH,
  FETCH_SUBGRAPH_STATUSES,
} from "../../utils/queries";

async function fetchCurrentHash(node, subgraphName) {
  const { data } = await node.query({
    query: FETCH_CURRENT_SUBGRAPH,
    variables: {
      subgraphName: subgraphName,
    },
  });

  return {
    current: data.indexingStatusForCurrentVersion?.subgraph,
    pending: data.indexingStatusForPendingVersion?.subgraph,
  };
}

async function fetchAll() {
  const defaultNode = Meta.nodes.filter((e) => e.default)[0];

  // fetch latest subgraph hashes
  const subgraphs = await Promise.all(
    Meta.subgraphs.map((e, i) => {
      return fetchCurrentHash(defaultNode.indexNode, e.name).then((r) => ({
        name: e.name,
        current: r.current,
        pending: r.pending,
        projects: e.projects,
      }));
    })
  );

  const hashes = subgraphs
    .map((a) => [a.current, a.pending])
    .reduce((a, b) => {
      return a.concat(b);
    })
    .filter((f) => f != undefined && f != null);

  // fetch state of subgraphs at nodes
  const fetchSubgraphStatusesOf = async (node) => {
    const { data } = await node.query({
      query: FETCH_SUBGRAPH_STATUSES,
      variables: {
        subgraphs: hashes,
      },
    });

    return data.indexingStatuses.map((s) => ({
      subgraphName: subgraphs.filter(
        (e) => s.subgraph == e.current || s.subgraph == e.pending
      )[0].name,
      subgraphHash: s.subgraph,
      synced: s.synced,
      health: s.health,
      fatalError: s.fatalError,
      nonFatalErrors: s.nonFatalErrors,
      chainHeadBlock: s.chains[0].chainHeadBlock.number,
      latestBlock: s.chains[0].latestBlock.number,
      lagsBehind:
        s.chains[0].chainHeadBlock.number - s.chains[0].latestBlock.number,
      entityCount: s.entityCount,
      projects: s.projects,
    }));
  };

  const subgraphStatesOfNodes = await Promise.all(
    Meta.nodes.map((e) =>
      fetchSubgraphStatusesOf(e.indexNode).then((subgraphs) => ({
        node: e.name,
        apiEndpoint: e.apiEndpoint,
        entities: e.entityCount,
        subgraphs,
      }))
    )
  );

  let formattedSubgraphs = subgraphs.map((s) => {
    return {
      name: s.name,
      projects: s.projects,
      current: {
        hash: s.current,
        nodes: subgraphStatesOfNodes
          .map((e) => {
            let results = e.subgraphs.filter(
              (ns) => ns.subgraphHash == s.current
            );

            if (results.length === 0) {
              return null;
            }

            return {
              name: e.node,
              ...results[0],
              apiEndpoint: e.apiEndpoint,
              entities: e.entities,
            };
          })
          .filter((f) => f !== null),
      },
      pending: {
        hash: s.pending,
        nodes: subgraphStatesOfNodes
          .map((e) => {
            let results = e.subgraphs.filter(
              (ns) => ns.subgraphHash == s.pending
            );

            if (results.length === 0) {
              return null;
            }

            return {
              name: e.node,
              ...results[0],
              apiEndpoint: e.apiEndpoint,
              entities: e.entities,
            };
          })
          .filter((f) => f !== null),
      },
    };
  });

  return formattedSubgraphs;
}

export default async (req, res) => {
  const result = await fetchAll();

  res.status(200).json(result);
};
