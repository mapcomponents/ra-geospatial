import React, { useState, useEffect } from 'react';
import { useMap, MapLibreMap, MlGeoJsonLayer, MlFeatureEditor, MapComponentsProvider } from '@mapcomponents/react-maplibre';
import { useRecordContext, useInput } from 'react-admin';
import { parse, stringify } from 'wellknown';
import { centroid } from '@turf/turf';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function GeospatialInputMap(props) {
    var _a, _b;
    const source = props === null || props === void 0 ? void 0 : props.source;
    const record = useRecordContext();
    const mapHook = useMap({ mapId: props === null || props === void 0 ? void 0 : props.mapId });
    const [geojson, setGeojson] = useState();
    const [oldGeoJson, setOldGeoJson] = useState();
    const _c = useInput(props), _d = _c.field, { name, onChange } = _d; __rest(_d, ["name", "onChange"]);
    useEffect(() => {
        if (typeof record === "undefined" || !record[source])
            return;
        let _geoJson = {
            type: "Feature",
            properties: {},
            geometry: parse(record[source]),
        };
        setGeojson(_geoJson);
        setOldGeoJson(_geoJson);
    }, [record, props.source]);
    useEffect(() => {
        var _a;
        if (!mapHook.map)
            return;
        if (typeof record !== "undefined" && record[source]) {
            const _center = centroid(parse(record[source]));
            if ((_a = _center === null || _center === void 0 ? void 0 : _center.geometry) === null || _a === void 0 ? void 0 : _a.coordinates) {
                mapHook.map.setCenter(_center.geometry.coordinates);
            }
        }
    }, [mapHook.map]);
    return (React.createElement(React.Fragment, null,
        props.embeddedMap && (React.createElement(MapLibreMap, Object.assign({}, props === null || props === void 0 ? void 0 : props.MapLibreMapProps, { options: Object.assign({ zoom: 14, style: "https://wms.wheregroup.com/tileserver/style/klokantech-basic.json", center: [0, 0] }, (_a = props === null || props === void 0 ? void 0 : props.MapLibreMapProps) === null || _a === void 0 ? void 0 : _a.options), style: Object.assign({ width: "100%", height: "400px" }, (_b = props === null || props === void 0 ? void 0 : props.MapLibreMapProps) === null || _b === void 0 ? void 0 : _b.style) }))),
        props.type === "point" && (React.createElement(React.Fragment, null,
            oldGeoJson && (React.createElement(MlGeoJsonLayer, { mapId: props === null || props === void 0 ? void 0 : props.mapId, geojson: oldGeoJson, paint: {
                    "circle-radius": 8,
                    "circle-color": "#6f6f96",
                    "circle-stroke-color": "white",
                    "circle-stroke-width": 3,
                    "circle-opacity": 0.8,
                }, type: "circle", insertBeforeLayer: "gl-draw-polygon-fill-inactive.cold" })),
            React.createElement(MlFeatureEditor, { mapId: props === null || props === void 0 ? void 0 : props.mapId, geojson: geojson, mode: geojson ? "custom_select" : "draw_point", onChange: (_geojson) => {
                    if (typeof _geojson[0] !== "undefined") {
                        onChange(stringify(_geojson[0]));
                    }
                } }))),
        props.type === "polygon" && (React.createElement(React.Fragment, null,
            oldGeoJson && (React.createElement(MlGeoJsonLayer, { mapId: props === null || props === void 0 ? void 0 : props.mapId, geojson: oldGeoJson, paint: {
                    "fill-color": "#6f6f96",
                    "fill-opacity": 0.6,
                }, type: "fill", insertBeforeLayer: "gl-draw-polygon-fill-inactive.cold" })),
            React.createElement(MlFeatureEditor, { mapId: props === null || props === void 0 ? void 0 : props.mapId, geojson: geojson, mode: geojson ? "custom_select" : "draw_polygon", onChange: (_geojson) => {
                    if (typeof _geojson[0] !== "undefined") {
                        onChange(stringify(_geojson[0]));
                    }
                } }))),
        props.type === "line" && (React.createElement(React.Fragment, null,
            oldGeoJson && (React.createElement(MlGeoJsonLayer, { mapId: props === null || props === void 0 ? void 0 : props.mapId, geojson: oldGeoJson, paint: {
                    "line-width": 6,
                    "line-color": "#6f6f96",
                    "line-opacity": 0.6,
                }, type: "line", insertBeforeLayer: "gl-draw-polygon-fill-inactive.cold" })),
            React.createElement(MlFeatureEditor, { mapId: props === null || props === void 0 ? void 0 : props.mapId, geojson: geojson, mode: geojson ? "custom_select" : "draw_line_string", onChange: (_geojson) => {
                    if (typeof _geojson[0] !== "undefined") {
                        onChange(stringify(_geojson[0]));
                    }
                } })))));
}
GeospatialInputMap.defaultProps = {
    type: "point",
    embeddedMap: true,
};

function GeospatialInput(props) {
    return (React.createElement(React.Fragment, null, props.embeddedMap ? (React.createElement(MapComponentsProvider, null,
        React.createElement(GeospatialInputMap, Object.assign({}, props)))) : (React.createElement(GeospatialInputMap, Object.assign({}, props)))));
}
GeospatialInput.defaultProps = {
    embeddedMap: true,
};

function GeospatialShowMap(props) {
    var _a, _b;
    const source = props.source;
    const record = useRecordContext();
    const mapHook = useMap();
    const [geojson, setGeojson] = useState();
    useEffect(() => {
        if (!(record === null || record === void 0 ? void 0 : record[source]))
            return;
        const _geometry = parse(record[source]);
        if (_geometry) {
            setGeojson({
                type: "Feature",
                properties: {},
                geometry: _geometry,
            });
        }
    }, [record]);
    useEffect(() => {
        var _a;
        if (!mapHook.map || !geojson)
            return;
        const _center = centroid(geojson);
        if ((_a = _center === null || _center === void 0 ? void 0 : _center.geometry) === null || _a === void 0 ? void 0 : _a.coordinates) {
            mapHook.map.setCenter(_center.geometry.coordinates);
        }
    }, [mapHook.map, geojson]);
    return (React.createElement(React.Fragment, null,
        props.embeddedMap && (React.createElement(MapLibreMap, Object.assign({}, props === null || props === void 0 ? void 0 : props.MapLibreMapProps, { options: Object.assign({ zoom: 14, style: "https://wms.wheregroup.com/tileserver/style/klokantech-basic.json", center: [0, 0] }, (_a = props === null || props === void 0 ? void 0 : props.MapLibreMapProps) === null || _a === void 0 ? void 0 : _a.options), style: Object.assign({ width: "100%", height: "400px" }, (_b = props === null || props === void 0 ? void 0 : props.MapLibreMapProps) === null || _b === void 0 ? void 0 : _b.style) }))),
        geojson && React.createElement(MlGeoJsonLayer, { geojson: geojson })));
}

function GeospatialShow(props) {
    return (React.createElement(React.Fragment, null, props.embeddedMap ? (React.createElement(MapComponentsProvider, null,
        React.createElement(GeospatialShowMap, Object.assign({}, props)))) : (React.createElement(GeospatialShowMap, Object.assign({}, props)))));
}
GeospatialShow.defaultProps = {
    embeddedMap: true,
};

export { GeospatialInput as RaGeospatialInput, GeospatialShow as RaGeospatialShow };
//# sourceMappingURL=index.esm.js.map
