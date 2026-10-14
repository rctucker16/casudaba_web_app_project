/**
 * js/GameHandler.js
 * Central Game Logic & Spatial Quest Controller
 * Casudaba Application - Casamance Region
 */
class GameHandler {
    constructor(mapInstance) {
        this.map = mapInstance;
        this.currentState = 'play';
        this.playerProgress = ['start', 'mid', 'learn'];

        // Track completed quest indices
        this.completedQuests = new Set();
        this.renderedIndices = new Set();

        // Spatial Quests in the Casamance Region
        this.quests = [
            { id: 0, stage: 'start', title: 'Ziguinchor Logistics', coords: [12.568, -16.273], radius: 3000 },
            { id: 1, stage: 'mid', title: 'Sédhiou River Corridor', coords: [12.708, -15.557], radius: 3500 },
            { id: 2, stage: 'learn', title: 'Cap Skirring Coastal Recon', coords: [12.355, -16.742], radius: 3000 }
        ];

        this.markers = {};
        this.initMapMarkers();
    }

    /**
     * Initializes interactive markers and proximity bounds on the Leaflet map
     */
    initMapMarkers() {
        if (!this.map) return;

        this.quests.forEach(quest => {
            const marker = L.marker(quest.coords).addTo(this.map);
            marker.bindPopup(`<b>${quest.title}</b><br>Stage: ${quest.stage.toUpperCase()}`);

            const circle = L.circle(quest.coords, {
                color: '#ffa500',
                fillColor: '#ffa500',
                fillOpacity: 0.15,
                radius: quest.radius
            }).addTo(this.map);

            // Allow direct click on marker to trigger quest completion
            marker.on('click', () => this.completeQuest(quest.id));

            this.markers[quest.id] = { marker, circle };
        });
    }

    /**
     * Periodic game loop maintaining UI state and progress rendering
     */
    loop() {
        if (this.currentState === 'play') {
            const container = document.querySelector('.questsPanel');
            if (!container) return;

            // Iterate over progress stages (0, 1, 2)
            for (let index = 0; index < this.playerProgress.length; index++) {
                if (!this.renderedIndices.has(index)) {
                    this.renderQuest(index);
                    this.renderedIndices.add(index);
                }
            }
        }
    }

    /**
     * Appends formatted quest cards to the UI overlay panel
     */
    renderQuest(index) {
        const quest = this.quests[index];
        const container = document.querySelector('.questsPanel');
        if (!container || !quest) return;

        const panel = document.createElement('div');
        panel.className = `gameQuest quest-${index}`;
        panel.id = `quest-card-${index}`;
        panel.innerHTML = `
            <strong>${quest.title}</strong><br>
            <small>Stage: ${quest.stage.toUpperCase()} | Status: <span class="status-text">⏳ Active</span></small>
        `;

        container.appendChild(panel);
    }

    /**
     * Evaluates whether a player map click falls inside an active quest boundary
     */
    checkProximityClick(clickedLatLng) {
        this.quests.forEach(quest => {
            if (!this.completedQuests.has(quest.id)) {
                const questLatLng = L.latLng(quest.coords[0], quest.coords[1]);
                const distanceMeters = clickedLatLng.distanceTo(questLatLng);

                if (distanceMeters <= quest.radius) {
                    this.completeQuest(quest.id);
                }
            }
        });
    }

    /**
     * Updates quest progress state, map markers, and UI feedback
     */
    completeQuest(questId) {
        if (this.completedQuests.has(questId)) return;

        this.completedQuests.add(questId);
        const quest = this.quests[questId];

        // Update Map Layers
        if (this.markers[questId]) {
            this.markers[questId].circle.setStyle({ color: '#28a745', fillColor: '#28a745' });
            this.markers[questId].marker.getPopup().setContent(`<b>${quest.title}</b><br>✅ Quest Completed!`);
            this.markers[questId].marker.openPopup();
        }

        // Update HUD UI
        const card = document.getElementById(`quest-card-${questId}`);
        if (card) {
            card.classList.add('completed');
            card.querySelector('.status-text').innerText = '✅ Complete';
        }

        console.log(`[GameHandler] Completed Stage ${quest.stage.toUpperCase()}: ${quest.title}`);
    }
}
