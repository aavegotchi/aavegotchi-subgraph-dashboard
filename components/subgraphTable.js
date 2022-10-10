import React from "react";

export function SubgraphTable({ title }) {
    return (
        <div>
            <h2>{title}</h2>
            <table>
                <thead>
                    <th>Endpoint</th>
                    <th>Entities</th>
                    <th>Synced</th>
                </thead>
                <tr>
                    <td>https://api...</td>
                    <td>5000</td>
                    <td>309/310</td>
                </tr>
            </table>
        </div>
    );
}
