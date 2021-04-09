import React from 'react';
import '../asset/css/Map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { showDataOnMap } from '../util';
import L from 'leaflet';
import marker from '../asset/img/marker.png';

const iconPerson = new L.Icon({
    iconUrl: marker,
    iconAnchor:   [22, 94],
    popupAnchor:  [-3, -76],
    iconSize: new L.Point(38, 95),
});

function Map({countries, casesType, center, zoom}) {

    console.log(center);
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
