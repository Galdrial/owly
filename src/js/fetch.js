import axios from 'axios';
import _ from 'lodash';

// Configure axios with timeout and base URL
const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'https://openlibrary.org',
    timeout: parseInt(process.env.API_TIMEOUT) || 15000,
});

export function fetchBook() {
    fetchData();
    async function fetchData(){
        try{
            const searchName= document.getElementById("searchName").value.trim();
            
            if (!searchName) {
                throw new Error("Please enter a search term!");
            }
            
            const MAX_RESULTS = parseInt(process.env.MAX_RESULTS) || 50;
            
            // OpenLibrary uses underscores instead of spaces in subjects
            const formattedSearch = searchName.toLowerCase().replace(/\s+/g, '_');
            
            // Use axios instead of fetch
            const response = await api.get(`/subjects/${formattedSearch}.json`, {
                params: {
                    limit: MAX_RESULTS,
                    offset: 0
                }
            });

            const data = response.data;
            console.log(data);
            console.log(`Max results requested: ${MAX_RESULTS}, Received: ${data.works.length}`);
            
            // Check if there are results
            if(!data.works || data.works.length === 0){
                throw new Error("No books found for this search.");
            }
            
            // Clear previous results and show loading
            const appDiv = document.getElementById("app");
            appDiv.innerHTML = '';
            const loadingDiv = document.getElementById("loading");
            loadingDiv.style.display = 'block';
            
            // Create all cards with Promises to wait for image loading
            const cardPromises = data.works.map((work) => {
                return new Promise((resolve) => {
                    // Card
                    const card = document.createElement("div");
                    card.className = "book-card";
                    card.style.opacity = "0";
                    
                    // Title
                    const titleElement = document.createElement("h3");
                    titleElement.textContent = work.title;
                    titleElement.style.display = "block";
                    
                    // Image with _.get for safe access
                    const imgElement = document.createElement("img");
                    const coverId = _.get(work, 'cover_id') || _.get(work, 'cover_edition_key');
                    
                    if (coverId) {
                        if (_.get(work, 'cover_id')) {
                            imgElement.src = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
                        } else {
                            imgElement.src = `https://covers.openlibrary.org/b/olid/${coverId}-M.jpg`;
                        }
                    } else {
                        imgElement.src = `https://openlibrary.org/images/icons/avatar_book-sm.png`;
                    }
                    
                    imgElement.alt = _.get(work, 'title', 'Book');
                    
                    // When image is loaded
                    imgElement.onload = () => {
                        resolve(card);
                    };
                    
                    // If image fails, use placeholder and resolve anyway
                    imgElement.onerror = function() {
                        this.src = "https://openlibrary.org/images/icons/avatar_book-lg.png";
                        this.onload = () => resolve(card);
                    };
                    
                    // Author with _.get for safe access
                    const authorElement = document.createElement("p");
                    const authorName = _.get(work, 'authors[0].name', 'Unknown author');
                    authorElement.textContent = authorName;
                    authorElement.style.display = "block";
                    
                    card.appendChild(titleElement);
                    card.appendChild(imgElement);
                    card.appendChild(authorElement);
                    
                    // Add click listener to show description
                    card.addEventListener('click', () => showBookDescription(work));
                });
            });
            
            // Wait for all images to load
            const cards = await Promise.all(cardPromises);
            
            // Hide loading and show cards
            loadingDiv.style.display = 'none';
            appDiv.innerHTML = '';
            cards.forEach((card, index) => {
                appDiv.appendChild(card);
                // Staggered fade-in animation
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease-in';
                    card.style.opacity = "1";
                }, index * 50);
            });
            
            // Add class to body for layout adjustment AFTER cards are in DOM
            // Use setTimeout to trigger after the DOM has updated
            setTimeout(() => {
                document.body.classList.add('has-results');
            }, 50);
        }
        catch(error){
            console.error(error);
            // Show error in loading div
            const loadingDiv = document.getElementById("loading");
            loadingDiv.style.display = 'block';
            
            // Custom error messages
            let errorMessage = error.message;
            if (error.code === 'ECONNABORTED') {
                errorMessage = 'Server too slow. Please try again.';
            } else if (error.response?.status === 404) {
                errorMessage = 'No books found for this search.';
            } else if (!navigator.onLine) {
                errorMessage = 'No internet connection.';
            }
            
            loadingDiv.innerHTML = `⚠️ ${errorMessage}`;
            loadingDiv.style.color = '#c00';
            loadingDiv.style.background = '#ffe0e0';
            loadingDiv.style.padding = '1rem 2rem';
            loadingDiv.style.borderRadius = '10px';
            
            // Hide error after 5 seconds
            setTimeout(() => {
                loadingDiv.style.display = 'none';
                loadingDiv.style.background = '';
                loadingDiv.style.padding = '';
                loadingDiv.style.borderRadius = '';
                loadingDiv.style.color = '';
                loadingDiv.innerHTML = '⏳ Loading...';
            }, 5000);
            
            document.body.classList.remove('has-results');
            // Clear app div
            const appDiv = document.getElementById("app");
            appDiv.innerHTML = '';
        }
    }
}

// Function to show book description in a modal
async function showBookDescription(work) {
    try {
        // Create or retrieve the modal
        let modal = document.getElementById('book-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'book-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="modal-body"></div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Click on X to close
            modal.querySelector('.close').addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            // Click outside modal to close
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // Show loading
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = '<p style="text-align: center; padding: 2rem;">⏳ Loading...</p>';
        modal.style.display = 'block';
        
        // Use axios to retrieve book details
        const bookKey = work.key; // e.g.: "/works/OL45804W"
        const response = await api.get(`${bookKey}.json`);
        
        const bookDetails = response.data;
        
        // Use _.get for safe data access
        const description = _.get(bookDetails, 'description.value') || 
                           _.get(bookDetails, 'description') || 
                           'Description not available';
        
        // Authors with _.get
        const authorsList = _.get(work, 'authors', []);
        const authors = authorsList.length > 0 
            ? authorsList.map(a => _.get(a, 'name', 'Unknown')).join(', ')
            : 'Unknown author';
        
        // Publication year with _.get
        const year = _.get(bookDetails, 'first_publish_date') || 
                     _.get(work, 'first_publish_year') || 
                     'Unknown year';
        
        // Populate the modal
        modalBody.innerHTML = `
            <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 300px;">
                    <h2 style="color: #667eea; margin-bottom: 1rem;">${work.title}</h2>
                    <p style="color: #666; margin-bottom: 0.5rem;"><strong>Author:</strong> ${authors}</p>
                    <p style="color: #666; margin-bottom: 1rem;"><strong>Year:</strong> ${year}</p>
                    <h3 style="color: #764ba2; margin-bottom: 0.5rem;">Description</h3>
                    <p style="color: #333; line-height: 1.6; text-align: justify;">${description}</p>
                </div>
            </div>
        `;
        
    } catch (error) {
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div style="background: #ffe6e6; border: 2px solid #ff4444; border-radius: 10px; padding: 1.5rem; margin: 1rem;">
                <p style="color: #cc0000; font-weight: bold;">⚠️ Error loading details</p>
                <p style="color: #666;">${error.message}</p>
            </div>
        `;
    }
}
