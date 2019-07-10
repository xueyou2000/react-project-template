import React from "react";
import "./index.scss";
import Configs from "./config";
import Exception from "./index";

const config = Configs[404];

export default () => <Exception style={{ height: 500 }} title={config.title} desc={config.desc} img={config.img} />;
