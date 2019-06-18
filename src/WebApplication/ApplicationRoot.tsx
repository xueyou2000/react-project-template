import Application from "@/Stores/Application";
import React, { useEffect, useRef } from "react";
import { RouteConfig } from "react-router-config";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { PageTransition } from "xy-page-transition";

export interface ApplicationRootProps extends RouteComponentProps {
    routes?: RouteConfig[];
}

function ApplicationRoot({ routes, location, history }: ApplicationRootProps) {
    const applicationRef = useRef(new Application(history));

    useEffect(() => {
        applicationRef.current.onRouterChange(location.pathname);
    }, [location.pathname]);

    return (
        <PageTransition timeout={300}>
            <Switch location={location}>
                {routes.map((config, i) => {
                    const RouteComponent = config.route || Route;
                    return <RouteComponent key={i} {...config} />;
                })}
            </Switch>
        </PageTransition>
    );
}

export default withRouter(ApplicationRoot);
