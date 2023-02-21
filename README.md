# @mapcomponents/ra-geospatial

Input and view components to work with geospatial data in react admin. This package is based on @mapcomponents/react-maplibre and uses MapLibre-gl to display geospatial data on a map.

## Installation

```bash
yarn add @mapcomponents/ra-geospatial
```

## Exports

### RaGeoSpatialInput

Input component to edit or create geospatial data.

### RaGeoSpatialShow

Show component to display geospatial data.

#### Props

- embeddedMap: boolean (default: false) - If true, the map will be embedded in the component. If false, the component will not create it's own MapContext and add a MapLibreMap component but instead expect a MapContext and a MapLibreMap component to be present in the parent component.

## Examples

```
export const PoiEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="geom" />
      <RaGeospatialInput source="geom" />
    </SimpleForm>
  </Edit>
);
export const PoiCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="geom" />
      <RaGeospatialInput source="geom" />
    </SimpleForm>
  </Create>
);

export const PoiShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <RaGeospatialShow source="geom" />
    </SimpleShowLayout>
  </Show>
);
```