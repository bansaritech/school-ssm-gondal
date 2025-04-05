$(document).ready(function() {
    // Donation Modal
    const modal = document.getElementById('donation-modal');
    const donationBtn = document.querySelector('.donation-page-cta');
    const closeBtn = document.querySelector('.donation-modal-close');
    
    // Open modal when donation button is clicked
    donationBtn.onclick = function(e) {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }
    
    // Close modal when X is clicked
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Enable scrolling
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Enable scrolling
        }
    }
    
    // Handle form submission
    $('#donation-form').on('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        
        alert('Thank you for your donation! We will contact you shortly with payment instructions.');
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Enable scrolling
        this.reset(); // Reset form
    });
    
    // Handle donation list button clicks
    $('.donation-list-btn').on('click', function(e) {
        e.preventDefault();
        
        // Get the category from data attribute
        const category = $(this).data('category');
        
        // Open the donation modal
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling
        
        // Pre-select the category in the dropdown
        $('#donation-category option').each(function() {
            if ($(this).text() === category) {
                $(this).prop('selected', true);
            }
        });
        
        // Focus on the name field
        $('#donor-name').focus();
    });
});