import React, { useState } from "react";

import "@esri/calcite-components/dist/components/calcite-action-bar.js";
import "@esri/calcite-components/dist/components/calcite-action.js";
import { CalciteActionBar, CalciteAction } from "@esri/calcite-components-react";

export const ActionBar = ({ view }) => {
  const [actionbar, setActionbar] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);

  const handleActionBarClick = (e) => {
    if (e.target.tagName !== "CALCITE-ACTION") {
      return;
    }

    if (activeWidget) {
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
      document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
    }

    const nextWidget = e.target.dataset.actionId;
    if (nextWidget !== activeWidget) {
      document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
      document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
      setActiveWidget(nextWidget);
    } else {
      setActiveWidget(null);
    }
  };

  const handleActionBarToggle = () => {
    setActionbar(!actionbar);
    view.padding = { left: actionbar ? 135 : 49 };
  };

  return (
    <CalciteActionBar
      slot="action-bar"
      class="responsive-action-bar"
      onCalciteActionBarToggle={handleActionBarToggle}
      onClick={handleActionBarClick}
    >
      <CalciteAction data-action-id="layers" icon="layers" text="Layers" scale="l"></CalciteAction>
    </CalciteActionBar>
  );
};
