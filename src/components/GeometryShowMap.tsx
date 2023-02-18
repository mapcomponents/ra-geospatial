import React, { useEffect, useState } from "react";
import { InputProps, useRecordContext } from "react-admin";
import { parse as wellknownParse, GeoJSONPoint } from "wellknown";
import {
  MapLibreMap,
  MlGeoJsonLayer,
  useMap,
} from "@mapcomponents/react-maplibre";
import { LngLatLike } from "maplibre-gl";
import { feature, centroid } from "@turf/turf";
import { Feature } from "@turf/helpers";

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

    const _center = centroid(wellknownParse(record[source]) as typeof Feature);

    if (_center?.geometry?.coordinates) {
      mapHook.map.setCenter(_center.geometry.coordinates as LngLatLike);
    }
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
        style={{ width: "100%", height: "400px" }}
      />

      {geojson && <MlGeoJsonLayer geojson={geojson}></MlGeoJsonLayer>}
    </>
  );
}

export default GeometryShowMap;
