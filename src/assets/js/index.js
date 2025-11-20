// Import CSS
import '../css/style.css';

// Import lodash for debounce
import _ from 'lodash';

// Import module
import { fetchBook } from './fetch';

console.log('🦉 Owly App loaded!');

const button = document.querySelector('button');
const input = document.getElementById('searchName');
const title = document.querySelector('h1');

// Click on title to reload page
title.addEventListener('click', () => {
    location.reload();
});

// Add pointer cursor to title and make it keyboard accessible
title.style.cursor = 'pointer';
title.setAttribute('tabindex', '0');
title.setAttribute('role', 'button');
title.setAttribute('aria-label', 'Reload page');

// Keyboard support for title
title.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        location.reload();
    }
});

// Create debounced version of search (delay 500ms)
const debouncedSearch = _.debounce(() => {
    fetchBook();
}, 500);

// Click on button
button.addEventListener('click', () => {
    fetchBook();
});

// Press Enter in input
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchBook();
    }
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

// Show button when scrolling down
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
    
