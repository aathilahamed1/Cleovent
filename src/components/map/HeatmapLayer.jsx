import React, { useRef, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import './HeatmapLayer.css';

const HeatmapLayer = () => {
    const canvasRef = useRef(null);
    const { zones, getZoneEmissions } = useSimulation();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const scale = canvas.width / 800;
        const gridSize = 40;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create heatmap grid
        for (let x = 0; x < 800; x += gridSize) {
            for (let y = 0; y < 600; y += gridSize) {
                let totalEmissions = 0;
                let contributingZones = 0;

                // Calculate emissions at this grid point
                zones.forEach(zone => {
                    const { x: zx, y: zy, width, height } = zone.coordinates;
                    const zoneCenterX = zx + width / 2;
                    const zoneCenterY = zy + height / 2;

                    // Distance from grid point to zone center
                    const dx = x - zoneCenterX;
                    const dy = y - zoneCenterY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Check if point is within zone or nearby
                    if (x >= zx && x <= zx + width && y >= zy && y <= zy + height) {
                        totalEmissions += getZoneEmissions(zone.id);
                        contributingZones++;
                    } else if (distance < 200) {
                        // Apply dispersion falloff
                        const falloff = Math.exp(-distance / 150);
                        totalEmissions += getZoneEmissions(zone.id) * falloff * 0.4;
                        contributingZones++;
                    }
                });

                if (contributingZones > 0) {
                    const avgEmissions = totalEmissions / contributingZones;
                    const color = getHeatmapColor(avgEmissions);

                    ctx.fillStyle = color;
                    ctx.fillRect(x * scale, y * scale, gridSize * scale, gridSize * scale);
                }
            }
        }
    }, [zones, getZoneEmissions]);

    const getHeatmapColor = (emissions) => {
        // Normalize emissions to 0-1 range (assuming max ~3000 t/day)
        const normalized = Math.min(emissions / 3000, 1);

        if (normalized < 0.25) {
            // Green to yellow
            const t = normalized / 0.25;
            return `rgba(16, 185, 129, ${0.2 + t * 0.2})`;
        } else if (normalized < 0.5) {
            // Yellow
            const t = (normalized - 0.25) / 0.25;
            return `rgba(251, 191, 36, ${0.3 + t * 0.2})`;
        } else if (normalized < 0.75) {
            // Orange
            const t = (normalized - 0.5) / 0.25;
            return `rgba(245, 158, 11, ${0.4 + t * 0.2})`;
        } else {
            // Red
            const t = (normalized - 0.75) / 0.25;
            return `rgba(239, 68, 68, ${0.5 + t * 0.3})`;
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="heatmap-canvas"
        />
    );
};

export default HeatmapLayer;
