/**
* Template Name: AgriCulture
* Template URL: https://bootstrapmade.com/agriculture-bootstrap-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${selectHeader.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   * Disabled - using manually defined indicators
   */
  /*
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });
  */

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * News Management System
   */
  const NewsManager = {
    // Configuration
    carouselMaxItems: 3,
    latestNewsMaxItems: 3,
    blogPageMaxItems: 6,
    currentPage: 1,
    itemsPerPage: 6,
    
    // Initial news data (will be sorted by date in init)
    newsItems: [
      {
        id: 9,
        title: "RAB Leads Harmonization of Irrigation Management Manuals under the OMIS Project",
        excerpt: "The Rwanda Agriculture and Animal Resources Development Board (RAB), in collaboration with HoReCo and YEAN under the OMIS Project",
        date: "2026-05-08",
        author: "Alexis Nyandwi",
        category: "HoReCo ",
        image: "assets/img/blog/blog-9.jpeg",
        detailUrl: "blog-details-9.html"
      },
      {
        id: 8,
        title: "KABOKU Cooperative Farmers Double Maize Yields Through HoReCo Support Under OMIS Project",
        excerpt: "Farmers of KABOKU Cooperative in Kagitumba Sector, Nyagatare District, are celebrating a major milestone in maize production after increasing yields from an average of 3 tonnes per hectare to around 8 tonnes per hectare in Season 2026A",
        date: "2026-04-23",
        author: "Alexis Nyandwi",
        category: "HoReCo",
        image: "assets/img/blog/blog-8.jpeg",
        detailUrl: "blog-details-8.html"
      },
      {
        id: 1,
        title: "HoReCo Capacity Building Program Strengthens Reporting and Coordination for OMIS Project Implementation",
        excerpt: "HoReCo successfully convened District Project Coordinators under the OMIS Project for training aimed at strengthening reporting systems and enhancing project implementation.",
        date: "2026-04-17",
        author: "Alexis Nyandwi",
        category: "OMIS",
        image: "assets/img/blog/blog-1.jpeg",
        detailUrl: "blog-details-1.html"
      },
      {
        id: 2,
        title: "Validation of Quarterly Report for Lot 2 under the OMIS Project in Huye District",
        excerpt: "Successful validation of quarterly report for Lot 2 under the OMIS Project in Huye District, marking another milestone in project implementation.",
        date: "2026-03-31",
        author: "Alexis Nyandwi",
        category: "OMMIS",
        image: "assets/img/blog/blog-2.jpeg",
        detailUrl: "blog-details-2.html"
      },
      {
        id: 3,
        title: "RAB Evaluation Mission Highlights Performance Review of ETI Mpanga and Nasho GFI Irrigation Schemes under HoReCo Management",
        excerpt: "RAB Evaluation Mission highlights performance review of ETI Mpanga and Nasho GFI Irrigation Schemes under HoReCo Management.",
        date: "2026-03-11",
        author: "Alexis Nyandwi",
        category: "OMIS",
        image: "assets/img/blog/blog-3.jpeg",
        detailUrl: "blog-details-3.html"
      },
      {
        id: 5,
        title: "High-Level Delegation Visits ETI Mpanga Irrigation Scheme Ahead of Official Handover",
        excerpt: "the ETI Mpanga Irrigation Scheme in Kirehe District hosted a high-level official visit led by Hon. Telesphore Ndabamenye, Minister of Agriculture and Animal Resources (MINAGRI), and Dr. Jimmy Gasore, Minister of Infrastructure. They were accompanied by Pudence Rubingisa, Governor of Eastern Province, H.E. Mridu Pawan Das, High Commissioner of India to Rwanda, together with other distinguished guests.",
        date: "2026-03-25",
        author: "Alexis Nyandwi",
        category: "OMIS",
        image: "assets/img/blog/blog-5.jpeg",
        detailUrl: "blog-details-5.html"
      },
      {
        id: 4,
          title: "Dr. Uwamahoro Commends HoReCo Farm for Excellence in Potato Seed Production*",
          excerpt: "Acting Director General of the Rwanda Agriculture and Animal Resources Board (RAB), visited the RAB/Kinigi site to evaluate the performance of HoReCo Farm, one of the key partners supporting Rwanda’s agricultural development agenda.",
        date: "2026-01-22",
        author: "Alexis Nyandwi",
        category: "OMIS",
        image: "assets/img/blog/blog-4.jpeg",
        detailUrl: "blog-details-4.html"
      },
      {
        id: 6,
        title: "SNV Rwanda Delegation Visits YEA-R Project Sites in Karongi District",
        excerpt: "Today, HoReCo Rwanda welcomed a delegation from SNV Rwanda, led by Country Director Eleanor Hartzell, to the YEA-R Project sites in Karongi District. The visit underscored the strong partnership and shared commitment to expanding inclusive and sustainable economic opportunities for young women, men, and persons with disabilities in Rwanda’s horticulture sector.",
        date: "2025-12-09",
        author: "Alexis Nyandwi",
        category: "SNV",
        image: "assets/img/blog/blog-6.jpeg",
        detailUrl: "blog-details-6.html"
      }
    ],

    // Sort news items by date (newest first) - enhanced for month/date priority
    sortNewsByDate() {
      this.newsItems.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        // Primary sort: by year
        const yearDiff = dateB.getFullYear() - dateA.getFullYear();
        if (yearDiff !== 0) return yearDiff;
        
        // Secondary sort: by month
        const monthDiff = dateB.getMonth() - dateA.getMonth();
        if (monthDiff !== 0) return monthDiff;
        
        // Tertiary sort: by day
        return dateB.getDate() - dateA.getDate();
      });
    },

    // Get formatted date string
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },

    // Get day and month for display
    getDayAndMonth(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
      const month = months[date.getMonth()];
      return { day, month };
    },

    // Add new news item with automatic latest-first positioning
    addNewsItem(newsItem) {
      newsItem.id = Date.now(); // Generate unique ID
      this.newsItems.push(newsItem); // Add to array
      this.sortNewsByDate(); // Sort to ensure latest is first
      this.resetPagination(); // Reset to first page when new item is added
      this.updateAllNewsSections();
      this.updateAllSectionsWithLatestNews(); // Update all sections with latest news
    },

    // Update all sections (slideshow, latest news, blog) with latest news
    updateAllSectionsWithLatestNews() {
      this.updateSlideshow();
      this.updateLatestNewsSection();
      this.updateBlogPage();
    },

    // Update slideshow with latest 3 news
    updateSlideshow() {
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.dot');
      const latestNews = this.newsItems.slice(0, 3); // Get top 3 latest news
      
      if (slides.length === 0) return;
      
      // Update each slide with latest news
      latestNews.forEach((news, index) => {
        if (slides[index]) {
          const slide = slides[index];
          const isActive = index === 0 ? 'active' : '';
          
          // Update slide content
          slide.classList.toggle('active', isActive);
          slide.querySelector('img').src = news.image;
          slide.querySelector('img').alt = news.title;
          slide.querySelector('h3').textContent = news.title;
          slide.querySelector('p').textContent = news.excerpt;
          slide.querySelector('.btn-cta').href = news.detailUrl;
        }
        
        // Update dots
        if (dots[index]) {
          dots[index].classList.toggle('active', index === 0);
        }
      });
      
      // Reset slideshow to first slide (latest news)
      currentSlideIndex = 1;
      resetAutoSlide();
    },

    // Update Latest News section with latest 3 news
    updateLatestNewsSection() {
      const latestNewsContainer = document.querySelector('#recent-posts .row');
      if (!latestNewsContainer) return;
      
      const latestNews = this.newsItems.slice(0, 3); // Get top 3 latest news
      
      // Clear existing content
      latestNewsContainer.innerHTML = '';
      
      // Create and append news items
      latestNews.forEach((news, index) => {
        const { day, month } = this.getDayAndMonth(news.date);
        const delay = (index + 1) * 100;
        
        const newsHTML = `
          <div class="col-xl-4 col-md-6">
            <div class="post-item position-relative h-100" data-aos="fade-up" data-aos-delay="${delay}">
              <div class="post-img position-relative overflow-hidden">
                <img src="${news.image}" class="img-fluid" alt="">
                <span class="post-date">${month} ${day}</span>
              </div>
              <div class="post-content d-flex flex-column">
                <h3 class="post-title">${news.title}</h3>
                <div class="meta d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-person"></i> <span class="ps-2">${news.author}</span>
                  </div>
                  <span class="px-3 text-black-50">/</span>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-folder2"></i> <span class="ps-2">${news.category}</span>
                  </div>
                </div>
                <hr>
                <a href="${news.detailUrl}" class="readmore stretched-link"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
        `;
        
        latestNewsContainer.insertAdjacentHTML('beforeend', newsHTML);
      });
    },

    
    // Update latest news section on homepage
    updateLatestNews() {
      const latestNewsContainer = document.querySelector('#recent-posts .row');
      if (!latestNewsContainer) return;

      const latestNewsItems = this.newsItems.slice(0, this.latestNewsMaxItems);
      const existingPosts = latestNewsContainer.querySelectorAll('.col-xl-4, .col-md-6');
      
      latestNewsItems.forEach((item, index) => {
        const { day, month } = this.getDayAndMonth(item.date);
        
        if (existingPosts[index]) {
          // Update existing post
          const post = existingPosts[index];
          const postItem = post.querySelector('.post-item');
          const delay = (index + 1) * 100;
          
          postItem.setAttribute('data-aos-delay', delay);
          post.querySelector('.post-img img').src = item.image;
          post.querySelector('.post-date').textContent = `${month} ${day}`;
          post.querySelector('.post-title').textContent = item.title;
          post.querySelector('.meta').innerHTML = `
            <div class="d-flex align-items-center">
              <i class="bi bi-person"></i> <span class="ps-2">${item.author}</span>
            </div>
            <span class="px-3 text-black-50">/</span>
            <div class="d-flex align-items-center">
              <i class="bi bi-folder2"></i> <span class="ps-2">${item.category}</span>
            </div>
          `;
          post.querySelector('.readmore').href = item.detailUrl;
        }
      });
    },

    // Update blog page with pagination
    updateBlogPage() {
      const blogContainer = document.querySelector('#blog-posts-2 .row');
      if (!blogContainer) return;

      // Calculate pagination
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      const paginatedItems = this.newsItems.slice(startIndex, endIndex);
      
      // Clear existing articles
      blogContainer.innerHTML = '';
      
      // Create articles for current page
      paginatedItems.forEach((item, index) => {
        const { day, month } = this.getDayAndMonth(item.date);
        
        const articleHTML = `
          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="${index * 100}">
            <article class="position-relative h-100">
              <div class="post-img position-relative overflow-hidden">
                <img src="${item.image}" class="img-fluid" alt="">
              </div>
              <div class="meta d-flex align-items-end">
                <span class="post-date"><span>${day}</span>${month}</span>
                <div class="d-flex align-items-center">
                  <i class="bi bi-person"></i> <span class="ps-2">${item.author}</span>
                </div>
                <span class="px-3 text-black-50">/</span>
                <div class="d-flex align-items-center">
                  <i class="bi bi-folder2"></i> <span class="ps-2">${item.category}</span>
                </div>
              </div>
              <div class="post-content d-flex flex-column">
                <h3 class="post-title">${item.title}</h3>
                <a href="${item.detailUrl}" class="readmore stretched-link"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
              </div>
            </article>
          </div>
        `;
        
        blogContainer.insertAdjacentHTML('beforeend', articleHTML);
      });
      
      // Update pagination
      this.updatePagination();
    },

    // Update pagination controls
    updatePagination() {
      const paginationContainer = document.querySelector('#pagination-container');
      if (!paginationContainer) return;
      
      // Limit to only 2 pages
      const totalPages = 2;
      
      // Clear existing pagination
      paginationContainer.innerHTML = '';
      
      // Previous button
      const prevLi = document.createElement('li');
      prevLi.innerHTML = `<a href="#" ${this.currentPage === 1 ? 'class="disabled"' : ''}><i class="bi bi-chevron-left"></i></a>`;
      paginationContainer.appendChild(prevLi);
      
      // Page numbers (only show 1 and 2)
      for (let i = 1; i <= totalPages; i++) {
        const pageLi = document.createElement('li');
        pageLi.innerHTML = `<a href="#" ${i === this.currentPage ? 'class="active"' : ''}>${i}</a>`;
        paginationContainer.appendChild(pageLi);
      }
      
      // Next button
      const nextLi = document.createElement('li');
      nextLi.innerHTML = `<a href="#" ${this.currentPage === totalPages ? 'class="disabled"' : ''}><i class="bi bi-chevron-right"></i></a>`;
      paginationContainer.appendChild(nextLi);
      
      // Add click handlers
      this.attachPaginationHandlers();
    },

    // Attach click handlers to pagination
    attachPaginationHandlers() {
      const paginationContainer = document.querySelector('#pagination-container');
      if (!paginationContainer) return;
      
      paginationContainer.addEventListener('click', (e) => {
        e.preventDefault();
        
        const target = e.target.closest('a');
        if (!target || target.classList.contains('disabled')) return;
        
        // Limit to only 2 pages
        const totalPages = 2;
        
        if (target.querySelector('.bi-chevron-left')) {
          // Previous page
          if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
          }
        } else if (target.querySelector('.bi-chevron-right')) {
          // Next page
          if (this.currentPage < totalPages) {
            this.goToPage(this.currentPage + 1);
          }
        } else if (target.textContent && !isNaN(parseInt(target.textContent))) {
          // Page number
          const pageNumber = parseInt(target.textContent);
          if (pageNumber >= 1 && pageNumber <= totalPages) {
            this.goToPage(pageNumber);
          }
        }
      });
    },

    // Navigate to specific page
    goToPage(pageNumber) {
      // Limit to only 2 pages
      const totalPages = 2;
      
      if (pageNumber < 1 || pageNumber > totalPages) return;
      
      this.currentPage = pageNumber;
      this.updateBlogPage();
      
      // Scroll to top of blog posts
      const blogSection = document.querySelector('#blog-posts-2');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    // Update all news sections
    updateAllNewsSections() {
      this.updateCarousel();
      this.updateLatestNews();
      this.updateBlogPage();
    },

    // Reset pagination to first page (useful when adding new items)
    resetPagination() {
      this.currentPage = 1;
    },

    // Initialize news management with latest-first system
    init() {
      this.sortNewsByDate(); // Ensure latest news is first
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.updateAllNewsSections();
          this.updateAllSectionsWithLatestNews(); // Initialize all sections with latest news
        });
      } else {
        this.updateAllNewsSections();
        this.updateAllSectionsWithLatestNews(); // Initialize all sections with latest news
      }
    }
  };

  // Initialize news management system
  NewsManager.init();

  // Make NewsManager available globally for adding new items
  window.NewsManager = NewsManager;

  // Demo function to test adding new news items with latest-first system
  window.addTestNews = function() {
    const newNewsItem = {
      title: "New HoReCo Initiative Launches Digital Agriculture Platform",
      excerpt: "HoReCo introduces cutting-edge digital platform to revolutionize farming practices and increase agricultural productivity across Rwanda.",
      date: new Date().toISOString().split('T')[0], // Today's date
      author: "HoReCo Team",
      category: "Innovation",
      image: "assets/img/blog/blog-1.jpeg", // Reuse existing image for demo
      detailUrl: "#"
    };
    
    NewsManager.addNewsItem(newNewsItem);
    console.log('New news item added! Latest news is now first in all sections.');
  };

  // Demo function to add news with specific date to test month/date priority
  window.addTestNewsWithDate = function(year, month, day) {
    const date = new Date(year, month - 1, day); // month is 0-indexed in JS
    const newNewsItem = {
      title: `Test News for ${date.toLocaleDateString()}`,
      excerpt: `This is a test news item created for ${date.toLocaleDateString()} to verify the latest-first sorting system works correctly.`,
      date: date.toISOString().split('T')[0],
      author: "Test System",
      category: "Testing",
      image: "assets/img/blog/blog-2.jpeg",
      detailUrl: "#"
    };
    
    NewsManager.addNewsItem(newNewsItem);
    console.log(`Added test news for ${date.toLocaleDateString()}. It should now appear first in all sections.`);
  };

  // Slideshow functionality
