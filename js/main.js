/**
 * MultiWorld Project Page - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initSmoothScroll();
    initVideoPlaceholders();
    initComparisonSliders();
});

/**
 * Navbar functionality
 */
function initNavbar() {
    // Get all navbar-burger elements
    const navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll('.navbar-burger'), 0
    );

    // Check if there are any navbar burgers
    if (navbarBurgers.length > 0) {
        // Add click event to each
        navbarBurgers.forEach(function(el) {
            el.addEventListener('click', function() {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const targetElement = document.getElementById(target);

                // Toggle the "is-active" class on both the navbar-burger and the navbar-menu
                el.classList.toggle('is-active');
                if (targetElement) {
                    targetElement.classList.toggle('is-active');
                }
            });
        });
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Video placeholder interactions
 */
function initVideoPlaceholders() {
    // Add click handler to placeholder videos to show coming soon message
    const placeholders = document.querySelectorAll('.placeholder-video');
    
    placeholders.forEach(placeholder => {
        placeholder.style.cursor = 'pointer';
        placeholder.addEventListener('click', function() {
            showNotification('Video coming soon!');
        });
    });
}

/**
 * Comparison slider functionality (for future use)
 */
function initComparisonSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        const overlay = slider.querySelector('.slider-overlay');
        const handle = slider.querySelector('.slider-handle');
        
        if (!overlay || !handle) return;
        
        let isDragging = false;
        
        const updateSlider = (x) => {
            const rect = slider.getBoundingClientRect();
            let position = (x - rect.left) / rect.width;
            position = Math.max(0, Math.min(1, position));
            
            overlay.style.clipPath = `inset(0 ${(1 - position) * 100}% 0 0)`;
            handle.style.left = `${position * 100}%`;
        };
        
        handle.addEventListener('mousedown', () => isDragging = true);
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', (e) => {
            if (isDragging) updateSlider(e.clientX);
        });
        
        // Touch events for mobile
        handle.addEventListener('touchstart', () => isDragging = true);
        document.addEventListener('touchend', () => isDragging = false);
        document.addEventListener('touchmove', (e) => {
            if (isDragging) updateSlider(e.touches[0].clientX);
        });
    });
}

/**
 * Show notification toast
 */
function showNotification(message, duration = 3000) {
    // Remove existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: #2C3E50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 0.95rem;
        animation: slideUp 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.querySelector('#toast-animation')) {
        const style = document.createElement('style');
        style.id = 'toast-animation';
        style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Lazy loading for images and videos
 */
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.dataset.src;
                
                if (src) {
                    element.src = src;
                    element.removeAttribute('data-src');
                    element.removeAttribute('data-lazy');
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    lazyElements.forEach(el => observer.observe(el));
}

/**
 * Table sorting functionality
 */
function initTableSorting() {
    const tables = document.querySelectorAll('.sortable-table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            if (header.dataset.sortable !== 'false') {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => sortTable(table, index));
            }
        });
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const header = table.querySelectorAll('th')[columnIndex];
    
    // Determine sort direction
    const isAscending = header.dataset.order !== 'asc';
    
    // Update all headers
    table.querySelectorAll('th').forEach(th => {
        th.dataset.order = '';
        th.innerHTML = th.innerHTML.replace(/ [↑↓]$/, '');
    });
    
    // Set current header
    header.dataset.order = isAscending ? 'asc' : 'desc';
    header.innerHTML += isAscending ? ' ↑' : ' ↓';
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // Try numeric comparison
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAscending ? aNum - bNum : bNum - aNum;
        }
        
        // String comparison
        return isAscending 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
    });
    
    // Reorder rows
    rows.forEach(row => tbody.appendChild(row));
}

// Initialize lazy loading if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
}
