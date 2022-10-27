import React, { useEffect, useState } from "react";
import DashboardNavBar from "../components/navbar";
import { OverviewTable } from "../components/overviewTable";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className=" bg-gray-600">
      <div className="flex flex-col items-stretch justify-around gap-4 w-full h-full text-black py-4">
        <OverviewTable />
      </div>
    </div>
  );
}
