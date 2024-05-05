import { App, Component, DivElement, StyleOptional } from 'typecomposer'
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export class MapLeaflet extends Component {

  private _map!: L.Map;

  constructor(private _options: StyleOptional & {
    key: string;
    center?: L.LatLngExpression;
  } & L.MapOptions) {
    super({ id: "map", height: "500px", width: "500px", ..._options });
    _options.center = _options.center || [51.505, -0.09];
    this.onConnected = this.loadMap.bind(this, _options.key, _options.center);
  }

  private loadMap(key: string, center: L.LatLngExpression): void {
    console.log('loadMap', key, center);
    this._map = L.map(this, this._options as L.MapOptions)
    this._map.setView(center, 13);
    L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
      attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
      crossOrigin: true
    }).addTo(this.map);
  }


  addMarker(content: string | HTMLElement, coordinates: L.LatLngExpression): L.Marker<any> {
    const marker = L.marker(coordinates).addTo(this.map);
    marker.bindPopup(content).openPopup();

    return marker;
  }

  get center(): L.LatLng {
    return this.map.getCenter();
  }

  set center(coordinates: L.LatLngExpression) {
    this.map.setView(coordinates);
  }

  set options(options: L.MapOptions) {
    this.map.options = options;
  }

  get options() {
    return this.map.options;
  }

  get map() {
    return this._map;
  }

}

class TesPage extends DivElement {

  constructor() {
    super({ id: "page", width: "500px", height: "500px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "red" });
    console.log('TesPage', this.id);
  }

  onInit(): void {
    const map = this.appendChild(new MapLeaflet({
      key: ""
    }));
    //map.load();
  }

}

console.log(this)

App.setPage(new TesPage());