// Import CSS
import '../css/style.css';

// Import lodash for debounce
import _ from 'lodash';

// Import module
import { fetchBook } from './fetch';

console.log('🦉 Owly App loaded!');

const button = document.querySelector('button');
const input = document.getElementById('searchName');

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
    
