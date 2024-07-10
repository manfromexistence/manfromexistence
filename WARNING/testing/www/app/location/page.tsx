/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import CountryState from "@/widgets/country-state";

const Home = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <CountryState />
        </main>
    );
};

export default Home;
