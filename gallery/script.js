/**
 * Premium Portfolio Gallery Component
 * Handles the dynamic rendering, fullscreen overlays, responsive column structure,
 * and double-tier modal transitions (gallery popup & image zoom preview lightbox).
 */

// 1. Categorized Gallery Data mapped to your directories
const galleries = {
    studio: [
        { src: "assets/Links/studio/studio_removed_page-0001.jpg", alt: "Studio Layout - Page 1" },
        { src: "assets/Links/studio/studio_removed_page-0002.jpg", alt: "Studio Layout - Page 2" },
        { src: "assets/Links/studio/studio_removed_page-0003.jpg", alt: "Studio Layout - Page 3" },
        { src: "assets/Links/studio/studio_removed_page-0004.jpg", alt: "Studio Layout - Page 4" },
        { src: "assets/Links/studio/studio_removed_page-0005.jpg", alt: "Studio Layout - Page 5" },
        { src: "assets/Links/studio/studio_removed_page-0006.jpg", alt: "Studio Layout - Page 6" },
        { src: "assets/Links/studio/studio_removed_page-0007.jpg", alt: "Studio Layout - Page 7" },
        { src: "assets/Links/studio/studio_removed_page-0008.jpg", alt: "Studio Layout - Page 8" },
        { src: "assets/Links/studio/studio_removed_page-0009.jpg", alt: "Studio Layout - Page 9" },
        { src: "assets/Links/studio/studio_removed_page-0010.jpg", alt: "Studio Layout - Page 10" },
        { src: "assets/Links/studio/studio_removed_page-0011.jpg", alt: "Studio Layout - Page 11" },
        { src: "assets/Links/studio/studio_removed_page-0012.jpg", alt: "Studio Layout - Page 12" },
        { src: "assets/Links/studio/studio_removed_page-0013.jpg", alt: "Studio Layout - Page 13" },
        { src: "assets/Links/studio/studio_removed_page-0014.jpg", alt: "Studio Layout - Page 14" },
        { src: "assets/Links/studio/studio_removed_page-0015.jpg", alt: "Studio Layout - Page 15" },
        { src: "assets/Links/studio/studio_removed_page-0016.jpg", alt: "Studio Layout - Page 16" }
    ],
    "bed-1": [
        { src: "assets/Links/bed-1/bed_1_removed_page-0001.jpg", alt: "1 Bedroom Layout - Page 1" },
        { src: "assets/Links/bed-1/bed_1_removed_page-0002.jpg", alt: "1 Bedroom Layout - Page 2" },
        { src: "assets/Links/bed-1/bed_1_removed_page-0003.jpg", alt: "1 Bedroom Layout - Page 3" },
        { src: "assets/Links/bed-1/bed_1_removed_page-0004.jpg", alt: "1 Bedroom Layout - Page 4" },
        { src: "assets/Links/bed-1/bed_1_removed_page-0005.jpg", alt: "1 Bedroom Layout - Page 5" },
        { src: "assets/Links/bed-1/bed_1_removed_page-0006.jpg", alt: "1 Bedroom Layout - Page 6" },
        { src: "assets/Links/bed-1/bed_1_removed_page-0007.jpg", alt: "1 Bedroom Layout - Page 7" }
    ],
    "bed-2": [
        { src: "assets/Links/bed-2/bed_2_removed_page-0001.jpg", alt: "2 Bedroom Layout - Page 1" },
        { src: "assets/Links/bed-2/bed_2_removed_page-0002.jpg", alt: "2 Bedroom Layout - Page 2" },
        { src: "assets/Links/bed-2/bed_2_removed_page-0003.jpg", alt: "2 Bedroom Layout - Page 3" },
        { src: "assets/Links/bed-2/bed_2_removed_page-0004.jpg", alt: "2 Bedroom Layout - Page 4" },
        { src: "assets/Links/bed-2/bed_2_removed_page-0005.jpg", alt: "2 Bedroom Layout - Page 5" },
        { src: "assets/Links/bed-2/bed_2_removed_page-0006.jpg", alt: "2 Bedroom Layout - Page 6" },
        { src: "assets/Links/bed-2/bed_2_removed_page-0007.jpg", alt: "2 Bedroom Layout - Page 7" },
        { src: "assets/Links/bed-2/bed_2_removed_page-0008.jpg", alt: "2 Bedroom Layout - Page 8" }
    ],
    "bed-3": [
        { src: "assets/Links/bed-3/bed_3_removed_page-0001.jpg", alt: "3 Bedroom Layout - Page 1" },
        { src: "assets/Links/bed-3/bed_3_removed_page-0002.jpg", alt: "3 Bedroom Layout - Page 2" },
        { src: "assets/Links/bed-3/bed_3_removed_page-0003.jpg", alt: "3 Bedroom Layout - Page 3" },
        { src: "assets/Links/bed-3/bed_3_removed_page-0004.jpg", alt: "3 Bedroom Layout - Page 4" },
        { src: "assets/Links/bed-3/bed_3_removed_page-0005.jpg", alt: "3 Bedroom Layout - Page 5" },
        { src: "assets/Links/bed-3/bed_3_removed_page-0006.jpg", alt: "3 Bedroom Layout - Page 6" }
    ]
};

