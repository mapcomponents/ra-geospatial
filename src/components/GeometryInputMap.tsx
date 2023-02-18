import React, {useContext, useEffect, useRef, useState} from "react";
import {InputProps, useInput, useRecordContext} from "react-admin";
import  {stringify as wellknownStringify, parse as wellknownParse, GeoJSONGeometry, GeoJSONFeature, GeoJSONPoint } from "wellknown";
import {useMap, MapLibreMap, MlFeatureEditor, MlGeoJsonLayer} from "@mapcomponents/react-maplibre";
import { LngLatLike } from "maplibre-gl";
import {feature} from "@turf/turf";

function GeometryInputMap(props:InputProps<any>) {
    const source = props.source;
    const record = useRecordContext();
    const mapHook = useMap();

    const [geojson, setGeojson] = useState<typeof feature>();
    const [oldGeoJson, setOldGeoJson] = useState<typeof feature>();
    const {
        field: {name, onChange, ...rest},
        fieldState,
        formState,
        isRequired
    } = useInput(props);

    useEffect(() => {
        if (typeof record === 'undefined' || !record[source]) return;

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

        if (typeof record !== 'undefined' && record[source]) {
            mapHook.map.setCenter((wellknownParse(record[source]) as unknown as GeoJSONPoint)?.coordinates as LngLatLike);
        }
    }, [mapHook.map]);

    return (
        <>
            <MapLibreMap
                options={{
                    zoom: 14.5,
                    style: "https://wms.wheregroup.com/tileserver/style/klokantech-basic.json",
                    center: [7.0851268, 50.73884],
                }}
            />

            {oldGeoJson &&
                <MlGeoJsonLayer
                    geojson={oldGeoJson as typeof feature}
                    paint={{
                        'circle-radius': 8,
                        'circle-color': '#6f6f96',
                        'circle-stroke-color': 'white',
                        'circle-stroke-width': 3,
                        'circle-opacity': 0.8
                    }}
                    type="circle"
                    
                />
            }

            <MlFeatureEditor
                geojson={geojson as typeof feature}
                mode={geojson ? "custom_select" : "draw_point"}
                onChange={(_geojson) => {
                    console.log(_geojson);
                    if (typeof _geojson[0] !== 'undefined') {
                        onChange(wellknownStringify(_geojson[0] as GeoJSONGeometry))
                    }
                }}
            />

        </>
    )
}

export default GeometryInputMap
