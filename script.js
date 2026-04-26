// ==========================================
// 1. REALTIME LISTENER (POP-UP PESAN)
// ==========================================
if (typeof db !== 'undefined') {
    // Listener untuk Pesan Global
    db.ref('announcements/global').on('value', (snapshot) => {
        const data = snapshot.val();
        const modal = document.getElementById('annModal');
        if (data && data.active && modal) {
            document.getElementById('annTitle').innerText = "PENGUMUMAN GLOBAL";
            document.getElementById('annBody').innerText = data.text;
            modal.style.display = 'block';
            
            // Suara notifikasi (Opsional)
            new Audio('https://www.soundjay.com/buttons/beep-01a.mp3').play();
        }
    });

    // Listener untuk Pesan Private (Individu)
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        db.ref('messages/' + user.username).on('value', (snapshot) => {
            const data = snapshot.val();
            const modal = document.getElementById('annModal');
            if (data && modal) {
                document.getElementById('annTitle').innerText = "PESAN DARI OWNER";
                document.getElementById('annBody').innerText = data.text;
                modal.style.display = 'block';
                // Hapus pesan setelah dibaca agar tidak muncul terus
                db.ref('messages/' + user.username).remove();
            }
        });
    }
}

// ==========================================
// 2. LOGIKA PEMBELIAN & LOGIN CHECK
// ==========================================
function handleBuy(name, id) {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        alert("Wajib Login Terlebih Dahulu!");
        window.location.href = 'login.html';
        return;
    }
    
    // Ambil harga dari dropdown atau angka langsung
    let price;
    const element = document.getElementById(id);
    if (element) {
        price = element.value;
    } else {
        price = id; // Jika id yang dikirim adalah angka langsung (misal: 150000)
    }
    
    window.location.href = `dashboard.html?action=payment&item=${encodeURIComponent(name)}&price=${price}`;
}

// ==========================================
// 3. ADMIN PANEL FUNCTIONS (KHUSUS ALIPZZY)
// ==========================================
function sendPrivateMsg() {
    const target = prompt("Masukkan Username Target:");
    const msg = prompt("Masukkan Pesan untuk " + target + ":");
    if (target && msg) {
        db.ref('messages/' + target).set({
            text: msg,
            time: Date.now()
        });
        alert("Pesan Terkirim ke " + target);
    }
}

function blacklistUser() {
    const target = prompt("Username yang ingin di-blacklist:");
    if (target) {
        db.ref('blacklist/' + target).set(true);
        alert(target + " Berhasil di-blacklist!");
    }
}

// ==========================================
// 4. SISTEM LOGOUT
// ==========================================
function logout() {
    localStorage.removeItem('currentUser');
    alert("Berhasil Logout!");
    window.location.href = 'index.html';
}

// Close Modal Function
function closeModal() {
    const modal = document.getElementById('annModal');
    if (modal) modal.style.display = 'none';
}