// 2. DOM Elements and State Selection
const portfolioModal = document.getElementById('portfolioModal');
const lightboxModal = document.getElementById('lightboxModal');
const galleryGrid = document.getElementById('galleryGrid');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

let currentCategory = 'studio';
let currentImageIndex = 0;

// 3. Dynamic Card Generation based on selected category (left-to-right round-robin distribution)
function generateGalleryGrid(category) {
    if (!galleryGrid) return;
    
    // Clear any existing content
    galleryGrid.innerHTML = '';

    const images = galleries[category] || [];

    if (images.length === 0) {
        galleryGrid.innerHTML = '<div class="no-images-note">No layout sheets found.</div>';
        return;
    }

    // Determine number of columns dynamically based on window width
    let numCols = 4;
    if (window.innerWidth <= 480) numCols = 1;
    else if (window.innerWidth <= 768) numCols = 2;
    else if (window.innerWidth <= 1200) numCols = 3;

    // Create column elements inside the grid wrapper
    const cols = [];
    for (let i = 0; i < numCols; i++) {
        const col = document.createElement('div');
        col.className = 'gallery-grid-column';
        galleryGrid.appendChild(col);
        cols.push(col);
    }

    // Distribute images round-robin (1, 2, 3, 4, then 5, 6, 7, 8...)
    images.forEach((imgData, index) => {
        const colIndex = index % numCols;
        const col = cols[colIndex];

        // Create card container
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View ${imgData.alt}`);

        // Build HTML template
        card.innerHTML = `
            <div class="gallery-card-image-wrap">
                <img src="${imgData.src}" alt="${imgData.alt}" loading="lazy">
                <div class="gallery-card-overlay">
                    <span class="gallery-card-tag"><i class="fa-solid fa-magnifying-glass-plus"></i> View Plan</span>
                </div>
            </div>
            <div class="gallery-card-info">
                <h3 class="gallery-card-title">${imgData.alt}</h3>
                <span class="gallery-card-tag">${category.toUpperCase().replace('-', ' ')}</span>
            </div>
        `;

        // Click event to open Lightbox Zoom
        card.addEventListener('click', () => {
            openLightbox(index);
        });

        // Keypress (Enter/Space) event for accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });

        col.appendChild(card);
    });
}

// 4. Modal Interactions: Portfolio Gallery
function openPortfolioPopup(category) {
    if (!portfolioModal) return;
    
    currentCategory = category;

    // Set modal title depending on category
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        let titleText = "NORTH43 Floor Plans";
        if (category === "studio") titleText = "NORTH43 - Studio Layouts";
        else if (category === "bed-1") titleText = "NORTH43 - 1 Bed Layouts";
        else if (category === "bed-2") titleText = "NORTH43 - 2 Bed Layouts";
        else if (category === "bed-3") titleText = "NORTH43 - 3 Bed Layouts";
        modalTitle.textContent = titleText;
    }

    // Populate masonry grid with corresponding layouts
    generateGalleryGrid(category);
    
    portfolioModal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closePortfolioPopup() {
    if (!portfolioModal) return;
    portfolioModal.classList.remove('active');
    // Only remove modal-open from body if the lightbox is also closed
    if (!lightboxModal.classList.contains('active')) {
        document.body.classList.remove('modal-open');
    }
}

// 5. Modal Interactions: Lightbox Zoom Preview & Slider Navigation
function openLightbox(index) {
    if (!lightboxModal || !lightboxImg || !lightboxCaption) return;
    
    currentImageIndex = index;
    const images = galleries[currentCategory] || [];
    const imgData = images[currentImageIndex];
    if (!imgData) return;

    lightboxImg.src = imgData.src;
    lightboxImg.alt = imgData.alt;
    lightboxCaption.textContent = imgData.alt;
    
    lightboxModal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    // If main gallery modal is still open, keep scroll lock. Otherwise release it.
    if (!portfolioModal.classList.contains('active')) {
        document.body.classList.remove('modal-open');
    }
}

// 5.1 Slide through images
function showNextImage() {
    const images = galleries[currentCategory] || [];
    if (images.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

function showPrevImage() {
    const images = galleries[currentCategory] || [];
    if (images.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const images = galleries[currentCategory] || [];
    const imgData = images[currentImageIndex];
    if (!imgData) return;

    // Smooth fade transition
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = imgData.src;
        lightboxImg.alt = imgData.alt;
        lightboxCaption.textContent = imgData.alt;
        lightboxImg.style.opacity = '1';
    }, 150);
}

// 6. Outside Click Closes Modals
if (portfolioModal) {
    portfolioModal.addEventListener('click', (e) => {
        // Closes if the overlay wrapper itself is clicked, not its content child
        if (e.target === portfolioModal) {
            closePortfolioPopup();
        }
    });
}

if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        // Closes if the overlay wrapper itself is clicked, not the image/caption
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
}

// 7. Keydown and Arrow Controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Lightbox sits on top, so close it first
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            closeLightbox();
        } else if (portfolioModal && portfolioModal.classList.contains('active')) {
            closePortfolioPopup();
        }
    }

    // Left & Right arrow sliding if lightbox is active
    if (lightboxModal && lightboxModal.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// 8. Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    // Attach click events to your floor-plan-circle elements dynamically
    document.querySelectorAll('.floor-plan-circle').forEach(circle => {
        circle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get category based on the text inside the circle container
            const textElement = circle.querySelector('.floor-plan-text');
            if (textElement) {
                const textVal = textElement.textContent.toLowerCase().trim();
                let category = "studio";
                
                if (textVal.includes("studio")) {
                    category = "studio";
                } else if (textVal.includes("1 bed")) {
                    category = "bed-1";
                } else if (textVal.includes("2 bed")) {
                    category = "bed-2";
                } else if (textVal.includes("3 bed")) {
                    category = "bed-3";
                }
                
                openPortfolioPopup(category);
            }
        });
    });

    // Lightbox Arrow Navigation Click events
    const prevArrow = document.querySelector('.lightbox-prev-btn');
    const nextArrow = document.querySelector('.lightbox-next-btn');
    
    if (prevArrow) {
        prevArrow.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid backdrop close trigger
            showPrevImage();
        });
    }
    if (nextArrow) {
        nextArrow.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid backdrop close trigger
            showNextImage();
        });
    }
});

// 9. Recalculate columns dynamically on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    if (portfolioModal && portfolioModal.classList.contains('active')) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            generateGalleryGrid(currentCategory);
        }, 150); // Debounce resize triggers
    }
});