let currentSlideIndex = 1;
let slideInterval;

function showSlide(n) {
  const slides = document.getElementsByClassName('slide');
  const dots = document.getElementsByClassName('dot');
  
  if (n > slides.length) { currentSlideIndex = 1 }
  if (n < 1) { currentSlideIndex = slides.length }
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  
  // Remove active from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  
  // Show current slide and activate current dot
  slides[currentSlideIndex - 1].classList.add('active');
  dots[currentSlideIndex - 1].classList.add('active');
}

function changeSlide(n) {
  currentSlideIndex += n;
  showSlide(currentSlideIndex);
  resetAutoSlide();
}

function currentSlide(n) {
  currentSlideIndex = n;
  showSlide(currentSlideIndex);
  resetAutoSlide();
}

function autoSlide() {
  currentSlideIndex++;
  showSlide(currentSlideIndex);
}

function startAutoSlide() {
  slideInterval = setInterval(autoSlide, 3000); // Change slide every 3 seconds
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// Initialize slideshow when page loads
document.addEventListener('DOMContentLoaded', function() {
  showSlide(currentSlideIndex);
  startAutoSlide();
});

// Log instructions for testing
console.log('News Management System initialized!');
console.log('To add a test news item, run: addTestNews()');
console.log('To add a custom news item, run: NewsManager.addNewsItem({title, excerpt, date, author, category, image, detailUrl})');

})();