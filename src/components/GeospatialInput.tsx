import React from "react";
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import GeometryInputMap, {
  GeospatialInputMapProps,
} from "./GeospatialInputMap.js";
import { InputProps } from "react-admin";

function GeospatialInput(props: GeospatialInputMapProps) {
  return (
    <MapComponentsProvider>
      <GeometryInputMap {...props} />
    </MapComponentsProvider>
  );
}

export default GeospatialInput;
