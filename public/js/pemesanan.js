function createPemesanan() {
    $("#create_btn_pemesanan").prop("disabled", true);

    const id_pelanggan = $( "#id_pelanggan" ).val();
    const tgl_pemesanan = $( "#tgl_pemesanan" ).val();
    const waktu_pemesanan = $( "#waktu_pemesanan" ).val();
    const deskripsi_pemesanan = $( "#deskripsi_pemesanan" ).val();

    if(!id_pelanggan || !tgl_pemesanan || !deskripsi_pemesanan) {
        alert('Data wajib diisi.');
        $( "#create_btn_pemesanan" ).prop( "disabled", false );
    } else {
        // POST AXIOS
        axios.post(API_URL + '/api/pemesanan/create', {
            id_pelanggan: id_pelanggan,
            tgl_pemesanan: tgl_pemesanan,
            waktu_pemesanan: waktu_pemesanan,
            deskripsi_pemesanan: deskripsi_pemesanan,
            status_pemesanan: 'proses',
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#create_btn_pemesanan" ).prop( "disabled", false );
    
                alert('Pemesanan berhasil ditambahkan')
                window.location.href = "/pemesanan";
            }, 1000);
        })
        .catch((err) => {
            $( "#create_btn_pemesanan" ).prop( "disabled", false );
            console.clear();
        })
    }

}

function updatePemesanan() {
    $("#update_btn_pemesanan").prop("disabled", true);

    const id_pemesanan = $( "#id_pemesanan" ).val();
    const id_pelanggan = $( "#id_pelanggan" ).val();
    const tgl_pemesanan = $( "#tgl_pemesanan" ).val();
    const waktu_pemesanan = $( "#waktu_pemesanan" ).val();
    const deskripsi_pemesanan = $( "#deskripsi_pemesanan" ).val();
 
    if(!id_pelanggan || !tgl_pemesanan || !deskripsi_pemesanan) {
        alert('Data wajib diisi.');
        $( "#create_btn_pelanggan" ).prop( "disabled", false );
    } else { 
        // POST AXIOS
        axios.put(API_URL + `/api/pemesanan/update/${id_pemesanan}`, {
            id_pelanggan: id_pelanggan,
            tgl_pemesanan: tgl_pemesanan,
            deskripsi_pemesanan: deskripsi_pemesanan,
            waktu_pemesanan: waktu_pemesanan,
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#update_btn_pemesanan" ).prop( "disabled", false );
    
                alert('Pemesanan berhasil diubah')
                window.location.href = "/pemesanan";
            }, 1000);
        })
        .catch((err) => {
            $( "#update_btn_pemesanan" ).prop( "disabled", false );
            console.clear();
        })
    }
}

function deletePemesanan(id) {
    if (confirm('Yakin hapus data?')) {
        axios.delete(API_URL+ `/api/pemesanan/delete/${id}`)
        .then(() => {
            window.location.href = '/pemesanan';
        })
    }
}