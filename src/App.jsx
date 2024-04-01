import React, { useRef, useEffect, useState } from "react";

import WebScene from "@arcgis/core/WebScene.js";
import SceneView from "@arcgis/core/views/SceneView.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";

import { ActionBar } from "./components/ActionBar.jsx";

import "@esri/calcite-components/dist/components/calcite-panel.js";
import "@esri/calcite-components/dist/components/calcite-shell.js";
import "@esri/calcite-components/dist/components/calcite-shell-panel.js";
import {
  CalciteShell,
  CalcitePanel,
  CalciteShellPanel,
} from "@esri/calcite-components-react";

import "./App.css";

function App() {
  const mapDiv = useRef(null);

  const [view, setView] = useState(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */

      const webscene = new WebScene({
        portalItem: {
          id: "92d29869db444e28beab584f696b86c3",
        },
      });

      const view = new SceneView({
        container: mapDiv.current,
        map: webscene,
      });

      setView(view);

      view.when(() => {
        console.log("View loaded");

        new LayerList({
          view,
          container: "layers-container",
        });
      });

      // Temporary workaround
      // return () => {
      //   if (view) {
      //     view.destroy();
      //   }
      // };
    }
  }, [mapDiv]);

  return (
    <CalciteShell content-behind id="calcite-shell">
      <CalciteShellPanel slot="panel-start" displayMode="float">
        <ActionBar view={view} />
        <CalcitePanel
          heading="Layers"
          height-scale="l"
          data-panel-id="layers"
          hidden
        >
          <div id="layers-container"></div>
        </CalcitePanel>
      </CalciteShellPanel>
      <div className="mapDiv" ref={mapDiv}></div>
    </CalciteShell>
  );
}

export default App;
