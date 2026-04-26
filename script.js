// Listener untuk Pesan Pop-up Realtime
if (typeof db !== 'undefined') {
    db.ref('announcements/global').on('value', (snapshot) => {
        const data = snapshot.val();
        const modal = document.getElementById('annModal');
        if (data && data.active && modal) {
            document.getElementById('annTitle').innerText = "PESAN DARI OWNER";
            document.getElementById('annBody').innerText = data.text;
            modal.style.display = 'block';
        }
    });
}

// Fungsi Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
