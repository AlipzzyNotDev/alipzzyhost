// 1. SISTEM PENGUMUMAN (GLOBAL & PRIVATE)
function checkAnnouncements() {
    // Cek Pesan Global
    const globalMsg = localStorage.getItem('globalAnn');
    if (globalMsg) {
        showPopup("PENGUMUMAN GLOBAL", globalMsg);
        // Hapus setelah dibaca (opsional) atau biarkan
    }

    // Cek Pesan Individu (Private)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const privateMsg = localStorage.getItem('msg_' + currentUser.username);
        if (privateMsg) {
            showPopup("PESAN DARI OWNER", privateMsg);
            localStorage.removeItem('msg_' + currentUser.username); // Hapus setelah tampil
        }
    }
}

function showPopup(title, message) {
    const modal = document.getElementById('annModal');
    if(modal) {
        document.getElementById('annTitle').innerText = title;
        document.getElementById('annBody').innerText = message;
        modal.style.display = 'block';
    }
}

// 2. SISTEM LOGIN & PROTEKSI HALAMAN
function checkAccess() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html');

    // Jika mencoba beli tapi belum login
    if (!user && window.location.search.includes('action=payment')) {
        alert("Wajib Login!");
        window.location.href = 'login.html';
    }
}

// 3. SISTEM PEMBAYARAN (TIMER 10 MENIT)
let timerInterval;
function startPaymentTimer() {
    let timeLeft = 600; // 10 menit dalam detik
    const timerDisplay = document.getElementById('timer');
    
    if(!timerDisplay) return;

    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu pembayaran habis!");
            window.location.href = 'index.html';
        }
        timeLeft--;
    }, 1000);
}

// 4. SISTEM ADMIN (KHUSUS ALIPZZY)
function updateAdminStats() {
    const curDate = document.getElementById('curDate');
    if(curDate) curDate.innerText = new Date().toLocaleDateString('id-ID');
}

// Fungsi Refund (Simulasi)
function prosesRefund(orderId) {
    const confirmRefund = confirm("Apakah Anda yakin ingin me-refund pesanan ini?");
    if(confirmRefund) {
        alert("Pesanan " + orderId + " telah di-refund otomatis!");
        // Di sini biasanya ada logika hapus data di database
    }
}

// Fungsi Kirim Pesan ke User (Individu)
function sendPrivate() {
    const targetUser = prompt("Masukkan Username Target:");
    const message = prompt("Isi Pesan untuk " + targetUser + ":");
    if(targetUser && message) {
        localStorage.setItem('msg_' + targetUser, message);
        alert("Pesan terkirim ke " + targetUser);
    }
}

// 5. INISIALISASI SAAT HALAMAN DIBUKA
window.onload = function() {
    checkAnnouncements();
    checkAccess();
    updateAdminStats();
    
    if (window.location.search.includes('action=payment')) {
        startPaymentTimer();
    }
};

// Fungsi Logout
function logout() {
    localStorage.removeItem('currentUser');
    alert("Berhasil Logout!");
    window.location.href = 'index.html';
}
