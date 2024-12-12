
        const { Notification } = await import("../file/notification.js");
        const notifier = new Notification();
            
            const supportedGamesSection = document.getElementById('supported-games');
            const scrollDownIndicator = document.getElementById('scrollDownIndicator');
            let isScrolledDown = false;

            const scriptModal = document.getElementById('scriptModal');
            const getStartedBtn = document.querySelector('a[href="#"].px-10.py-4.bg-custom-blue');
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
                scriptModal.classList.remove('hidden');
                scriptModal.classList.add('flex');
            });

            const closeModal = () => {
                scriptModal.classList.remove('flex');
                scriptModal.classList.add('hidden');
            };

            closeModalBtn.addEventListener('click', closeModal);
            dismissModalBtn.addEventListener('click', closeModal);

            copyScriptBtn.addEventListener('click', () => {
                const scriptText = `getgenv().ignoreGameCheck = false
        loadstring(game:HttpGet("https://starry.luau.tech/"))`;

                navigator.clipboard.writeText(scriptText).then(() => {
                    copyScriptBtn.innerHTML = '<i data-lucide="check" class="w-5 h-5 mr-2"></i>Copied!';
                    lucide.createIcons();
                    notifier.createNotification({
                        title: 'Copied to clipboard!',
                        type: 'success',
                        duration: 5000,
                    });
                    setTimeout(() => {
                        copyScriptBtn.innerHTML = '<i data-lucide="copy" class="w-5 h-5 mr-2"></i>Copy Script';
                        lucide.createIcons();
                    }, 2000);
                });
            });