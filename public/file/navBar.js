const hamburgerMenuToggle = document.getElementById('hamburger');
const navigationMenu = document.getElementById('navMenu');
const mobileNavigationMenu = document.getElementById('mobileMenu');
const mobileGameNavigationBar = document.getElementById('mobileGameNavBar');
const gamesNavigationButton = document.getElementById('gameNavBar');
const mobilePremiumNavBar = document.getElementById('mobilePremiumNavBar');
const premiumNavBar = document.getElementById('premiumNavBar');
// Sections
const supportedGamesSectionContainer = document.getElementById('supported-games');
const premiumNavigationBar = document.getElementById('premiumNavBar');
const premiumSectionDivider = document.getElementById('prem-navigate-section-divider');

navigationMenu.addEventListener('click', () => {
    mobileNavigationMenu.classList.toggle('hidden');
    mobileNavigationMenu.classList.toggle('flex');
});

gamesNavigationButton.addEventListener('click', () => {
    supportedGamesSectionContainer.scrollIntoView({ behavior: 'smooth' });
});

hamburgerMenuToggle.addEventListener('click', () => {
    mobileNavigationMenu.classList.toggle('hidden');
    mobileNavigationMenu.classList.toggle('flex');
});

mobilePremiumNavBar.addEventListener('click', () => {
    premiumSectionDivider.scrollIntoView({ behavior: 'smooth' });
});

premiumNavBar.addEventListener('click', () => {
    premiumSectionDivider.scrollIntoView({ behavior: 'smooth' });
});

mobileGameNavigationBar.addEventListener('click', () => {
    supportedGamesSectionContainer.scrollIntoView({ behavior: 'smooth' });
});