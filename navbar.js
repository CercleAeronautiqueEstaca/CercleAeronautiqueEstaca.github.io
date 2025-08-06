
        // NAMESPACE pour éviter les conflits
        window.CAENavbar = (function() {
            'use strict';
            
            let isInitialized = false;
            
            function init() {
                if (isInitialized) {
                    console.log('CAE Navbar already initialized');
                    return;
                }
                
                console.log('Initializing CAE Navbar...');
                
                // Elements avec IDs spécifiques
                const menuToggle = document.getElementById('menu-toggle-btn');
                const navLinks = document.getElementById('nav-links-menu');
                const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
                
                if (!menuToggle || !navLinks) {
                    console.error('CAE Navbar: Required elements not found');
                    return;
                }
                
                console.log('Found elements:', {
                    menuToggle: !!menuToggle,
                    navLinks: !!navLinks,
                    dropdownTriggers: dropdownTriggers.length
                });
                
                // Fonctions utilitaires
                function closeAllDropdowns() {
                    document.querySelectorAll('#main-navbar .dropdown').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                    document.querySelectorAll('#main-navbar li').forEach(li => {
                        li.classList.remove('dropdown-open');
                    });
                }
                
                function isMobile() {
                    return window.innerWidth <= 768;
                }
                
                // Toggle menu mobile
                menuToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    console.log('CAE Navbar: Menu toggle clicked');
                    navLinks.classList.toggle('active');
                });
                
                // Gestion des dropdowns
                dropdownTriggers.forEach(trigger => {
                    trigger.addEventListener('click', function(e) {
                        console.log('CAE Navbar: Dropdown trigger clicked', this.textContent);
                        
                        if (isMobile()) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const dropdownId = this.getAttribute('data-dropdown');
                            const dropdown = document.getElementById('dropdown-' + dropdownId);
                            const parentLi = this.closest('li');
                            
                            if (dropdown && parentLi) {
                                const isActive = dropdown.classList.contains('active');
                                
                                // Fermer tous les dropdowns
                                closeAllDropdowns();
                                
                                // Ouvrir celui-ci s'il n'était pas actif
                                if (!isActive) {
                                    dropdown.classList.add('active');
                                    parentLi.classList.add('dropdown-open');
                                    console.log('CAE Navbar: Dropdown opened');
                                }
                            }
                        }
                    });
                });
                
                // Fermer menu sur liens normaux
                document.querySelectorAll('#nav-links-menu a:not(.dropdown-trigger)').forEach(link => {
                    link.addEventListener('click', function() {
                        console.log('CAE Navbar: Regular link clicked');
                        navLinks.classList.remove('active');
                        closeAllDropdowns();
                    });
                });
                
                // Fermer menu sur éléments dropdown
                document.querySelectorAll('#main-navbar .dropdown-item').forEach(item => {
                    item.addEventListener('click', function() {
                        console.log('CAE Navbar: Dropdown item clicked');
                        if (isMobile()) {
                            navLinks.classList.remove('active');
                            closeAllDropdowns();
                        }
                    });
                });
                
                // Fermer sur redimensionnement
                window.addEventListener('resize', function() {
                    if (!isMobile()) {
                        closeAllDropdowns();
                    }
                });
                
                // Fermer en cliquant à l'extérieur
                document.addEventListener('click', function(e) {
                    const navbar = document.getElementById('main-navbar');
                    if (navbar && !navbar.contains(e.target) && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        closeAllDropdowns();
                    }
                });
                
                isInitialized = true;
                console.log('CAE Navbar: Initialization complete');
            }
            
            // API publique
            return {
                init: init,
                isInitialized: function() { return isInitialized; }
            };
        })();
    