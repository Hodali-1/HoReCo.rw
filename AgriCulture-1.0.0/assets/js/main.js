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
    carouselMaxItems: 4,
    latestNewsMaxItems: 4,
    blogPageMaxItems: 6,
    
    // Initial news data (sorted by date, newest first)
    newsItems: [
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

    // Sort news items by date (newest first)
    sortNewsByDate() {
      this.newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));
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

    // Add new news item (removes oldest if exceeds max)
    addNewsItem(newsItem) {
      newsItem.id = Date.now(); // Generate unique ID
      this.newsItems.unshift(newsItem); // Add to beginning (newest)
      this.sortNewsByDate();
      this.updateAllNewsSections();
    },

    // Update carousel on homepage
    updateCarousel() {
      const carousel = document.querySelector('#hero-carousel .carousel-inner');
      if (!carousel) return;

      const carouselItems = this.newsItems.slice(0, this.carouselMaxItems);
      
      // Update existing carousel items or create new ones
      const existingItems = carousel.querySelectorAll('.carousel-item');
      
      carouselItems.forEach((item, index) => {
        const { day, month } = this.getDayAndMonth(item.date);
        const isActive = index === 0 ? 'active' : '';
        
        if (existingItems[index]) {
          // Update existing item
          const carouselItem = existingItems[index];
          carouselItem.classList.toggle('active', isActive);
          carouselItem.querySelector('img').src = item.image;
          carouselItem.querySelector('h3').textContent = item.title;
          carouselItem.querySelector('p').textContent = item.excerpt;
          carouselItem.querySelector('.meta').innerHTML = `
            <span>${this.formatDate(item.date)}</span> | <span>${item.author}</span> | <span>${item.category}</span>
          `;
          carouselItem.querySelector('.btn-cta').href = item.detailUrl;
        }
      });
      
      this.updateCarouselIndicators(carouselItems.length);
    },

    // Update carousel indicators
    updateCarouselIndicators(count) {
      const indicators = document.querySelector('#hero-carousel .carousel-indicators');
      if (!indicators) return;

      const existingIndicators = indicators.querySelectorAll('li');
      
      // Update existing indicators
      existingIndicators.forEach((indicator, index) => {
        if (index < count) {
          indicator.classList.toggle('active', index === 0);
          indicator.style.display = '';
        } else {
          indicator.style.display = 'none';
        }
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

    // Update blog page
    updateBlogPage() {
      const blogContainer = document.querySelector('#blog-posts-2 .row');
      if (!blogContainer) return;

      const blogItems = this.newsItems.slice(0, this.blogPageMaxItems);
      const existingArticles = blogContainer.querySelectorAll('.col-lg-4');
      
      blogItems.forEach((item, index) => {
        const { day, month } = this.getDayAndMonth(item.date);
        
        if (existingArticles[index]) {
          // Update existing article
          const article = existingArticles[index];
          const articleElement = article.querySelector('article');
          
          article.querySelector('.post-img img').src = item.image;
          article.querySelector('.post-date').innerHTML = `<span>${day}</span>${month}`;
          article.querySelector('.meta').innerHTML = `
            <span class="post-date"><span>${day}</span>${month}</span>
            <div class="d-flex align-items-center">
              <i class="bi bi-person"></i> <span class="ps-2">${item.author}</span>
            </div>
            <span class="px-3 text-black-50">/</span>
            <div class="d-flex align-items-center">
              <i class="bi bi-folder2"></i> <span class="ps-2">${item.category}</span>
            </div>
          `;
          article.querySelector('.post-title').textContent = item.title;
          article.querySelector('.readmore').href = item.detailUrl;
        }
      });
    },

    // Update all news sections
    updateAllNewsSections() {
      this.updateCarousel();
      this.updateLatestNews();
      this.updateBlogPage();
    },

    // Initialize news management
    init() {
      this.sortNewsByDate();
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.updateAllNewsSections();
        });
      } else {
        this.updateAllNewsSections();
      }
    }
  };

  // Initialize news management system
  NewsManager.init();

  // Make NewsManager available globally for adding new items
  window.NewsManager = NewsManager;

  // Demo function to test adding new news items
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
    console.log('New news item added! Oldest item has been removed if necessary.');
  };

  // Log instructions for testing
  console.log('News Management System initialized!');
  console.log('To add a test news item, run: addTestNews()');
  console.log('To add a custom news item, run: NewsManager.addNewsItem({title, excerpt, date, author, category, image, detailUrl})');

})();