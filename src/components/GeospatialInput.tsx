import React from "react";
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import GeometryInputMap, {
  GeospatialInputMapProps,
} from "./GeospatialInputMap.js";

function GeospatialInput(props: GeospatialInputMapProps) {
  return (
    <>
      {props.embeddedMap ? (
        <MapComponentsProvider>
          <GeometryInputMap {...props} />
        </MapComponentsProvider>
      ) : (
        <GeometryInputMap {...props} />
      )}
    </>
  );
}
GeospatialInput.defaultProps = {
  embeddedMap: true,
};

export default GeospatialInput;
