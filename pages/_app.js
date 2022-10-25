import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import "/styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
