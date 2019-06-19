import "@/Assets/Styles/base.scss";
import "@/Assets/Styles/index.scss";
import "@/Assets/Styles/global.scss";
import "@/Assets/Styles/overrite.scss";

import { RootRoutesConfig } from "@/WebApplication/RoutesConfig";
// import * as Sentry from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ApplicationRoot from "./ApplicationRoot";
import Environment from "./Environment";

// Sentry.init({ dsn: "https://6d7d4d0ae57b4518a3cda02f64cfe6b5@sentry.io/1483300" });

ReactDOM.render(
    <BrowserRouter basename={Environment.baseurl}>
        <ApplicationRoot routes={RootRoutesConfig} />
    </BrowserRouter>,
    document.getElementById("root")
);
