// Simple JavaScript for click interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sneha Kelkar\'s portfolio loaded!');
    console.log('💡 Clean, minimalist design');
    console.log('🔍 Looking for clickable elements...');
    
    // Add click functionality to name
    const nameElement = document.querySelector('.name');
    console.log('Name element found:', nameElement);
    if (nameElement) {
        nameElement.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Name clicked! Navigating to about page...');
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                // Navigate to about page
                window.location.href = './about.html';
            }, 150);
        });
        console.log('Name click listener added');
    } else {
        console.log('❌ Name element not found!');
    }
    
    // Add click functionality to image
    const imageElement = document.querySelector('.profile-image');
    console.log('Image element found:', imageElement);
    if (imageElement) {
        imageElement.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Image clicked! Navigating to about page...');
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                // Navigate to about page
                window.location.href = './about.html';
            }, 150);
        });
        console.log('Image click listener added');
        
        // Add hover effect for image
        imageElement.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        imageElement.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Also add click to the image container
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Image container clicked!');
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                // Navigate to about page
                window.location.href = './about.html';
            }, 150);
        });
    }
});
