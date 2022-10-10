const { ApolloClient, InMemoryCache } = require("@apollo/client");

const Meta = {
    nodes: [
        {
            name: "hosted-service",
            indexNode: new ApolloClient({
                uri: "https://api.thegraph.com/index-node/graphql",
                cache: new InMemoryCache(),
            }),
            apiEndpoint: "https://api.thegraph.com",
            default: true,
        },
        {
            name: "dev",
            indexNode: new ApolloClient({
                uri: "http://157.90.182.138:8030/graphql",
                cache: new InMemoryCache(),
            }),
            apiEndpoint: "http://157.90.182.138:8000",
            default: false,
        },
    ],
    subgraphs: [
        {
            name: "aavegotchi/aavegotchi-core-matic",
            hash: "Qmc2ucXbhpDqdrnhFbQRjhYbiEPQWAFWQqu2K84ifh7Pzn",
        },
        {
            name: "aavegotchi/gotchiverse-matic",
            hash: "QmPa3UejFmG8TSM81qUdPjF6sH1hyk2RBQFGk6rG1ZUYZG",
        },
        // { "name": "aavegotchi-gltr-staking", "hash": "" },
        // { "name": "aavegotchi-baazaar-gbm", "hash": "" },
        // { "name": "aavegotchi-realm-matic", "hash": "" },
        // { "name": "aavegotchi-svg", "hash": "" },
        // { "name": "aavegotchi-portal-svgs", "hash": "" },
        // { "name": "aavegotchi-gbm-v2", "hash": "" },
        // { "name": "aavegotchi-gbm-wearables", "hash": "" },
        // { "name": "aavegotchi-matic-raffle", "hash": "" },
        // { "name": "aavegotchi-alchemica", "hash": "" },
        // { "name": "aavegotchi-lending", "hash": "" },
        // { "name": "gotchi-vault", "hash": "" },
        // { "name": "aavegotchi-matic-raffle", "hash": "" }
    ],
};

module.exports = Meta;
