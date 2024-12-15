const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const mobileMenu = document.getElementById('mobileMenu');
const gameNavBar = document.getElementById('mobileGameNavBar');
const gamesNavBarButton = document.getElementById('gameNavBar');
const supportedGamesSection = document.getElementById('supported-games');
const premiumNavBar = document.getElementById('premiumNavBar');
const premiumSection = document.getElementById('prem-navigate-section-divider');

navMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    premiumSection.scrollIntoView({ behavior: 'smooth' });
});

gamesNavBarButton.addEventListener('click', () => {
    supportedGamesSection.scrollIntoView({ behavior: 'smooth' });
});

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

gameNavBar.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    supportedGamesSection.scrollIntoView({ behavior: 'smooth' });
});