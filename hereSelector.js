**
 * Hero / AI Tool Selector
 * Toggles visibility between active heroes/AI tools and logs dataset properties.
 */
document.querySelectorAll('.hero').forEach((hero, index) => {
    hero.addEventListener('click', () => {
        document.querySelectorAll('.hero').forEach((otherHero, i) => {
            if (i !== index) {
                otherHero.style.display = 'none';
            } else {
                hero.style.display = 'block';
            }
        });

        console.log('Selected hero:', { ...hero.dataset });

        // Trigger custom event for Kono AI Guide if needed
        const heroName = hero.dataset.name || `Hero ${index + 1}`;
        window.dispatchEvent(new CustomEvent('userQuestion', {
            detail: `Selected ${heroName} active unit.`
        }));
    });
});
