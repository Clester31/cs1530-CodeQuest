// Get profile data from localStorage
const profileData = JSON.parse(localStorage.getItem('profileData'));

if (profileData) {
    // Update the profile information on the page
    document.getElementById('profile-name').textContent = profileData.name || 'No name provided';
    document.getElementById('profile-email').textContent = profileData.email || 'No email provided';
    document.getElementById('profile-username').textContent = profileData.username || 'No username provided';
} else {
    // If no profile data is found, display a message
    document.getElementById('profile-name').textContent = 'No data available';
    document.getElementById('profile-email').textContent = 'No data available';
    document.getElementById('profile-username').textContent = 'No data available';
}

// Log out functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    // Clear the profile data from localStorage
    localStorage.removeItem('profileData');
    // Redirect to the sign-up page
    window.location.href = 'index.html';
});
//back to home page functionality 
document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});
