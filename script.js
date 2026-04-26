// --- FITUR REALTIME ANNOUNCEMENT ---

// 1. User mendengarkan pesan global secara realtime
db.ref('announcements/global').on('value', (snapshot) => {
    const msg = snapshot.val();
    if (msg && msg.active) {
        showPopup("PENGUMUMAN GLOBAL", msg.text);
    }
});

// 2. User mendengarkan pesan private (Individu)
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    db.ref('messages/' + currentUser.username).on('value', (snapshot) => {
        const msg = snapshot.val();
        if (msg) {
            showPopup("PESAN DARI OWNER", msg.text);
            // Hapus pesan setelah tampil agar tidak muncul terus
            db.ref('messages/' + currentUser.username).remove();
        }
    });
}

// --- FITUR ADMIN REALTIME ---

// Fungsi Kirim Announcement (Dipanggil di Admin Panel)
function sendGlobal() {
    const msgText = prompt("Isi Pengumuman Global:");
    if(msgText) {
        db.ref('announcements/global').set({
            text: msgText,
            active: true,
            time: Date.now()
        });
        alert("Pesan Global Terkirim!");
    }
}

// Fungsi Konfirmasi Pembayaran (Instan ke User)
function konfirmasiBayar(orderId, username) {
    db.ref('orders/' + orderId).update({ status: 'Selesai' });
    
    // Kirim pesan ke user tersebut bahwa sudah dikonfirmasi
    db.ref('messages/' + username).set({
        text: "Pembayaran Anda untuk Order #" + orderId + " telah DIKONFIRMASI! Terima kasih."
    });
}

// --- FUNGSI TAMBAHAN ---

function showPopup(title, message) {
    const modal = document.getElementById('annModal');
    if(modal) {
        document.getElementById('annTitle').innerText = title;
        document.getElementById('annBody').innerText = message;
        modal.style.display = 'block';
        
        // Mainkan suara notifikasi jika mau
        const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
        audio.play();
    }
}
