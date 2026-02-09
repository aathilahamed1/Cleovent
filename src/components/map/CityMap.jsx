import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import { useSimulation } from '../../context/SimulationContext';
import { tamilNaduCenter } from '../../data/mockData';
import 'leaflet/dist/leaflet.css';
import './CityMap.css';

// Component to handle map events
function MapEventHandler({ onZoneClick }) {
    const map = useMap();
    return null;
}

const CityMap = () => {
    const { zones, selectedZone, setSelectedZone, getZoneEmissions, interventions } = useSimulation();
    const [showHeatmap, setShowHeatmap] = useState(true);

    const getEmissionColor = (emissions) => {
        if (emissions > 3000) return '#ef4444'; // Red - very high
        if (emissions > 1500) return '#f59e0b'; // Orange - high
        if (emissions > 800) return '#fbbf24'; // Yellow - moderate
        return '#10b981'; // Green - low
    };

    const getEmissionOpacity = (emissions) => {
        const normalized = Math.min(emissions / 4000, 1);
        return showHeatmap ? 0.3 + (normalized * 0.4) : 0.6;
    };

    const getTypeColor = (type) => {
        const colors = {
            residential: '#93c5fd',
            commercial: '#fbbf24',
            industrial: '#f87171',
            traffic: '#94a3b8'
        };
        return colors[type] || '#cbd5e1';
    };

    return (
        <div className="city-map-container">
            <div className="map-controls">
                <div className="control-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={showHeatmap}
                            onChange={(e) => setShowHeatmap(e.target.checked)}
                        />
                        <span>Show Emission Heatmap</span>
                    </label>
                </div>

                <div className="map-legend">
                    <h4>Zone Types</h4>
                    <div className="legend-items">
                        <div className="legend-item">
                            <div className="legend-color" style={{ background: getTypeColor('residential') }}></div>
                            <span>Residential</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ background: getTypeColor('commercial') }}></div>
                            <span>Commercial</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ background: getTypeColor('industrial') }}></div>
                            <span>Industrial</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ background: getTypeColor('traffic') }}></div>
                            <span>Traffic</span>
                        </div>
                    </div>
                </div>

                <div className="map-info">
                    <h4>📍 Tamil Nadu Focus</h4>
                    <p className="info-text">Showing major cities and emission zones across Tamil Nadu</p>
                    <div className="city-list">
                        <div className="city-badge">Chennai</div>
                        <div className="city-badge">Coimbatore</div>
                        <div className="city-badge">Madurai</div>
                        <div className="city-badge">Salem</div>
                        <div className="city-badge">Trichy</div>
                    </div>
                </div>
            </div>

            <div className="map-view">
                <div className="leaflet-map-wrapper">
                    <MapContainer
                        center={[tamilNaduCenter.lat, tamilNaduCenter.lng]}
                        zoom={tamilNaduCenter.zoom}
                        style={{ height: '600px', width: '100%', borderRadius: '12px' }}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapEventHandler onZoneClick={setSelectedZone} />

                        {/* Render zones as circles */}
                        {zones.map(zone => {
                            const emissions = getZoneEmissions(zone.id);
                            const isSelected = selectedZone?.id === zone.id;
                            const hasIntervention = interventions.some(i => i.zoneId === zone.id);

                            return (
                                <Circle
                                    key={zone.id}
                                    center={[zone.coordinates.lat, zone.coordinates.lng]}
                                    radius={zone.radius}
                                    pathOptions={{
                                        color: isSelected ? '#059669' : getTypeColor(zone.type),
                                        fillColor: showHeatmap ? getEmissionColor(emissions) : getTypeColor(zone.type),
                                        fillOpacity: getEmissionOpacity(emissions),
                                        weight: isSelected ? 4 : 2
                                    }}
                                    eventHandlers={{
                                        click: () => setSelectedZone(zone)
                                    }}
                                >
                                    <Popup>
                                        <div className="zone-popup">
                                            <h3>{zone.name}</h3>
                                            <div className="popup-info">
                                                <div className="popup-row">
                                                    <strong>City:</strong> {zone.city}
                                                </div>
                                                <div className="popup-row">
                                                    <strong>Type:</strong> <span className="badge badge-info">{zone.type}</span>
                                                </div>
                                                <div className="popup-row">
                                                    <strong>Emissions:</strong> {Math.round(emissions)} t/day
                                                </div>
                                                <div className="popup-row">
                                                    <strong>Baseline:</strong> {zone.baseline_co2} t/day
                                                </div>
                                                {zone.population && (
                                                    <div className="popup-row">
                                                        <strong>Population:</strong> {zone.population.toLocaleString()}
                                                    </div>
                                                )}
                                                {zone.businesses && (
                                                    <div className="popup-row">
                                                        <strong>Businesses:</strong> {zone.businesses}
                                                    </div>
                                                )}
                                                {zone.factories && (
                                                    <div className="popup-row">
                                                        <strong>Factories:</strong> {zone.factories}
                                                    </div>
                                                )}
                                                {hasIntervention && (
                                                    <div className="popup-row intervention-badge">
                                                        🌿 Has Active Intervention
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Popup>
                                </Circle>
                            );
                        })}
                    </MapContainer>
                </div>

                {selectedZone && (
                    <div className="zone-info-panel">
                        <h3>{selectedZone.name}</h3>
                        <div className="info-row">
                            <span className="info-label">City:</span>
                            <span className="info-value">{selectedZone.city}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Type:</span>
                            <span className="badge badge-info">{selectedZone.type}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Current Emissions:</span>
                            <span className="info-value">{Math.round(getZoneEmissions(selectedZone.id))} tons/day</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Baseline:</span>
                            <span className="info-value">{selectedZone.baseline_co2} tons/day</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Coordinates:</span>
                            <span className="info-value">
                                {selectedZone.coordinates.lat.toFixed(4)}°N, {selectedZone.coordinates.lng.toFixed(4)}°E
                            </span>
                        </div>
                        {selectedZone.population && (
                            <div className="info-row">
                                <span className="info-label">Population:</span>
                                <span className="info-value">{selectedZone.population.toLocaleString()}</span>
                            </div>
                        )}
                        {selectedZone.businesses && (
                            <div className="info-row">
                                <span className="info-label">Businesses:</span>
                                <span className="info-value">{selectedZone.businesses}</span>
                            </div>
                        )}
                        {selectedZone.factories && (
                            <div className="info-row">
                                <span className="info-label">Factories:</span>
                                <span className="info-value">{selectedZone.factories}</span>
                            </div>
                        )}
                        {selectedZone.daily_vehicles && (
                            <div className="info-row">
                                <span className="info-label">Daily Vehicles:</span>
                                <span className="info-value">{selectedZone.daily_vehicles.toLocaleString()}</span>
                            </div>
                        )}

                        {interventions.filter(i => i.zoneId === selectedZone.id).length > 0 && (
                            <div className="info-interventions">
                                <h4>Active Interventions</h4>
                                <p className="intervention-count">
                                    {interventions.filter(i => i.zoneId === selectedZone.id).length} intervention(s) deployed
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CityMap;
