
function goTo(page) {
  window.location.href = page;
};
// Sample data for books
const books = [
  {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "fiction",
      price: 12.99,
      image: "https://via.placeholder.com/250x300?text=The+Great+Gatsby"
  },
  {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "fiction",
      price: 10.99,
      image: "https://via.placeholder.com/250x300?text=To+Kill+a+Mockingbird"
  },
  {
      id: 3,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "non-fiction",
      price: 15.99,
      image: "https://via.placeholder.com/250x300?text=Sapiens"
  },
  {
      id: 4,
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      genre: "science",
      price: 14.99,
      image: "https://via.placeholder.com/250x300?text=A+Brief+History+of+Time"
  },
  {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "fiction",
      price: 11.99,
      image: "https://via.placeholder.com/250x300?text=The+Hobbit"
  },
  {
      id: 6,
      title: "Cosmos",
      author: "Carl Sagan",
      genre: "science",
      price: 13.99,
      image: "https://via.placeholder.com/250x300?text=Cosmos"
  },
  {
      id: 7,
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      genre: "history",
      price: 9.99,
      image: "https://via.placeholder.com/250x300?text=The+Diary+of+a+Young+Girl"
  },
  {
      id: 8,
      title: "Where the Wild Things Are",
      author: "Maurice Sendak",
      genre: "children",
      price: 8.99,
      image: "https://via.placeholder.com/250x300?text=Where+the+Wild+Things+Are"
  }
];

// Sample data for events
const events = [
  {
      title: "Author Reading: New Releases",
      date: "June 15, 2023",
      time: "6:00 PM",
      description: "Join us for an evening with local authors reading from their latest works."
  },
  {
      title: "Children's Story Hour",
      date: "Every Saturday",
      time: "10:00 AM",
      description: "Bring your little ones for stories, songs, and fun activities."
  },
  {
      title: "Book Club Meeting",
      date: "July 5, 2023",
      time: "7:00 PM",
      description: "This month we're discussing 'The Midnight Library' by Matt Haig."
  }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load books on books.html page
  if (document.querySelector('.book-grid')) {
      displayBooks(books);
      setupFilterButtons();
      setupSearch();
  }

  // Load events on home page
  if (document.querySelector('.event-list')) {
      displayEvents();
  }

  // Setup contact form
  if (document.querySelector('.contact-form')) {
      setupContactForm();
  }
});

// Display books in the grid
function displayBooks(booksToDisplay) {
  const bookContainer = document.getElementById('book-container');
  bookContainer.innerHTML = '';

  if (booksToDisplay.length === 0) {
      bookContainer.innerHTML = '<p class="no-results">No books found matching your criteria.</p>';
      return;
  }

  booksToDisplay.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <div class="book-info">
              <h3>${book.title}</h3>
              <p class="author">by ${book.author}</p>
              <p class="price">$${book.price.toFixed(2)}</p>
              <button class="btn" onclick="addToCart(${book.id})">Add to Cart</button>
          </div>
      `;
      bookContainer.appendChild(bookCard);
  });
}

// Setup filter buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          this.classList.add('active');
          
          const category = this.dataset.category;
          filterBooks(category);
      });
  });
}

// Filter books by category
function filterBooks(category) {
  const resultsTitle = document.getElementById('results-title');
  
  if (category === 'all') {
      displayBooks(books);
      resultsTitle.textContent = 'Featured Books';
      return;
  }
  
  const filteredBooks = books.filter(book => book.genre === category);
  displayBooks(filteredBooks);
  resultsTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Books`;
}

// Setup search functionality
function setupSearch() {
  const searchForm = document.getElementById('search-form');
  
  searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchInput = document.getElementById('search-input');
      const searchTerm = searchInput.value.toLowerCase().trim();
      
      if (searchTerm === '') {
          displayBooks(books);
          document.getElementById('results-title').textContent = 'Featured Books';
          return;
      }
      
      const results = books.filter(book => 
          book.title.toLowerCase().includes(searchTerm) || 
          book.author.toLowerCase().includes(searchTerm) ||
          book.genre.toLowerCase().includes(searchTerm)
      );
      
      displayBooks(results);
      document.getElementById('results-title').textContent = `Search Results for "${searchTerm}"`;
  });
}

// Display events
function displayEvents() {
  const eventContainer = document.getElementById('event-container');
  
  events.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.className = 'event-card';
      eventCard.innerHTML = `
          <h3>${event.title}</h3>
          <p class="date">${event.date} at ${event.time}</p>
          <p>${event.description}</p>
          <button class="btn">RSVP</button>
      `;
      eventContainer.appendChild(eventCard);
  });
}

// Setup contact form
function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
  });
}

// Add to cart function (simplified)
function addToCart(bookId) {
  const book = books.find(b => b.id === bookId);
  alert(`Added "${book.title}" to your cart!`);
  // In a real app, you would add this to a cart array or send to server
}