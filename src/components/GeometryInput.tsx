import React from "react"
import {MapComponentsProvider} from "@mapcomponents/react-maplibre"
import GeometryInputMap from "./GeometryInputMap.js";
import { InputProps } from "react-admin";

function GeometryInput(props:InputProps<any>) {
    return (
        <MapComponentsProvider>
            <GeometryInputMap {...props} />
        </MapComponentsProvider>
    )
}

export default GeometryInput
