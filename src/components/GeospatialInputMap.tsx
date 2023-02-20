import React, { useContext, useEffect, useRef, useState } from "react";
import { InputProps, useInput, useRecordContext } from "react-admin";
import {
  stringify as wellknownStringify,
  parse as wellknownParse,
  GeoJSONGeometry,
  GeoJSONFeature,
  GeoJSONPoint,
} from "wellknown";
import {
  useMap,
  MapLibreMap,
  MlFeatureEditor,
  MlGeoJsonLayer,
} from "@mapcomponents/react-maplibre";
import { LngLatLike } from "maplibre-gl";
import { feature, centroid } from "@turf/turf";
import { Feature } from "@turf/helpers";

export interface GeospatialInputMapProps extends InputProps<any> {
  MapLibreMapProps?: React.ComponentProps<typeof MapLibreMap>;
  geometrytype?: "point" | "line" | "polygon";
  embeddedMap?: boolean;
  mapId?: string;
}

function GeospatialInputMap(props: GeospatialInputMapProps) {
  const source = props?.source;
  const record = useRecordContext();
  const mapHook = useMap({mapId:props?.mapId});

  const [geojson, setGeojson] = useState<typeof feature>();
  const [oldGeoJson, setOldGeoJson] = useState<typeof feature>();
  const {
    field: { name, onChange, ...rest },
    fieldState,
    formState,
    isRequired,
  } = useInput(props);

  useEffect(() => {
    if (typeof record === "undefined" || !record[source]) return;

    let _geoJson = {
      type: "Feature",
      properties: {},
      geometry: wellknownParse(record[source]),
    };

    setGeojson(_geoJson as unknown as typeof feature);
    setOldGeoJson(_geoJson as unknown as typeof feature);
  }, [record, props.source]);

  useEffect(() => {
    if (!mapHook.map) return;

    if (typeof record !== "undefined" && record[source]) {
      const _center = centroid(
        wellknownParse(record[source]) as typeof Feature
      );

      if (_center?.geometry?.coordinates) {
        mapHook.map.setCenter(_center.geometry.coordinates as LngLatLike);
      }
    }
  }, [mapHook.map]);

  return (
    <>
      {props.embeddedMap && (
        <MapLibreMap
          {...props?.MapLibreMapProps}
          options={{
            zoom: 14,
            style:
              "https://wms.wheregroup.com/tileserver/style/klokantech-basic.json",
            center: [0, 0],
            ...props?.MapLibreMapProps?.options,
          }}
          style={{
            width: "100%",
            height: "400px",
            ...props?.MapLibreMapProps?.style,
          }}
        />
      )}

      {props.type === "point" && (
        <>
          {oldGeoJson && (
            <MlGeoJsonLayer
              mapId={props?.mapId}
              geojson={oldGeoJson as typeof feature}
              paint={{
                "circle-radius": 8,
                "circle-color": "#6f6f96",
                "circle-stroke-color": "white",
                "circle-stroke-width": 3,
                "circle-opacity": 0.8,
              }}
              type="circle"
              insertBeforeLayer="gl-draw-polygon-fill-inactive.cold"
            />
          )}

          <MlFeatureEditor
            mapId={props?.mapId}
            geojson={geojson as typeof feature}
            mode={geojson ? "custom_select" : "draw_point"}
            onChange={(_geojson) => {
              if (typeof _geojson[0] !== "undefined") {
                onChange(wellknownStringify(_geojson[0] as GeoJSONGeometry));
              }
            }}
          />
        </>
      )}
      {props.type === "polygon" && (
        <>
          {oldGeoJson && (
            <MlGeoJsonLayer
              mapId={props?.mapId}
              geojson={oldGeoJson as typeof feature}
              paint={{
                "fill-color": "#6f6f96",
                "fill-opacity": 0.6,
              }}
              type="fill"
              insertBeforeLayer="gl-draw-polygon-fill-inactive.cold"
            />
          )}

          <MlFeatureEditor
            mapId={props?.mapId}
            geojson={geojson as typeof feature}
            mode={geojson ? "custom_select" : "draw_polygon"}
            onChange={(_geojson) => {
              if (typeof _geojson[0] !== "undefined") {
                onChange(wellknownStringify(_geojson[0] as GeoJSONGeometry));
              }
            }}
          />
        </>
      )}
      {props.type === "line" && (
        <>
          {oldGeoJson && (
            <MlGeoJsonLayer
              mapId={props?.mapId}
              geojson={oldGeoJson as typeof feature}
              paint={{
                "line-width": 6,
                "line-color": "#6f6f96",
                "line-opacity": 0.6,
              }}
              type="line"
              insertBeforeLayer="gl-draw-polygon-fill-inactive.cold"
            />
          )}

          <MlFeatureEditor
            mapId={props?.mapId}
            geojson={geojson as typeof feature}
            mode={geojson ? "custom_select" : "draw_line_string"}
            onChange={(_geojson) => {
              if (typeof _geojson[0] !== "undefined") {
                onChange(wellknownStringify(_geojson[0] as GeoJSONGeometry));
              }
            }}
          />
        </>
      )}
    </>
  );
}

GeospatialInputMap.defaultProps = {
  type: "point",
  embeddedMap: true,
};

export default GeospatialInputMap;
