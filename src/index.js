// Import CSS
import './style.css';

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

    
