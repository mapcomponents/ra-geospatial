import React from "react"
import {MapComponentsProvider} from "@mapcomponents/react-maplibre";
import GeometryShowMap from "./GeometryShowMap.js";
import { InputProps } from "react-admin";

function GeometryShow(props:InputProps<any>) {
    return (
        <MapComponentsProvider>
            <GeometryShowMap {...props} />
        </MapComponentsProvider>
    )
}

export default GeometryShow
