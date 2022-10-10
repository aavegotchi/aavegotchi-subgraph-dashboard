import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { OverviewTable } from "../components/overviewTable";
import { SubgraphTable } from "../components/subgraphTable";
import styles from "../styles/Home.module.css";
import { getSubgraphClients } from "../utils/graphql";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Aavegotchi Subgraph Dashboard</title>
                <meta
                    name="description"
                    content="A Dashboard for the Aavegotchi Subgraphs"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className="text-3xl font-bold underline">
                    Aavegotchi Subgraph Dashboard
                </h1>

                <p className={styles.description}>
                    This page shows which subgraphs Aavegotchi provide, where
                    they are deployed and its current state.
                </p>
                <OverviewTable />
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/aavegotchi/aavegotchi-subgraph-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </footer>
        </div>
    );
}
