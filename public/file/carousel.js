class Carousel {

    constructor(container) {
        this.container = container;
        this.carouselContainer = container.querySelector('.carousel-container');
        this.items = container.querySelectorAll('.carousel-item');
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');

        this.currentIndex = 0;
        this.totalItems = this.items.length;

        this.init();

    }

    init() {
        this.updateCarousel();
        this.bindEvents();
    }
    updateCarousel() {

        const totalWidth = Array.from(this.items)
            .slice(0, this.currentIndex)
            .reduce((sum, item) => sum + item.offsetWidth + 16, 0);



        this.carouselContainer.style.transform = `translateX(-${totalWidth}px)`;

        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.prevBtn.classList.toggle('opacity-40', this.currentIndex === 0);
        }



        if (this.nextBtn) {

            this.nextBtn.disabled = this.currentIndex >= this.totalItems - 1;

            this.nextBtn.classList.toggle('opacity-40', this.currentIndex >= this.totalItems - 1);

        }

    }


    bindEvents() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }

    }

    next() {
        if (this.currentIndex < this.totalItems - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
}

const carouselContainers = document.querySelectorAll('[data-carousel="true"]');
carouselContainers.forEach(container => {
    new Carousel(container);
});

lucide.createIcons();