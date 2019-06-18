import Application from "@/Stores/Application";
import React, { useEffect, useRef } from "react";
import { RouteConfig } from "react-router-config";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { PageTransition } from "xy-page-transition";
import { RedirectPath } from "./RoutesConfig";

export interface ApplicationRootProps extends RouteComponentProps {
    routes?: RouteConfig[];
}

function ApplicationRoot({ routes, location, history }: ApplicationRootProps) {
    const applicationRef = useRef(new Application(history));

    useEffect(() => {
        applicationRef.current.onRouterChange(location.pathname);
    }, [location.pathname]);

    return (
        <PageTransition timeout={1000} disabled={!["/", RedirectPath].some((x) => x === location.pathname)}>
            <Switch location={location} key={location.key}>
                {routes.map((config, i) => {
                    const RouteComponent = config.route || Route;
                    return <RouteComponent key={i} {...config} />;
                })}
            </Switch>
        </PageTransition>
    );
}

export default React.memo(withRouter(ApplicationRoot));
