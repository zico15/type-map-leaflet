import { Component, StyleOptional } from 'typecomposer';

import * as L from 'leaflet';
export declare class MapLeaflet extends Component {
    private _map;
    constructor(options: StyleOptional & {
        key: string;
        center?: L.LatLngExpression;
    } & L.MapOptions);
    load(): void;
    private loadMap;
    addMarker(content: string | HTMLElement, coordinates: L.LatLngExpression): L.Marker<any>;
    get center(): L.LatLng;
    set center(coordinates: L.LatLngExpression);
    set options(options: L.MapOptions);
    get options(): L.MapOptions;
    get map(): L.Map;
}
