document.getElementById('logo').addEventListener('click', function() {
    const logoUrl = this.src;
    window.open(logoUrl, '_blank');
});


const buttonData = {
    telegram: {
        qrCode: 'img/telegram.png',
        link: 'https://t.me/leg4liz',
        title: 'Telegram'
    },
    telegram_channel: {
        qrCode: 'img/channel.png',
        link: 'https://t.me/leg4l1ze',
        title: 'Telegram Channel'
    },
    vkontakte: {
        qrCode: 'img/vk.png',
        link: 'https://vk.com/pechalno47',
        title: 'VKontakte'
    },
    phone: {
        number: '+7 (982) 739-62-66',
        link: 'tel:+79827396266',
        title: 'Phone'
    }
};

function createModal(content, isPhone = false) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: #2A2A2A;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: ${isPhone ? '300px' : '350px'};
        width: 90%;
        color: #F5F5F5;
        border: 3px solid #333333;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = content;
    modal.appendChild(modalContent);

    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });

    document.body.appendChild(modal);
}

function closeModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}


function setupButtonHandlers() {
    const buttons = document.querySelectorAll('.link-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonId = this.id;
            const data = buttonData[buttonId];
            
            if (!data) return;

            if (buttonId === 'phone') {
                const phoneContent = `
                    <h3 style="margin-bottom: 20px; color: #F5F5F5;">Мой номер телефона</h3>
                    <p style="font-size: 1.5em; margin-bottom: 25px; color: #CCCCCC;">${data.number}</p>
                    <a href="${data.link}" class="phone-link" style="
                        display: inline-block;
                        background: #4CAF50;
                        color: white;
                        padding: 12px 30px;
                        border-radius: 8px;
                        text-decoration: none;
                        font-size: 1.1em;
                        transition: background 0.3s ease;
                    ">Позвонить</a>
                    <button class="close-modal" style="
                        display: block;
                        margin: 20px auto 0;
                        background: #666;
                        color: white;
                        border: none;
                        padding: 8px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Закрыть</button>
                `;
                
                createModal(phoneContent, true);
                
            } else {
                const socialContent = `
    <h3 style="margin-bottom: 20px; color: #F5F5F5;">${data.title}</h3>
    <img src="${data.qrCode}" 
         alt="QR Code" 
         onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.link)}'"
         style="
            width: 200px;
            height: 200px;
            margin-bottom: 25px;
            border: 3px solid #F5F5F5;
            border-radius: 10px;
         ">
    <a href="${data.link}" target="_blank" class="go-link" style="
        display: inline-block;
        background: #F5F5F5;
        color: #1A1A1A;
        padding: 12px 30px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 1.1em;
        margin-bottom: 15px;
        transition: all 0.2s linear;
    ">Перейти</a>
    <br>
    <button class="close-modal" style="
        background: #666;
        color: white;
        border: none;
        padding: 8px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s linear;
    ">Закрыть</button>
`;
                
                createModal(socialContent);
            }
            
            setTimeout(() => {
                const closeBtn = document.querySelector('.close-modal');
                if (closeBtn) {
                    closeBtn.addEventListener('click', function() {
                        const modal = this.closest('.modal');
                        if (modal) closeModal(modal);
                    });
                }
                
                const links = document.querySelectorAll('.go-link, .phone-link');
                links.forEach(link => {
                    link.addEventListener('mouseenter', function() {
                        this.style.background = '#CCCCCC';
                        this.style.transform = 'scale(1.05)';
                    });
                    link.addEventListener('mouseleave', function() {
                        this.style.background = this.classList.contains('phone-link') ? '#4CAF50' : '#F5F5F5';
                        this.style.transform = 'scale(1)';
                    });
                });
            }, 50);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupButtonHandlers();
    
    const style = document.createElement('style');
    style.textContent = `
        .go-link:hover, .phone-link:hover {
            transform: scale(1.05);
            transition: all 0.2s linear;
            box-shadow: 0 0 5px #F5F5F5;
        }
        
        .close-modal:hover {
            background: #888 !important;
            transform: scale(1.05);
            transition: all 0.2s linear;
            box-shadow: 0 0 5px #F5F5F5;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                margin: 20px;
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(style);
});