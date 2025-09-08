// Elemen DOM
const barangInput = document.getElementById('barang-input');
const stokInput = document.getElementById('stok-input');
const hargaInput = document.getElementById('harga-input');
const addBtn = document.getElementById('add-btn');
const listBarang = document.getElementById('list-barang');
const tambahBarang = document.getElementById('tambah');
const popup = document.getElementById('popup');

// Load data dari localStorage
let barang = JSON.parse(localStorage.getItem('barang')) || [];

// Simpan data ke localStorage
function simpanBarang() {
    localStorage.setItem('barang', JSON.stringify(barang));
}

// Render tabel barang
function renderBarang() {
    listBarang.innerHTML = '';
    barang.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.stok}</td>
            <td>${item.harga}</td>
            <td>
                <button class="edit-btn" data-id="${item.id}">Edit</button>
                <button class="delete-btn" data-id="${item.id}">Hapus</button>
            </td>
        `;
        listBarang.appendChild(tr);
    });
}
renderBarang();

// Tambah barang baru
addBtn.addEventListener('click', () => {
    const nama = barangInput.value.trim();
    const stok = parseInt(stokInput.value);
    const harga = parseFloat(hargaInput.value);

    if (!nama || isNaN(stok) || isNaN(harga)) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Harap isi semua field dengan benar!' });
        return;
    }

    const newBarang = {
        id: String(Date.now()), // ID disimpan sebagai STRING
        nama,
        stok,
        harga
    };

    barang.push(newBarang);
    simpanBarang();
    renderBarang();

    Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Barang berhasil ditambahkan!' });

    barangInput.value = '';
    stokInput.value = '';
    hargaInput.value = '';
    popup.style.display = 'none';
});

// Delegasi tombol Edit & Hapus
listBarang.addEventListener('click', (e) => {
    const btn = e.target;
    const id = btn.dataset.id;

    if (btn.classList.contains('delete-btn')) {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: 'Data barang akan dihapus permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((r) => {
            if (r.isConfirmed) {
                barang = barang.filter(x => x.id !== id);
                simpanBarang();
                renderBarang();
                Swal.fire('Terhapus!', 'Data barang berhasil dihapus.', 'success');
            }
        });
    }

    if (btn.classList.contains('edit-btn')) {
        window.location.href = `edit.html?id=${encodeURIComponent(id)}`;
    }
});

// Popup tambah barang
tambahBarang.addEventListener('click', () => popup.style.display = 'flex');

// Tutup popup jika klik di luar
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        Swal.fire({
            title: 'Tutup Form?',
            text: 'Apakah kamu yakin ingin menutup form tambah barang?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Tutup',
            cancelButtonText: 'Batal'
        }).then((r) => {
            if (r.isConfirmed) popup.style.display = 'none';
        });
    }
});
