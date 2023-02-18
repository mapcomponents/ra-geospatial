import React, { useEffect, useState } from "react";
import { InputProps, useRecordContext } from "react-admin";
import { parse as wellknownParse, GeoJSONPoint } from "wellknown";
import {
  MapLibreMap,
  MlGeoJsonLayer,
  useMap,
} from "@mapcomponents/react-maplibre";
import { LngLatLike } from "maplibre-gl";
import { feature } from "@turf/turf";

function GeometryShowMap(props: InputProps<any>) {
  const source = props.source;
  const record = useRecordContext();
  const mapHook = useMap();

  const [geojson, setGeojson] = useState<typeof feature>();
  useEffect(() => {
    if (typeof record === "undefined") return;

    setGeojson({
      type: "Feature",
      properties: {},
      geometry: wellknownParse(record[source]),
    } as unknown as typeof feature);
    //console.log(record)
    //onChange({target:{value:"POINT(7.083199846086359 50.73716918021759)"}});
  }, [record]);

  useEffect(() => {
    if (!mapHook.map) return;

    mapHook.map.setCenter(
      (wellknownParse(record[source]) as unknown as GeoJSONPoint)
        ?.coordinates as LngLatLike
    );
  }, [mapHook.map]);

  return (
    <>
      <MapLibreMap
        options={{
          zoom: 14.5,
          style:
            "https://wms.wheregroup.com/tileserver/style/klokantech-basic.json",
          center: [0, 0],
        }}
      />

      {geojson && (
        <MlGeoJsonLayer
          geojson={geojson}
          paint={{
            "circle-radius": 8,
            "circle-color": "#0000ff",
            "circle-stroke-color": "white",
            "circle-stroke-width": 3,
            "circle-opacity": 0.8,
          }}
          type="circle"
        ></MlGeoJsonLayer>
      )}
    </>
  );
}

export default GeometryShowMap;
