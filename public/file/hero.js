            const supportedGamesSection = document.getElementById('scroll-section-divider1');
            const scrollDownIndicator = document.getElementById('scrollDownIndicator');
            let isScrolledDown = false;

            const scriptModal = document.getElementById('scriptModal');
            const getStartedBtn = document.getElementById('getStartedBtn');
            const closeModalBtn = document.getElementById('closeModal');
            const dismissModalBtn = document.getElementById('dismissModal');
            const copyScriptBtn = document.getElementById('copyScript');

            scrollDownIndicator.addEventListener('click', () => {
                supportedGamesSection.scrollIntoView({ behavior: 'smooth' });
            });


            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;

                if (scrollPosition > windowHeight * 0.5 && !isScrolledDown) {
                    isScrolledDown = true;
                    scrollDownIndicator.style.opacity = '0';
                    scrollDownIndicator.style.pointerEvents = 'none';
                }

                if (scrollPosition <= windowHeight * 0.5 && isScrolledDown) {
                    isScrolledDown = false;
                    scrollDownIndicator.style.opacity = '1';
                    scrollDownIndicator.style.pointerEvents = 'auto';
                }
            });

            getStartedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.style.overflow = 'hidden';
                scriptModal.classList.remove('hidden');
                scriptModal.classList.add('flex', 'opacity-0');
                scriptModal.querySelector('.bg-dark-100').classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    scriptModal.classList.add('opacity-100');
                    scriptModal.querySelector('.bg-dark-100').classList.remove('scale-95', 'opacity-0');
                }, 10);
            });
            
            const closeModal = () => {
                document.body.style.overflow = 'auto';
                scriptModal.classList.remove('opacity-100');
                scriptModal.querySelector('.bg-dark-100').classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    scriptModal.classList.remove('flex');
                    scriptModal.classList.add('hidden');
                }, 300);
            };

            closeModalBtn.addEventListener('click', closeModal);
            dismissModalBtn.addEventListener('click', closeModal);

            copyScriptBtn.addEventListener('click', () => {
                const scriptText = `getgenv().ignoreGameCheck = false
loadstring(game:HttpGet("https://luau.tech/build"))()`;

                navigator.clipboard.writeText(scriptText).then(() => {
                    copyScriptBtn.innerHTML = '<i data-lucide="check" class="w-5 h-5 mr-2"></i>Copied!';
                    lucide.createIcons();
                    setTimeout(() => {
                        copyScriptBtn.innerHTML = '<i data-lucide="copy" class="w-5 h-5 mr-2"></i>Copy Script';
                        lucide.createIcons();
                    }, 2000);
                });
            });