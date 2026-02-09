/**
 * Mock data for Tamil Nadu CO₂ Capture simulation
 * Using real cities and approximate coordinates
 */

// Tamil Nadu city zones with real coordinates (lat, lng)
export const cityZones = [
  // Major cities - Residential zones
  {
    id: 'res-chennai-1',
    name: 'Chennai North Residential',
    type: 'residential',
    city: 'Chennai',
    coordinates: { lat: 13.0878, lng: 80.2785 },
    radius: 5000, // meters
    population: 450000,
    baseline_co2: 950,
    color: '#93c5fd'
  },
  {
    id: 'res-coimbatore',
    name: 'Coimbatore Residential',
    type: 'residential',
    city: 'Coimbatore',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    radius: 4000,
    population: 350000,
    baseline_co2: 720,
    color: '#93c5fd'
  },
  {
    id: 'res-madurai',
    name: 'Madurai Residential',
    type: 'residential',
    city: 'Madurai',
    coordinates: { lat: 9.9252, lng: 78.1198 },
    radius: 3500,
    population: 280000,
    baseline_co2: 610,
    color: '#93c5fd'
  },
  {
    id: 'res-salem',
    name: 'Salem Residential',
    type: 'residential',
    city: 'Salem',
    coordinates: { lat: 11.6643, lng: 78.1460 },
    radius: 3000,
    population: 220000,
    baseline_co2: 520,
    color: '#93c5fd'
  },

  // Commercial zones
  {
    id: 'com-chennai-cbd',
    name: 'Chennai T. Nagar Commercial District',
    type: 'commercial',
    city: 'Chennai',
    coordinates: { lat: 13.0418, lng: 80.2341 },
    radius: 2000,
    businesses: 850,
    baseline_co2: 1400,
    color: '#fbbf24'
  },
  {
    id: 'com-chennai-it',
    name: 'Chennai IT Corridor (OMR)',
    type: 'commercial',
    city: 'Chennai',
    coordinates: { lat: 12.9150, lng: 80.2275 },
    radius: 4000,
    businesses: 1200,
    baseline_co2: 1650,
    color: '#fbbf24'
  },
  {
    id: 'com-coimbatore',
    name: 'Coimbatore RS Puram',
    type: 'commercial',
    city: 'Coimbatore',
    coordinates: { lat: 11.0049, lng: 76.9581 },
    radius: 1800,
    businesses: 420,
    baseline_co2: 680,
    color: '#fbbf24'
  },

  // Industrial zones
  {
    id: 'ind-chennai-port',
    name: 'Chennai Port & Industrial Area',
    type: 'industrial',
    city: 'Chennai',
    coordinates: { lat: 13.1067, lng: 80.3012 },
    radius: 3000,
    factories: 24,
    baseline_co2: 3200,
    color: '#f87171'
  },
  {
    id: 'ind-ennore',
    name: 'Ennore Thermal Power Plant',
    type: 'industrial',
    city: 'Chennai',
    coordinates: { lat: 13.2167, lng: 80.3167 },
    radius: 2500,
    factories: 8,
    baseline_co2: 4100,
    color: '#f87171'
  },
  {
    id: 'ind-coimbatore',
    name: 'Coimbatore Manufacturing Hub',
    type: 'industrial',
    city: 'Coimbatore',
    coordinates: { lat: 11.0510, lng: 77.0340 },
    radius: 2800,
    factories: 18,
    baseline_co2: 2400,
    color: '#f87171'
  },
  {
    id: 'ind-hosur',
    name: 'Hosur Industrial Estate',
    type: 'industrial',
    city: 'Hosur',
    coordinates: { lat: 12.7409, lng: 77.8253 },
    radius: 2200,
    factories: 15,
    baseline_co2: 1980,
    color: '#f87171'
  },

  // Traffic corridors (major highways)
  {
    id: 'traf-chennai-ecr',
    name: 'East Coast Road (ECR)',
    type: 'traffic',
    city: 'Chennai',
    coordinates: { lat: 12.9516, lng: 80.2463 },
    radius: 8000,
    daily_vehicles: 125000,
    baseline_co2: 1150,
    color: '#94a3b8'
  },
  {
    id: 'traf-chennai-nh45',
    name: 'Grand Southern Trunk Road (NH45)',
    type: 'traffic',
    city: 'Chennai',
    coordinates: { lat: 13.0475, lng: 80.2520 },
    radius: 6000,
    daily_vehicles: 98000,
    baseline_co2: 890,
    color: '#94a3b8'
  },
  {
    id: 'traf-trichy',
    name: 'Trichy-Madurai Highway',
    type: 'traffic',
    city: 'Trichy',
    coordinates: { lat: 10.7905, lng: 78.7047 },
    radius: 5000,
    daily_vehicles: 72000,
    baseline_co2: 650,
    color: '#94a3b8'
  }
];

