const namaInput = document.getElementById("edit-nama");
const stokInput = document.getElementById("edit-stok");
const hargaInput = document.getElementById("edit-harga");
const form = document.getElementById("edit-form");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let barang = JSON.parse(localStorage.getItem("barang")) || [];
const barangToEdit = barang.find(item => String(item.id) === String(id));

if (!barangToEdit) {
    Swal.fire({
        icon: "error",
        title: "Data Tidak Ditemukan",
        text: "Barang yang ingin diedit tidak ada!",
        confirmButtonText: "Kembali"
    }).then(() => {
        window.location.href = "index.html";
    });
} else {
    namaInput.value = barangToEdit.nama;
    stokInput.value = barangToEdit.stok;
    hargaInput.value = barangToEdit.harga;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const namaBaru = namaInput.value.trim();
    const stokBaru = parseInt(stokInput.value);
    const hargaBaru = parseFloat(hargaInput.value);

    if (!namaBaru || isNaN(stokBaru) || isNaN(hargaBaru)) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Harap isi semua field dengan benar!" });
        return;
    }

    Swal.fire({
        title: "Simpan Perubahan?",
        text: "Apakah kamu yakin ingin memperbarui data barang ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, Simpan!",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed) {
            barangToEdit.nama = namaBaru;
            barangToEdit.stok = stokBaru;
            barangToEdit.harga = hargaBaru;

            localStorage.setItem("barang", JSON.stringify(barang));

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Data barang berhasil diperbarui!",
                confirmButtonText: "OK"
            }).then(() => {
                window.location.href = "index.html";
            });
        }
    });
});
