 // Carousel state management
        const carouselStates = {
            newReleases: { currentSlide: 0, totalSlides: 4 },
            trending: { currentSlide: 0, totalSlides: 4 },
            recentUploads: { currentSlide: 0, totalSlides: 4 }
        };

        // Image gallery state
        let currentImageSlide = 0;
        const totalImageSlides = 3;

        // Sidebar functionality
        function openSidebar() {
            document.getElementById('sidebar').classList.add('sidebar--active');
            document.getElementById('sidebarOverlay').classList.add('sidebar__overlay--active');
            document.body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            document.getElementById('sidebar').classList.remove('sidebar--active');
            document.getElementById('sidebarOverlay').classList.remove('sidebar__overlay--active');
            document.body.style.overflow = 'auto';
        }

        // Search Modal functionality
        function openSearchModal() {
            document.getElementById('searchModal').classList.add('search-modal--active');
            document.body.style.overflow = 'hidden';
        }

        function closeSearchModal() {
            document.getElementById('searchModal').classList.remove('search-modal--active');
            document.body.style.overflow = 'auto';
        }

        function toggleTag(tagElement) {
            if (tagElement.classList.contains('search-modal__tag--active')) {
                tagElement.classList.remove('search-modal__tag--active');
                tagElement.classList.add('search-modal__tag--excluded');
            } else if (tagElement.classList.contains('search-modal__tag--excluded')) {
                tagElement.classList.remove('search-modal__tag--excluded');
            } else {
                tagElement.classList.add('search-modal__tag--active');
            }
        }

        function toggleBroadMatches() {
            const toggle = document.getElementById('broadMatchesToggle');
            toggle.classList.toggle('search-modal__toggle--active');
        }

        function resetAllFilters() {
            // Reset all tags
            const tags = document.querySelectorAll('.search-modal__tag');
            tags.forEach(tag => {
                tag.classList.remove('search-modal__tag--active', 'search-modal__tag--excluded');
            });

            // Reset broad matches toggle
            document.getElementById('broadMatchesToggle').classList.remove('search-modal__toggle--active');

            // Clear search input
            document.getElementById('searchInput').value = '';
        }

        function applySearch() {
            // Get selected tags
            const activeTags = document.querySelectorAll('.search-modal__tag--active');
            const excludedTags = document.querySelectorAll('.search-modal__tag--excluded');
            const searchTerm = document.getElementById('searchInput').value;
            const broadMatches = document.getElementById('broadMatchesToggle').classList.contains('search-modal__toggle--active');

            console.log('Search applied:', {
                searchTerm,
                activeTags: Array.from(activeTags).map(tag => tag.textContent),
                excludedTags: Array.from(excludedTags).map(tag => tag.textContent),
                broadMatches
            });

            // Close modal after applying
            closeSearchModal();
        }

        // Carousel functionality
        function moveCarousel(carouselName, direction) {
            const state = carouselStates[carouselName];
            const carousel = document.getElementById(carouselName + 'Carousel');
            const indicators = document.querySelectorAll(`#${carouselName}Indicators .carousel__indicator`);
            
            // Update current slide
            state.currentSlide += direction;
            if (state.currentSlide >= state.totalSlides) state.currentSlide = 0;
            if (state.currentSlide < 0) state.currentSlide = state.totalSlides - 1;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('carousel__indicator--active', index === state.currentSlide);
            });
            
            // Move carousel
            const translateX = -state.currentSlide * (300 + 16); // card width + gap
            carousel.style.transform = `translateX(${translateX}px)`;
        }

        function goToSlide(carouselName, slideIndex) {
            const state = carouselStates[carouselName];
            const difference = slideIndex - state.currentSlide;
            moveCarousel(carouselName, difference);
        }

        // Image gallery functionality
        function moveImageGallery(direction) {
            const gallery = document.getElementById('imageGallery');
            const indicators = document.querySelectorAll('#imageGalleryIndicators .carousel__indicator');
            
            // Update current slide
            currentImageSlide += direction;
            if (currentImageSlide >= totalImageSlides) currentImageSlide = 0;
            if (currentImageSlide < 0) currentImageSlide = totalImageSlides - 1;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('carousel__indicator--active', index === currentImageSlide);
            });
            
            // Move gallery
            const translateX = -currentImageSlide * 100; // 100% per slide
            gallery.style.transform = `translateX(${translateX}%)`;
        }

        function goToImageSlide(slideIndex) {
            const difference = slideIndex - currentImageSlide;
            moveImageGallery(difference);
        }

        // Auto-play carousels
        setInterval(() => {
            moveCarousel('newReleases', 1);
        }, 8000);

        setInterval(() => {
            moveCarousel('trending', 1);
        }, 9000);

        setInterval(() => {
            moveCarousel('recentUploads', 1);
        }, 10000);

        setInterval(() => {
            moveImageGallery(1);
        }, 12000);

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Hamburger menu click handler
            const hamburgerMenu = document.getElementById('hamburgerMenu');
            if (hamburgerMenu) {
                hamburgerMenu.addEventListener('click', function() {
                    console.log('Hamburger menu clicked');
                    openSidebar();
                });
            }

            // Search icon click handler
            const searchIcon = document.getElementById('searchIcon');
            if (searchIcon) {
                searchIcon.addEventListener('click', function() {
                    console.log('Search icon clicked');
                    openSearchModal();
                });
            }

            // Close sidebar when clicking the close button
            const sidebarClose = document.getElementById('sidebarClose');
            if (sidebarClose) {
                sidebarClose.addEventListener('click', function() {
                    closeSidebar();
                });
            }

            // Close sidebar when clicking overlay
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            if (sidebarOverlay) {
                sidebarOverlay.addEventListener('click', function() {
                    closeSidebar();
                });
            }

            // Close modals with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeSidebar();
                    closeSearchModal();
                }
            });

            // Close search modal when clicking outside
            const searchModal = document.getElementById('searchModal');
            if (searchModal) {
                searchModal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeSearchModal();
                    }
                });
            }
        });