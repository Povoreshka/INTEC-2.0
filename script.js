// Плавная анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    
    // Анимация появления элементов (карточки)
    const animateElements = document.querySelectorAll('.serv-1, .serv-2, .serv-3, .serv-4, .proj1, .column, .stat-p, .cl-img');
    
    // Опции для Intersection Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Создаем наблюдатель
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Анимация для секций при появлении
    const sections = document.querySelectorAll('.services, .rev-all, .projects, .news, .quest, .clients');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Анимация для кнопок при наведении
    const buttons = document.querySelectorAll('.serv-butt, .q-butt, .foot-butt, .butt-1, .butt-2');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Эффект пульсации при клике
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Эффект при наведении на карточки
    const cards = document.querySelectorAll('.serv-1, .serv-2, .serv-3, .serv-4, .proj1, .column');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Эффект при наведении на изображения клиентов
    const clientImages = document.querySelectorAll('.cl-img');
    clientImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    const smoothLinks = document.querySelectorAll('.head-a, .rev-a, .proj-a');
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const text = this.textContent.toLowerCase().trim();
            let target = null;
            
            if(text === 'услуги') target = document.querySelector('.services');
            else if(text === 'отзывы') target = document.querySelector('.rev-all');
            else if(text === 'проекты' || text === 'все проекты') target = document.querySelector('.projects');
            else if(text === 'новости' || text === 'все новости') target = document.querySelector('.news');
            else if(text === 'контакты') target = document.querySelector('.footer1');
            
            if(target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Эффект печати для заголовка (без отображения <br>)
    const headTitle = document.querySelector('.head-h1');
    if(headTitle && !headTitle.hasAttribute('data-animated')) {
        const originalText = headTitle.innerText;
        headTitle.setAttribute('data-animated', 'true');
        headTitle.style.opacity = '0';
        
        setTimeout(() => {
            let i = 0;
            headTitle.innerHTML = '';
            headTitle.style.opacity = '1';
            
            function typeWriter() {
                if(i < originalText.length) {
                    headTitle.innerHTML += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 40);
                }
            }
            
            typeWriter();
        }, 500);
    }
    
    // Модальное окно для заказа звонка
    const callButtons = document.querySelectorAll('.call, .foot-butt');
    callButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal();
        });
    });
    
    function showModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Заказать звонок</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <input type="text" placeholder="Ваше имя" class="modal-input">
                    <input type="tel" placeholder="+7 (___) ___-__-__" class="modal-input">
                    <button class="modal-submit">Отправить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
        
        modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(modal); });
        modal.querySelector('.modal-submit').addEventListener('click', () => {
            alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
            closeModal(modal);
        });
    }
    
    function closeModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        setTimeout(() => modal.remove(), 300);
    }
});

// Добавляем стили для анимаций
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Анимации для карточек */
    .serv-1, .serv-2, .serv-3, .serv-4,
    .proj1, .column, .stat-p, .cl-img {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    /* Hover эффекты для карточек */
    .serv-1, .serv-2, .serv-3, .serv-4,
    .proj1, .column {
        transition: all 0.3s ease;
        border-radius: 15px;
        padding: 20px;
    }
    
    .serv-1:hover, .serv-2:hover, .serv-3:hover, .serv-4:hover,
    .proj1:hover, .column:hover {
        background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
        box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    }
    
    /* Анимация для изображений */
    .cl-img {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .cl-img:hover {
        transform: scale(1.05);
    }
    
    /* Анимация для кнопок */
    button {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    button:active {
        transform: scale(0.95);
    }
    
    /* Модальное окно */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        width: 90%;
        max-width: 400px;
        transform: translateY(-50px);
        transition: transform 0.3s ease;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    
    .modal-header h3 {
        color: #3E3E3D;
        font-size: 24px;
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: #999;
        transition: color 0.3s ease;
    }
    
    .modal-close:hover {
        color: #DC911B;
    }
    
    .modal-body {
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .modal-input {
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        transition: border-color 0.3s ease;
    }
    
    .modal-input:focus {
        outline: none;
        border-color: #DC911B;
    }
    
    .modal-submit {
        background: #DC911B;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .modal-submit:hover {
        background: #c27e12;
        transform: scale(1.02);
    }
`;

document.head.appendChild(styleSheet);