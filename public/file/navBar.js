const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const mobileMenu = document.getElementById('mobileMenu');
const gameNavBar = document.getElementById('mobileGameNavBar');
const gamesNavBarButton = document.getElementById('gameNavBar');
const supportedGamesSection = document.getElementById('supported-games');

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