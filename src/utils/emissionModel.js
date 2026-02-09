/**
 * Emission modeling and dispersion calculations
 */

/**
 * Calculate emission dispersion based on wind
 * @param {object} sourceZone - The zone emitting CO₂
 * @param {object} targetZone - The zone receiving dispersed CO₂
 * @param {string} windDirection - Wind direction (N, NE, E, SE, S, SW, W, NW)
 * @param {number} windSpeed - Wind speed in m/s
 */
export const calculateDispersion = (sourceZone, targetZone, windDirection, windSpeed) => {
    const source = sourceZone.coordinates;
    const target = targetZone.coordinates;

    // Calculate distance between zones
    const dx = (target.x + target.width / 2) - (source.x + source.width / 2);
    const dy = (target.y + target.height / 2) - (source.y + source.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate wind direction vector
    const windVectors = {
        'N': { x: 0, y: -1 },
        'NE': { x: 1, y: -1 },
        'E': { x: 1, y: 0 },
        'SE': { x: 1, y: 1 },
        'S': { x: 0, y: 1 },
        'SW': { x: -1, y: 1 },
        'W': { x: -1, y: 0 },
        'NW': { x: -1, y: -1 }
    };

    const windVector = windVectors[windDirection] || { x: 0, y: 0 };

    // Normalize distance vector
    const normDist = distance > 0 ? distance : 1;
    const directionVector = { x: dx / normDist, y: dy / normDist };

    // Calculate alignment with wind (dot product)
    const alignment = (directionVector.x * windVector.x + directionVector.y * windVector.y);

    // Only disperse downwind (alignment > 0)
    if (alignment <= 0) return 0;

    // Dispersion factor based on distance and wind speed
    const dispersionFactor = (windSpeed / 10) * alignment * Math.exp(-distance / 500);

    return Math.max(0, Math.min(1, dispersionFactor));
};

/**
 * Generate heatmap data for CO₂ concentration
 * @param {Array} zones - All city zones
 * @param {Function} getZoneEmissions - Function to get emissions for a zone
 * @param {string} windDirection - Current wind direction
 * @param {number} windSpeed - Current wind speed
 * @param {number} gridSize - Grid resolution
 */
export const generateHeatmap = (zones, getZoneEmissions, windDirection, windSpeed, gridSize = 20) => {
    const heatmapData = [];

    // Create grid
    const maxX = Math.max(...zones.map(z => z.coordinates.x + z.coordinates.width));
    const maxY = Math.max(...zones.map(z => z.coordinates.y + z.coordinates.height));

    for (let x = 0; x < maxX; x += gridSize) {
        for (let y = 0; y < maxY; y += gridSize) {
            let concentration = 0;

            // Calculate contribution from each zone
            zones.forEach(zone => {
                const emissions = getZoneEmissions(zone.id);
                const zoneCenter = {
                    x: zone.coordinates.x + zone.coordinates.width / 2,
                    y: zone.coordinates.y + zone.coordinates.height / 2
                };

                // Distance from grid point to zone center
                const dx = x - zoneCenter.x;
                const dy = y - zoneCenter.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Check if point is within zone
                if (x >= zone.coordinates.x && x <= zone.coordinates.x + zone.coordinates.width &&
                    y >= zone.coordinates.y && y <= zone.coordinates.y + zone.coordinates.height) {
                    concentration += emissions;
                } else {
                    // Apply dispersion model
                    const dispersion = Math.exp(-distance / 200);
                    concentration += emissions * dispersion * 0.3;
                }
            });

            heatmapData.push({ x, y, value: concentration });
        }
    }

    return heatmapData;
};

/**
 * Calculate air quality index from CO₂ level
 * @param {number} co2Level - CO₂ level in tons per day
 */
export const calculateAQI = (co2Level) => {
    // Simplified AQI calculation
    // Real AQI uses pm2.5, pm10, CO, etc., but for demo we use CO₂
    const normalized = Math.min(co2Level / 100, 5);
    return Math.round(normalized * 100);
};

/**
 * Project emissions over time
 * @param {number} currentEmissions - Current total emissions
 * @param {number} capturedCO2 - CO₂ being captured
 * @param {string} timeScale - Time scale (hour, day, month, year)
 * @param {number} periods - Number of periods to project
 */
export const projectEmissions = (currentEmissions, capturedCO2, timeScale, periods = 12) => {
    const projections = [];
    const netEmissions = currentEmissions - capturedCO2;

    const scaleMultipliers = {
        'hour': 24,
        'day': 1,
        'month': 1 / 30,
        'year': 1 / 365
    };

    const multiplier = scaleMultipliers[timeScale] || 1;

    for (let i = 0; i < periods; i++) {
        // Add some variance to make it realistic
        const variance = (Math.random() - 0.5) * 0.1;
        const value = netEmissions * multiplier * (1 + variance);

        projections.push({
            period: i + 1,
            baseline: currentEmissions * multiplier,
            actual: Math.max(0, value),
            captured: capturedCO2 * multiplier
        });
    }

    return projections;
};

/**
 * Calculate cost-effectiveness of interventions
 * @param {Array} interventions - List of interventions
 * @param {Array} interventionTypes - Available intervention types
 */
export const calculateCostEffectiveness = (interventions, interventionTypes) => {
    return interventions.map(intervention => {
        const type = interventionTypes.find(t => t.id === intervention.typeId);
        if (!type) return null;

        const totalCost = type.baseCost * intervention.capacityMultiplier;
        const annualMaintenance = type.maintenanceCost * 12 * intervention.capacityMultiplier;
        const annualCapture = type.baseCapacity * 365 * type.efficiency * intervention.capacityMultiplier;

        // Cost per ton of CO₂ captured per year
        const costPerTon = (totalCost + annualMaintenance) / annualCapture;

        return {
            interventionId: intervention.id,
            typeName: type.name,
            costPerTon,
            annualCapture,
            totalCost,
            annualMaintenance,
            rating: costPerTon < 50 ? 'excellent' : costPerTon < 100 ? 'good' : 'fair'
        };
    }).filter(Boolean);
};

export default {
    calculateDispersion,
    generateHeatmap,
    calculateAQI,
    projectEmissions,
    calculateCostEffectiveness
};
