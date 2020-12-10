import React from 'react';
import './Map.css';
import { MapContainer, TileLayer, Marker, Popup,Map as LeafletMap,Circle, CircleMarker } from 'react-leaflet';
import { showDataOnMap } from './util';
import L from 'leaflet';
import marker from './img/marker.png';
import leafShadow from './img/leaf-shadow.png';

const iconPerson = new L.Icon({
    iconUrl: marker,
    iconSize: new L.Point(30, 40),
    className: 'leaflet-div-icon',
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76]
});

function Map({countries, casesType, center, zoom}) {
    return (
        <div className='map'>
            <MapContainer center={center} zoom={zoom}  className="markercluster-map">
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center} icon={iconPerson}>
                    <Popup>
                        {center}
                    </Popup>
                </Marker>
                {showDataOnMap(countries, casesType)}
            </MapContainer>
           
        </div>
    );
}

export default Map;
