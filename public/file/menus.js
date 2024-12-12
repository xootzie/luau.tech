const contextMenu = document.getElementById('customContextMenu');
            const copyOption = document.getElementById('copyOption');

            function updateCopyOption() {
                const selectedText = window.getSelection().toString();
                if (selectedText) {
                    copyOption.classList.remove('text-gray-500', 'cursor-not-allowed');
                    copyOption.classList.add('text-gray-300');
                    copyOption.style.pointerEvents = 'auto';
                } else {
                    copyOption.classList.add('text-gray-500', 'cursor-not-allowed');
                    copyOption.classList.remove('text-gray-300');
                    copyOption.style.pointerEvents = 'none';
                }
            }

            window.addEventListener('contextmenu', (e) => {
                e.preventDefault();

                const x = e.pageX;
                const y = e.pageY;

                contextMenu.style.left = `${x}px`;
                contextMenu.style.top = `${y}px`;

                contextMenu.classList.remove('hidden');

                updateCopyOption();
            });

            window.addEventListener('click', () => {
                contextMenu.classList.add('hidden');
            });

            copyOption.addEventListener('click', () => {
                const selectedText = window.getSelection().toString();
                if (selectedText) {
                    // navigator.clipboard.writeText(selectedText)
                    navigator.clipboard.writeText("You really thought I would make this work?")
                }
                contextMenu.classList.add('hidden');
            });

            const refreshOption = document.getElementById('refreshOption');
            refreshOption.addEventListener('click', () => {
                window.location.reload();
            });

            const discordOption = document.getElementById('discordOption');
            discordOption.addEventListener('click', () => {
                window.open('/starry/redirect?url=https://discord.gg/luau', '_blank');
                contextMenu.classList.add('hidden');
            });