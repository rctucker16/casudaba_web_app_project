/**
 * js/PlayerHandler.js
 * Manages UI action buttons, player interactions, and event triggers.
 * Casudaba WebGIS Application - Casamance Region
 */
class PlayerHandler {
    /**
     * @param {HTMLElement|string} element - The DOM element or selector for the action trigger.
     */
    constructor(element) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        if (this.element) {
            this.bindEvents();
        }
    }

    /**
     * Binds click listeners to player action buttons
     */
    bindEvents() {
        this.element.addEventListener('click', (e) => {
            const actionType = this.element.getAttribute('data-action') || 'explore';
            console.log(`[PlayerHandler] Action Triggered: ${actionType}`, e);

            // 1. Dispatch custom event for Kono AI Guide
            const event = new CustomEvent('userQuestion', {
                detail: `What is near my action location for ${actionType}?`
            });
            window.dispatchEvent(event);

            // 2. Add visual click feedback to HUD
            this.triggerActionEffect();
        });
    }

    /**
     * Visual UI feedback animation when an action button is pressed
     */
    triggerActionEffect() {
        this.element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.element.style.transform = 'scale(1)';
        }, 150);
    }

    /**
     * Helper static initializer to safely attach handlers across all UI action buttons
     */
    static initAll(selector = '.playerAction') {
        const actions = document.querySelectorAll(selector);
        return Array.from(actions).map(action => new PlayerHandler(action));
    }
}

// Automatically bind all .playerAction elements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    PlayerHandler.initAll('.playerAction');
});

<!-- Action Control HUD -->
<div class="hudPanel">
    <h3>Player Actions</h3>
    <div class="actionButtons">
        <button class="playerAction" data-action="scout"> Scout Area</button>
        <button class="playerAction" data-action="harvest"> Harvest Crops</button>
        <button class="playerAction" data-action="rest"> Rest at Base</button>
    </div>
</div>