// Intervention templates
export const interventionTypes = [
  {
    id: 'roadside-capture',
    name: 'Roadside CO₂ Capture Unit',
    description: 'Modular carbon capture units installed along traffic corridors',
    icon: '🏭',
    baseCapacity: 50,
    baseCost: 150000,
    efficiency: 0.85,
    maintenanceCost: 5000,
    bestFor: ['traffic']
  },
  {
    id: 'green-wall',
    name: 'Vertical Garden / Green Wall',
    description: 'Living walls with high CO₂ absorption plants',
    icon: '🌿',
    baseCapacity: 15,
    baseCost: 80000,
    efficiency: 0.65,
    maintenanceCost: 2500,
    bestFor: ['commercial', 'residential']
  },
  {
    id: 'biofilter',
    name: 'Industrial Biofilter System',
    description: 'Biological filtration system for industrial emissions',
    icon: '🔬',
    baseCapacity: 120,
    baseCost: 250000,
    efficiency: 0.75,
    maintenanceCost: 8000,
    bestFor: ['industrial']
  },
  {
    id: 'urban-forest',
    name: 'Urban Green Belt',
    description: 'Dense urban forest and park areas for natural CO₂ absorption',
    icon: '🌳',
    baseCapacity: 80,
    baseCost: 120000,
    efficiency: 0.70,
    maintenanceCost: 4000,
    bestFor: ['residential', 'commercial']
  }
];

// Historical emission trends
export const historicalEmissions = [
  { month: 'Jan', total: 18400, residential: 2800, commercial: 3730, industrial: 9570, traffic: 2300 },
  { month: 'Feb', total: 18100, residential: 2650, commercial: 3680, industrial: 9480, traffic: 2290 },
  { month: 'Mar', total: 18900, residential: 2920, commercial: 3820, industrial: 9680, traffic: 2480 },
  { month: 'Apr', total: 18600, residential: 2840, commercial: 3750, industrial: 9550, traffic: 2460 },
  { month: 'May', total: 19200, residential: 2980, commercial: 3980, industrial: 9750, traffic: 2490 },
  { month: 'Jun', total: 19500, residential: 3050, commercial: 4050, industrial: 9850, traffic: 2550 }
];

// Wind simulation data
export const windPatterns = [
  { direction: 'N', speed: 5, frequency: 0.15 },
  { direction: 'NE', speed: 7, frequency: 0.22 },  // Northeast monsoon dominant
  { direction: 'E', speed: 6, frequency: 0.18 },
  { direction: 'SE', speed: 4, frequency: 0.12 },
  { direction: 'S', speed: 5, frequency: 0.08 },
  { direction: 'SW', speed: 8, frequency: 0.15 },  // Southwest monsoon
  { direction: 'W', speed: 6, frequency: 0.06 },
  { direction: 'NW', speed: 5, frequency: 0.04 }
];

// Air quality index ranges
export const aqiRanges = [
  { min: 0, max: 50, label: 'Good', color: '#10b981' },
  { min: 51, max: 100, label: 'Moderate', color: '#fbbf24' },
  { min: 101, max: 150, label: 'Unhealthy for Sensitive Groups', color: '#f59e0b' },
  { min: 151, max: 200, label: 'Unhealthy', color: '#ef4444' },
  { min: 201, max: 300, label: 'Very Unhealthy', color: '#dc2626' },
  { min: 301, max: 500, label: 'Hazardous', color: '#991b1b' }
];

// Tamil Nadu map center
export const tamilNaduCenter = {
  lat: 11.1271,
  lng: 78.6569,
  zoom: 8
};

// Function to calculate AQI from CO₂ levels
export const calculateAQI = (co2Level) => {
  const normalized = Math.min(co2Level / 100, 5);
  const aqi = Math.round(normalized * 100);

  for (const range of aqiRanges) {
    if (aqi >= range.min && aqi <= range.max) {
      return { value: aqi, ...range };
    }
  }

  return { value: aqi, ...aqiRanges[aqiRanges.length - 1] };
};

// Recommendations based on scenario
export const generateRecommendations = (scenario) => {
  const recommendations = [];

  if (scenario.highestEmissionType === 'industrial') {
    recommendations.push({
      priority: 'high',
      title: 'Deploy Industrial Biofilters in Chennai & Ennore',
      description: 'Install biofilter systems at Ennore Thermal Plant and Chennai Port industrial areas for maximum impact on Tamil Nadu emissions',
      estimatedReduction: '35-45%',
      cost: 'High',
      timeframe: '6-9 months'
    });
  }

  if (scenario.highestEmissionType === 'traffic') {
    recommendations.push({
      priority: 'high',
      title: 'Roadside Capture on ECR and NH45',
      description: 'Place CO₂ capture units along East Coast Road and Grand Southern Trunk Road corridors',
      estimatedReduction: '25-30%',
      cost: 'Medium',
      timeframe: '3-6 months'
    });
  }

  recommendations.push({
    priority: 'medium',
    title: 'Expand Chennai IT Corridor Green Spaces',
    description: 'Create green belts and vertical gardens in OMR and other high-density commercial areas',
    estimatedReduction: '15-20%',
    cost: 'Medium',
    timeframe: '4-8 months'
  });

  recommendations.push({
    priority: 'medium',
    title: 'Tamil Nadu Metro Expansion',
    description: 'Accelerate Chennai and Coimbatore metro projects to reduce private vehicle emissions',
    estimatedReduction: '18-25%',
    cost: 'Very High',
    timeframe: '18-36 months'
  });

  recommendations.push({
    priority: 'low',
    title: 'Coastal Green Belt Development',
    description: 'Develop mangrove and coastal forests along Tamil Nadu coastline for natural CO₂ absorption',
    estimatedReduction: '10-15%',
    cost: 'Medium',
    timeframe: '12-18 months'
  });

  return recommendations;
};

export default {
  cityZones,
  interventionTypes,
  historicalEmissions,
  windPatterns,
  aqiRanges,
  tamilNaduCenter,
  calculateAQI,
  generateRecommendations
};
