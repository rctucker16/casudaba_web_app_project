/**
	  * js/AIComponent.js
	  * Kono AI Guide handling knowledge base, query parsing, and spatial suggestions.
	  * Casudaba Application - Casamance Region
	  */
	 class AIComponent {
	     constructor() {
	         // Registered points of interest in the Casamance region for spatial search
	         this.pointsOfInterest = [
	             { id: 'farm_1', name: "Boutoute Sugar Estate", type: 'sugar farm', coords: [12.551, -16.248] },
	             { id: 'farm_2', name: "Djibock Cane Field", type: 'sugar farm', coords: [12.579, -16.221] },
	             { id: 'hub_1', name: "Ziguinchor Central Market", type: 'market', coords: [12.568, -16.273] },
	             { id: 'port_1', name: "Cap Skirring Coastal Post", type: 'outpost', coords: [12.355, -16.742] }
	         ];

	         this.knowledgeBase = [
	             { keywords: ['ziguinchor', 'base', 'hub'], response: "Ziguinchor serves as your primary hub along the Casamance River." },
	             { keywords: ['quest', 'task', 'mission'], response: "Explore highlighted orange zones on your map to trigger active regional objectives." },
	             { keywords: ['cap', 'skirring', 'beach'], response: "Cap Skirring is located on the Atlantic coast southwest of Ziguinchor." },
	             { keywords: ['sedhiou', 'kolda', 'river'], response: "Heading east connects you to Sédhiou and Kolda along the main river corridor." }
	         ];

	         this.activeSearchMarker = null;
	     }

	     /**
	      * Finds the nearest spatial target to a set of coordinates
	      * @param {Array<number>} currentCoords - [lat, lng]
	      * @param {string} targetType - Type of resource/location
	      */
	     findNearest(currentCoords, targetType) {
	         if (typeof L === 'undefined' || !currentCoords) return null;

	         const playerLatLng = L.latLng(currentCoords[0], currentCoords[1]);
	         let nearest = null;
	         let shortestDistance = Infinity;

	         this.pointsOfInterest.forEach(poi => {
	             if (poi.type.includes(targetType) || targetType.includes(poi.type)) {
	                 const poiLatLng = L.latLng(poi.coords[0], poi.coords[1]);
	                 const distMeters = playerLatLng.distanceTo(poiLatLng);

	                 if (distMeters < shortestDistance) {
	                     shortestDistance = distMeters;
	                     nearest = { ...poi, distanceKm: (distMeters / 1000).toFixed(2) };
	                 }
	             }
	         });

	         return nearest;
	     }

	     /**
	      * Generates a response string based on user query and map state
	      * @param {string} query
	      * @param {Array<number>} playerCoords
	      */
	     generateResponseBasedOnQuery(query, playerCoords = [12.568, -16.273]) {
	         const cleanQuery = query.toLowerCase();

	         // 1. Spatial Search Trigger (e.g. sugar farm, market, outpost)
	         if (cleanQuery.includes('sugar') || cleanQuery.includes('farm') || cleanQuery.includes('cane')) {
	             const nearestFarm = this.findNearest(playerCoords, 'sugar farm');
	             if (nearestFarm) {
	                 // If map exists, pan to location and drop marker
	                 if (typeof map !== 'undefined') {
	                     if (this.activeSearchMarker) map.removeLayer(this.activeSearchMarker);
	                     this.activeSearchMarker = L.marker(nearestFarm.coords).addTo(map);
	                     this.activeSearchMarker.bindPopup(`<b>${nearestFarm.name}</b><br>Nearest Sugar Farm`).openPopup();
	                     map.panTo(nearestFarm.coords);
	                 }

	                 return `🌾 Nearest Sugar Farm: <strong>${nearestFarm.name}</strong> (~${nearestFarm.distanceKm} km away in Ziguinchor). Map view updated!`;
	             }
	         }

	         // 2. Knowledge Base Query Match
	         for (let item of this.knowledgeBase) {
	             if (item.keywords.some(kw => cleanQuery.includes(kw))) {
	                 return item.response;
	             }
	         }

	         // 3. Fallback Response
	         return `I am analyzing '${query}'. Try asking about "nearest sugar farm", "quests", or "Ziguinchor"!`;
	     }

	     /**
	      * Evaluates query and returns structured response object
	      * @param {string} query
	      * @param {Array<number>} playerCoords
	      */
	     suggestAction(query, playerCoords) {
	         const response = {
	             content: this.generateResponseBasedOnQuery(query, playerCoords),
	             confidence: 0.9
	         };
	         console.log('[Kono AI Guide]', response);
	         return response;
	     }
	 }

	 // Instantiate global Kono instance
	 const kono = new AIComponent();

	 // Custom Event Listener for UI & Player Actions
	 window.addEventListener('userQuestion', (event) => {
	     // Safely extract string query from CustomEvent detail payload
	     const query = typeof event.detail === 'string' ? event.detail : event.detail?.query || '';

	     // Default player position set to Ziguinchor base
	     const playerPos = [12.568, -16.273];
	     const response = kono.suggestAction(query, playerPos);

	     // Update HUD overlay display if element exists
	     const displayEl = document.getElementById('konoDisplay');
	     if (displayEl) {
	         displayEl.innerHTML = response.content;
	     }
});
