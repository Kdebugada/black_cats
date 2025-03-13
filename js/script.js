// Ждем, пока документ полностью загрузится
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие библиотеки AOS перед инициализацией
    if (typeof AOS !== 'undefined') {
        // Инициализация AOS с оптимизированными настройками
        AOS.init({
            duration: 800,
            once: true, // Анимация происходит только один раз
            offset: 100,
            delay: 0, // Убираем задержку
            disable: window.innerWidth < 768, // Отключаем на мобильных устройствах
            easing: 'ease-out'
        });
    } else {
        console.warn('Библиотека AOS не найдена. Анимации при прокрутке могут не работать.');
    }

    // Проверяем наличие GSAP
    if (typeof gsap === 'undefined') {
        console.warn('GSAP не найден. Анимации будут отключены.');
    }

    // Инициализация всех анимаций
    function initAnimations() {
        // Анимация заголовков
        const titles = document.querySelectorAll('.section-header h2');
        titles.forEach(title => {
            const words = title.textContent.split(' ');
            title.textContent = '';
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word;
                span.style.opacity = '0';
                span.style.marginRight = '10px'; // Добавляем отступ справа для каждого слова
                title.appendChild(span);
                
                gsap.to(span, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%"
                    }
                });
            });
        });

        // Анимация карточек с проектами
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%"
                },
                opacity: 0,
                y: 50,
                rotation: 5,
                duration: 1,
                delay: i * 0.2,
                ease: "back.out(1.7)"
            });
        });

        // Анимация временной шкалы
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, i) => {
            // Сначала делаем элементы видимыми
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            
            // Затем применяем анимацию с GSAP, если он доступен
            if (typeof gsap !== 'undefined') {
                const direction = i % 2 === 0 ? -1 : 1;
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%"
                    },
                    opacity: 0,
                    x: 100 * direction,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        });

        // Анимация статистики
        const stats = document.querySelectorAll('.stats-item');
        stats.forEach((stat, i) => {
            const number = stat.querySelector('.number');
            const targetNum = parseInt(number.dataset.target);
            
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%"
                },
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                delay: i * 0.2,
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to(number, {
                        duration: 2,
                        textContent: targetNum,
                        snap: { textContent: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });

        // Анимация фактов
        gsap.utils.toArray('.fact-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%"
                },
                opacity: 0,
                rotationY: 90,
                duration: 1,
                delay: i * 0.2,
                ease: "power2.out"
            });
        });

        // Анимация галереи
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                },
                opacity: 0,
                scale: 0.8,
                rotation: -10,
                duration: 0.8,
                delay: i * 0.1,
                ease: "back.out(1.7)"
            });
        });

        // Анимация отзывов
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, i) => {
            gsap.from(testimonial, {
                scrollTrigger: {
                    trigger: testimonial,
                    start: "top 80%"
                },
                opacity: 0,
                x: -100,
                duration: 1,
                delay: i * 0.3,
                ease: "power2.out"
            });
        });

        // Анимация волнистых разделителей
        const waves = document.querySelectorAll('.wave-divider path');
        waves.forEach((wave, i) => {
            gsap.to(wave, {
                y: "random(-20, 20)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2
            });
        });

        // Анимация кнопок при наведении
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Анимация иконок соцсетей
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            });
            
            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // Запускаем анимации после загрузки страницы
    initAnimations();

    // Анимация текста заголовка с эффектом печатной машинки
    const titleAnimation = () => {
        const title = document.querySelector('.title');
        if (!title) return;
        
        const originalText = title.textContent;
        title.textContent = '';
        
        let charIndex = 0;
        const typeEffect = setInterval(() => {
            if (charIndex < originalText.length) {
                title.textContent += originalText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeEffect);
                // Добавляем класс для запуска анимации свечения
                title.classList.add('text-animated');
            }
        }, 100);
    };
    
    // Запускаем анимацию заголовка с задержкой
    setTimeout(titleAnimation, 500);

    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Изменение навигации при прокрутке с оптимизацией
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        let lastScrollTop = 0;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (scrollTop > 100) {
                        mainNav.style.padding = '10px 0';
                        mainNav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                    } else {
                        mainNav.style.padding = '15px 0';
                        mainNav.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
                    }
                    lastScrollTop = scrollTop;
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // Оптимизированная инициализация Particles.js
    if (window.innerWidth > 768 && typeof particlesJS !== 'undefined') { // Отключаем на мобильных устройствах и проверяем наличие библиотеки
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            try {
                particlesJS('particles-js', {
                    particles: {
                        number: {
                            value: 50, // Уменьшаем количество частиц
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: '#f39c12'
                        },
                        shape: {
                            type: 'circle', // Используем только круги для лучшей производительности
                        },
                        opacity: {
                            value: 0.5,
                            random: false,
                        },
                        size: {
                            value: 3,
                            random: true,
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#f39c12',
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: 'none',
                            random: false,
                            straight: false,
                            out_mode: 'out',
                            bounce: false,
                        }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'grab'
                            },
                            onclick: {
                                enable: true,
                                mode: 'push'
                            },
                            resize: true
                        },
                        modes: {
                            grab: {
                                distance: 140,
                                line_linked: {
                                    opacity: 1
                                }
                            },
                            push: {
                                particles_nb: 3
                            }
                        }
                    },
                    retina_detect: false // Отключаем для лучшей производительности
                });
            } catch (error) {
                console.warn('Ошибка при инициализации Particles.js:', error);
            }
        }
    }

    // Немедленно отображаем секцию "Тайна черных котов"
    const introSection = document.querySelector('.intro');
    const introContent = document.querySelector('.intro-content');
    if (introSection && introContent) {
        // Убеждаемся, что секция видима
        introSection.style.opacity = '1';
        introContent.style.opacity = '1';
        introContent.style.transform = 'none';
        
        // Добавляем класс visible для запуска анимаций
        introContent.classList.add('visible');
    }

    // Немедленно запускаем анимацию статистики
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (isNaN(target)) return;
            
            // Устанавливаем конечное значение сразу, чтобы избежать проблем с анимацией
            stat.textContent = target;
            
            // Добавляем анимацию пульсации для привлечения внимания
            stat.classList.add('pulse-animation');
        });
    }

    // Оптимизированная анимация статистики - отключаем, так как уже установили значения выше
    const animateStats = () => {
        // Функция отключена, так как значения уже установлены
    };

    // Используем IntersectionObserver для оптимизации
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Отключаем наблюдение за статистикой, так как значения уже установлены
    // const statsObserver = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             animateStats();
    //             statsObserver.unobserve(entry.target);
    //         }
    //     });
    // }, observerOptions);

    // const statsContainer = document.querySelector('.stats-container');
    // if (statsContainer) {
    //     statsObserver.observe(statsContainer);
    // }

    // Улучшенный слайдер сравнения с плавными анимациями и черным котом сверху
    const initComparisonSlider = () => {
        const slider = document.querySelector('.comparison-slider');
        if (!slider) return;
        
        const handle = slider.querySelector('.slider-handle');
        const beforeImage = slider.querySelector('.slider-before');
        const afterImage = slider.querySelector('.slider-after');
        let isDragging = false;
        
        // Устанавливаем начальное положение
        const setInitialPosition = () => {
            // Сначала без анимации устанавливаем начальное положение
            beforeImage.style.transition = 'none';
            handle.style.transition = 'none';
            afterImage.style.transition = 'none';
            
            beforeImage.style.width = '50%';
            handle.style.left = '50%';
            afterImage.style.clipPath = 'inset(0 0 0 50%)';
            
            // Форсируем перерисовку
            setTimeout(() => {
                // Включаем анимацию
                beforeImage.style.transition = 'width 1.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
                handle.style.transition = 'left 1.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
                afterImage.style.transition = 'clip-path 1.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
                
                // Анимируем слайдер
                beforeImage.style.width = '30%';
                handle.style.left = '30%';
                afterImage.style.clipPath = 'inset(0 0 0 30%)';
                
                setTimeout(() => {
                    beforeImage.style.width = '70%';
                    handle.style.left = '70%';
                    afterImage.style.clipPath = 'inset(0 0 0 70%)';
                    
                    setTimeout(() => {
                        beforeImage.style.width = '50%';
                        handle.style.left = '50%';
                        afterImage.style.clipPath = 'inset(0 0 0 50%)';
                        
                        // После начальной анимации устанавливаем более короткую анимацию для взаимодействия
                        setTimeout(() => {
                            beforeImage.style.transition = 'width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)';
                            handle.style.transition = 'left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)';
                            afterImage.style.transition = 'clip-path 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)';
                        }, 1000);
                    }, 800);
                }, 800);
            }, 50);
        };
        
        // Запускаем начальную анимацию
        setInitialPosition();
        
        // Функция для плавного перемещения ползунка
        const moveSlider = (clientX) => {
            if (!slider) return;
            
            const sliderRect = slider.getBoundingClientRect();
            const position = Math.max(0, Math.min(clientX - sliderRect.left, sliderRect.width));
            const percentage = (position / sliderRect.width) * 100;
            
            // Используем плавное изменение стилей
            beforeImage.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
            afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        };
        
        // Обработчики событий для мыши
        const handleMouseDown = (e) => {
            isDragging = true;
            slider.classList.add('active');
            document.body.style.userSelect = 'none'; // Предотвращаем выделение текста
            e.preventDefault();
        };
        
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        };
        
        const handleMouseUp = () => {
            if (!isDragging) return;
            isDragging = false;
            slider.classList.remove('active');
            document.body.style.userSelect = ''; // Возвращаем выделение текста
        };
        
        // Добавляем обработчики событий
        handle.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Обработчики событий для сенсорных устройств
        const handleTouchStart = (e) => {
            isDragging = true;
            slider.classList.add('active');
            e.preventDefault(); // Предотвращаем скролл на мобильных устройствах
        };
        
        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            moveSlider(touch.clientX);
        };
        
        const handleTouchEnd = () => {
            isDragging = false;
            slider.classList.remove('active');
        };
        
        // Добавляем обработчики событий для сенсорных устройств
        handle.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd);
        
        // Обработчик клика на слайдер для быстрого перемещения
        slider.addEventListener('click', (e) => {
            // Игнорируем клики на ручке
            if (e.target === handle || handle.contains(e.target)) return;
            
            moveSlider(e.clientX);
        });
        
        // Наблюдатель за видимостью для запуска анимации, когда слайдер появляется в поле зрения
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setInitialPosition();
                    sliderObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        sliderObserver.observe(slider);
        
        // Очистка обработчиков событий при уничтожении компонента
        return () => {
            handle.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            handle.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    };
    
    // Инициализируем улучшенный слайдер сравнения
    initComparisonSlider();

    // Оптимизированный слайдер отзывов
    const testimonialSlider = {
        currentSlide: 0,
        slides: document.querySelectorAll('.testimonial'),
        init() {
            if (!this.slides.length) return;
            
            // Скрываем все слайды кроме первого
            this.slides.forEach((slide, index) => {
                if (index !== 0) slide.style.display = 'none';
            });
            
            // Обработчики для кнопок
            const prevBtn = document.querySelector('.prev-testimonial');
            const nextBtn = document.querySelector('.next-testimonial');
            
            if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
            if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Автоматическое переключение слайдов с большим интервалом
            setInterval(() => this.nextSlide(), 10000);
        },
        showSlide(index) {
            // Скрываем текущий слайд
            this.slides[this.currentSlide].style.opacity = '0';
            
            setTimeout(() => {
                this.slides[this.currentSlide].style.display = 'none';
                this.slides[index].style.display = 'block';
                
                setTimeout(() => {
                    this.slides[index].style.opacity = '1';
                    this.currentSlide = index;
                }, 50);
            }, 300);
        },
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(nextIndex);
        },
        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prevIndex);
        }
    };
    testimonialSlider.init();

    // Инициализация галереи с плавным появлением элементов
    const initGallery = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (!galleryItems.length) return;
        
        // Скрываем все элементы изначально, но оставляем изображения и overlay видимыми
        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Убеждаемся, что изображения всегда видимы
            const img = item.querySelector('img');
            if (img) {
                img.style.opacity = '1';
                img.style.visibility = 'visible';
            }
            
            // Убеждаемся, что overlay сохраняет свои CSS свойства
            const overlay = item.querySelector('.gallery-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
        
        // Используем IntersectionObserver для плавного появления элементов при прокрутке
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    
                    // Задержка для каскадного эффекта
                    const delay = parseInt(item.dataset.aosDelay || 0);
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        
                        // Убеждаемся, что изображения всегда видимы
                        const img = item.querySelector('img');
                        if (img) {
                            img.style.opacity = '1';
                            img.style.visibility = 'visible';
                        }
                    }, delay);
                    
                    galleryObserver.unobserve(item);
                }
            });
        }, { threshold: 0.1 });
        
        // Наблюдаем за элементами галереи
        galleryItems.forEach(item => {
            galleryObserver.observe(item);
        });
    };

    // Оптимизированный фильтр галереи с плавными переходами
    const galleryFilter = {
        init() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const items = document.querySelectorAll('.gallery-item');
            
            if (!filterBtns.length || !items.length) return;
            
            // Добавляем класс для плавного перехода ко всем элементам галереи
            items.forEach(item => {
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                
                // Добавляем обработчики событий для hover эффекта
                item.addEventListener('mouseenter', () => {
                    const overlay = item.querySelector('.gallery-overlay');
                    if (overlay) {
                        overlay.style.transform = 'translateY(0)';
                    }
                    
                    const title = item.querySelector('.gallery-overlay h3');
                    if (title) {
                        title.style.transform = 'translateY(0)';
                        title.style.opacity = '1';
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    const overlay = item.querySelector('.gallery-overlay');
                    if (overlay) {
                        overlay.style.transform = 'translateY(100%)';
                    }
                    
                    const title = item.querySelector('.gallery-overlay h3');
                    if (title) {
                        title.style.transform = 'translateY(20px)';
                        title.style.opacity = '0';
                    }
                });
            });
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.getAttribute('data-filter');
                    
                    // Обновляем активную кнопку
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Применяем фильтр с плавным переходом
                    items.forEach(item => {
                        const category = item.getAttribute('data-category');
                        
                        // Сначала делаем все элементы видимыми, но прозрачными
                        if (filter === 'all' || filter === category) {
                            // Показываем элемент
                            if (item.style.display === 'none') {
                                item.style.opacity = '0';
                                item.style.transform = 'scale(0.9)';
                                item.style.display = 'block';
                                
                                // Используем requestAnimationFrame для плавного появления
                                requestAnimationFrame(() => {
                                    setTimeout(() => {
                                        item.style.opacity = '1';
                                        item.style.transform = 'scale(1)';
                                    }, 10);
                                });
                            }
                        } else {
                            // Скрываем элемент плавно
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.9)';
                            
                            // Ждем завершения анимации перед скрытием элемента
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 400); // Время должно соответствовать длительности transition
                        }
                    });
                    
                    // Перестраиваем сетку после фильтрации для лучшего отображения
                    setTimeout(() => {
                        const gallery = document.querySelector('.gallery-grid');
                        if (gallery) {
                            gallery.style.height = 'auto';
                        }
                    }, 450);
                });
            });
        }
    };
    
    // Инициализируем галерею
    initGallery();
    
    // Инициализируем фильтр галереи
    galleryFilter.init();

    // Оптимизированная кнопка "Наверх"
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (window.pageYOffset > 300) {
                        backToTop.classList.add('show');
                    } else {
                        backToTop.classList.remove('show');
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Анимация для волнистых разделителей
    const waveAnimation = () => {
        if (typeof gsap === 'undefined') {
            console.warn('Библиотека GSAP не найдена. Анимации волн могут не работать.');
            return;
        }
        
        const waves = document.querySelectorAll('.wave-divider svg');
        waves.forEach(wave => {
            gsap.to(wave, {
                x: '5%',
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
    };
    waveAnimation();

    // Параллакс эффект для фоновых изображений
    const parallaxEffect = () => {
        if (typeof gsap === 'undefined') {
            console.warn('Библиотека GSAP не найдена. Эффект параллакса может не работать.');
            return;
        }
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            gsap.to('.header::before', {
                x: mouseX * 20,
                y: mouseY * 20,
                duration: 1
            });
            
            gsap.to('.cta-parallax', {
                x: mouseX * -30,
                y: mouseY * -30,
                duration: 1
            });
        });
    };
    parallaxEffect();

    // Эффект 3D-наклона для карточек
    const tiltEffect = () => {
        if (typeof gsap === 'undefined') {
            console.warn('Библиотека GSAP не найдена. Эффект 3D-наклона может не работать.');
            return;
        }
        
        const cards = document.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardX = e.clientX - cardRect.left;
                const cardY = e.clientY - cardRect.top;
                
                const angleY = (cardX / cardRect.width - 0.5) * 20;
                const angleX = (cardY / cardRect.height - 0.5) * -20;
                
                gsap.to(card, {
                    rotateY: angleY,
                    rotateX: angleX,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    };
    tiltEffect();

    // Оптимизированный график сравнения
    const ctx = document.getElementById('comparisonChart')?.getContext('2d');
    if (ctx && typeof Chart !== 'undefined') {
        try {
            const chartObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        new Chart(ctx, {
                            type: 'radar',
                            data: {
                                labels: ['Элегантность', 'Загадочность', 'Фотогеничность', 'Грация', 'Харизма'],
                                datasets: [{
                                    label: 'Черные коты',
                                    data: [95, 98, 90, 92, 96],
                                    backgroundColor: 'rgba(243, 156, 18, 0.2)',
                                    borderColor: 'rgba(243, 156, 18, 1)',
                                    pointBackgroundColor: 'rgba(243, 156, 18, 1)'
                                }, {
                                    label: 'Другие коты',
                                    data: [80, 75, 85, 83, 82],
                                    backgroundColor: 'rgba(52, 73, 94, 0.2)',
                                    borderColor: 'rgba(52, 73, 94, 1)',
                                    pointBackgroundColor: 'rgba(52, 73, 94, 1)'
                                }]
                            },
                            options: {
                                scales: {
                                    r: {
                                        beginAtZero: true,
                                        max: 100
                                    }
                                },
                                animation: {
                                    duration: 1000
                                }
                            }
                        });
                        
                        chartObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            const chartContainer = document.querySelector('.comparison-chart-container');
            if (chartContainer) {
                chartObserver.observe(chartContainer);
            }
        } catch (error) {
            console.warn('Ошибка при инициализации Chart.js:', error);
        }
    } else if (ctx) {
        console.warn('Библиотека Chart.js не найдена. График сравнения может не работать.');
    }

    // Оптимизированная форма подписки
    const subscribeForm = document.querySelector('.cta-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = subscribeForm.querySelector('input[type="email"]').value;
            
            if (!email) return;
            
            // Простая анимация успешной подписки
            const button = subscribeForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Спасибо за подписку!';
            button.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                subscribeForm.reset();
            }, 3000);
        });
    }
}); 