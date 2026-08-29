// scroll event to show/hide the back to top button dynamically -------
document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("backToTopBtn");
   // backToTopBtn.addEventListener("click", goToTop);
  
    window.onscroll = function() {
      if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 20) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    };
  
    button.onclick = function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    const goToTop = () => {
      document.body.scrollIntoView({
        behavior: "smooth"
      });
    };
    
  });

  // Add event listeners to all "Copy" buttons
document.querySelectorAll('.copy-button').forEach(button => {
  button.addEventListener('click', () => {
    // Find the <code> element inside the same container
    const codeBlock = button.previousElementSibling.querySelector('code');
    const codeText = codeBlock.textContent;

    // Copy the code text to the clipboard
    navigator.clipboard.writeText(codeText).then(() => {
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000); // Reset text after 2 seconds
    });
  });
});
