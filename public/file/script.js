document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        import('./navBar.js').catch(e => {
            console.error('Failed to load navBar.js:', e);
            return null;
        }),
        import('./hero.js').catch(e => {
            console.error('Failed to load hero.js:', e);
            return null;
        }),
        import('./carousel.js').catch(e => {
            console.error('Failed to load carousel.js:', e);
            return null;
        }),
        import('./menus.js').catch(e => {
            console.error('Failed to load menus.js:', e);
            return null;
        })
    ])
    .then(([navBar, hero, carousel, menus]) => {
        const failedModules = [navBar, hero, carousel, menus].filter(module => module === null);
        
        if (failedModules.length > 0) {
            console.warn(`${failedModules.length} module(s) failed to load`);
        } else {
            console.log('Success');
            
        }

        lucide.createIcons();
    })
    .catch(error => {
        console.error('Critical error in module loading:', error);
    });
});