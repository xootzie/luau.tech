export class Notification {
    constructor() {
        this.setupContainer();
    }

    setupContainer() {
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            bottom: 1rem; 
            right: 1rem;
            z-index: 1000;
            display: flex;
            flex-direction: column-reverse;
            gap: 0.5rem;
            max-width: calc(100% - 2rem);
            width: 300px;
        `;
        document.body.appendChild(this.container);
    }

    createNotification(message, type = 'default', duration = 5000) {
        if (typeof message === 'object') {
            return this.createNotificationFromConfig(message);
        }

        const notification = document.createElement('div');
        notification.className = `
            bg-dark-200 border border-dark-300 rounded-lg 
            shadow-card p-3 relative overflow-hidden
            transform transition-all duration-300 ease-out
            opacity-0 translate-x-full
        `;

        const iconMap = {
            'success': {
                icon: '<i data-lucide="check-circle" class="w-5 h-5 mr-2 text-green-500"></i>',
                barColor: 'bg-green-500'
            },
            'error': {
                icon: '<i data-lucide="x-circle" class="w-5 h-5 mr-2 text-red-500"></i>',
                barColor: 'bg-red-500'
            },
            'warning': {
                icon: '<i data-lucide="alert-triangle" class="w-5 h-5 mr-2 text-yellow-500"></i>',
                barColor: 'bg-yellow-500'
            },
            'info': {
                icon: '<i data-lucide="info" class="w-5 h-5 mr-2 text-blue-500"></i>',
                barColor: 'bg-blue-500'
            },
            'default': {
                icon: '<i data-lucide="bell" class="w-5 h-5 mr-2 text-gray-500"></i>',
                barColor: 'bg-gray-500'
            }
        };

        const typeConfig = iconMap[type] || iconMap['default'];

        const timerBar = document.createElement('div');
        timerBar.className = `
            absolute bottom-0 left-0 h-1 ${typeConfig.barColor}
            transition-all duration-[${duration}ms] ease-linear
        `;
        timerBar.style.width = '100%';

        notification.innerHTML = `
            <div class="flex items-start">
                ${typeConfig.icon}
                <div class="flex-grow">
                    <h3 class="text-white font-semibold text-xs">${message}</h3>
                </div>
                <button class="close-btn text-gray-400 hover:text-white ml-2">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        notification.appendChild(timerBar);

        const closeBtn = notification.querySelector('.close-btn');

        this.container.appendChild(notification);

        lucide.createIcons();

        requestAnimationFrame(() => {
            notification.classList.remove('opacity-0', 'translate-x-full');
            notification.classList.add('opacity-100', 'translate-x-0');
        });

        setTimeout(() => {
            timerBar.style.width = '0%';
        }, 50);

        let autoRemoveTimeout = setTimeout(() => {
            this.removeNotification(notification);
        }, duration);

        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemoveTimeout);
            this.removeNotification(notification);
        });

        return notification;
    }

    createNotificationFromConfig(config) {
        const {
            title = 'Notification',
            description = '',
            type = 'default',
            duration = 5000,
            buttons = [],
            onClose
        } = config;
    
        const notification = document.createElement('div');
        notification.className = `
            bg-dark-200 border border-dark-300 rounded-lg 
            shadow-card p-3 relative overflow-hidden
            transform transition-all duration-300 ease-out
            opacity-0 translate-x-full
        `;
    
        const iconMap = {
            'success': {
                icon: '<i data-lucide="check-circle" class="w-5 h-5 mr-2 text-green-500"></i>',
                barColor: 'bg-green-500'
            },
            'error': {
                icon: '<i data-lucide="x-circle" class="w-5 h-5 mr-2 text-red-500"></i>',
                barColor: 'bg-red-500'
            },
            'warning': {
                icon: '<i data-lucide="alert-triangle" class="w-5 h-5 mr-2 text-yellow-500"></i>',
                barColor: 'bg-yellow-500'
            },
            'info': {
                icon: '<i data-lucide="info" class="w-5 h-5 mr-2 text-blue-500"></i>',
                barColor: 'bg-blue-500'
            },
            'default': {
                icon: '<i data-lucide="bell" class="w-5 h-5 mr-2 text-gray-500"></i>',
                barColor: 'bg-gray-500'
            }
        };
    
        const typeConfig = iconMap[type] || iconMap['default'];
    
        // Create timer bar
        const timerBar = document.createElement('div');
        timerBar.className = `
            absolute bottom-0 left-0 h-1 ${typeConfig.barColor}
            transition-all duration-[${duration}ms] ease-linear
        `;
        timerBar.style.width = '100%';
    
        // Construct buttons HTML
        const buttonsHTML = buttons.map(btn => `
            <button class="
                px-2 py-1 rounded-md mr-2 mt-1
                text-xs 
                ${btn.className || 'bg-custom-blue text-white'}
                hover:opacity-80 transition-opacity duration-200
                focus:outline-none focus:ring-2 focus:ring-opacity-50
            ">
                ${btn.text}
            </button>
        `).join('');
    
        notification.innerHTML = `
            <div class="flex items-start">
                ${typeConfig.icon}
                <div class="flex-grow">
                    <h3 class="text-white font-semibold text-xs">${title}</h3>
                    ${description ? `<p class="text-gray-400 text-xs mt-1">${description}</p>` : ''}
                    ${buttonsHTML ? `<div class="flex items-center mt-1">${buttonsHTML}</div>` : ''}
                </div>
                <button class="close-btn text-gray-400 hover:text-white ml-2">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;
    
        // Add timer bar
        notification.appendChild(timerBar);
    
        const closeBtn = notification.querySelector('.close-btn');
    
        // Event delegation for buttons
        const buttonsContainer = notification.querySelector('.flex.items-center');
        if (buttonsContainer) {
            buttonsContainer.addEventListener('click', (event) => {
                const clickedButton = event.target.closest ('button');
                if (clickedButton) {
                    const buttonIndex = Array.from(buttonsContainer.children).indexOf(clickedButton);
                    
                    console.log('Button clicked', buttonIndex, buttons[buttonIndex]);
                    if (buttonIndex !== -1 && buttons[buttonIndex] && buttons[buttonIndex].onClick) {
                        event.stopPropagation();
                        buttons[buttonIndex].onClick(notification);
                    }
                }
            });
        }
    
        this.container.appendChild(notification);
    
        lucide.createIcons();
    
        requestAnimationFrame(() => {
            notification.classList.remove('opacity-0', 'translate-x-full');
            notification.classList.add('opacity-100', 'translate-x-0');
        });
    
        setTimeout(() => {
            timerBar.style.width = '0%';
        }, 50);
    
        let autoRemoveTimeout = setTimeout(() => {
            this.removeNotification(notification);
            if (onClose) onClose();
        }, duration);
    
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemoveTimeout);
            this.removeNotification(notification);
            if (onClose) onClose();
        });
    
        return notification;
    }

    removeNotification(notification) {
        notification.classList.remove('opacity-100', 'translate-x-0');
        notification.classList.add('opacity-0', 'translate-x-full');
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}