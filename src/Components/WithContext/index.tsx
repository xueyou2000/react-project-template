import React from "react";
import { diContext } from "@/WebApplication/DIContext";

export default function withContext(Component: React.ComponentType<any>) {
    return (props: any) => <Component {...props} {...diContext} />;
}
