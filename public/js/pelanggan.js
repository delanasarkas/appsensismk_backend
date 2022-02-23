function createPelanggan() {
    $("#create_btn_pelanggan").prop("disabled", true);

    const nama_pelanggan = $( "#nama_pelanggan" ).val().toUpperCase();
    const email_pelanggan = $( "#email_pelanggan" ).val();
    const nohp_pelanggan = $( "#nohp_pelanggan" ).val();
    const alamat_pelanggan = $( "#alamat_pelanggan" ).val().toUpperCase();

    if(!nama_pelanggan || !email_pelanggan || !nohp_pelanggan || !alamat_pelanggan) {
        alert('Data wajib diisi.');
        $( "#create_btn_pelanggan" ).prop( "disabled", false );
    } else {
        // POST AXIOS
        axios.post(API_URL + '/api/pelanggan/create', {
            nama_pelanggan: nama_pelanggan,
            email_pelanggan: email_pelanggan,
            nohp_pelanggan: nohp_pelanggan,
            alamat_pelanggan: alamat_pelanggan,
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#create_btn_pelanggan" ).prop( "disabled", false );
    
                alert('Pelanggan berhasil ditambahkan')
                window.location.href = "/pelanggan";
            }, 1000);
        })
        .catch((err) => {
            $( "#create_btn_pelanggan" ).prop( "disabled", false );
            console.clear();
        })
    }

}

function updatePelanggan() {
    $("#update_btn_pelanggan").prop("disabled", true);

    const id_pelanggan = $( "#id_pelanggan" ).val();
    const nama_pelanggan = $( "#nama_pelanggan" ).val().toUpperCase();
    const email_pelanggan = $( "#email_pelanggan" ).val();
    const nohp_pelanggan = $( "#nohp_pelanggan" ).val();
    const alamat_pelanggan = $( "#alamat_pelanggan" ).val().toUpperCase();

    if(!nama_pelanggan || !email_pelanggan || !nohp_pelanggan || !alamat_pelanggan) {
        alert('Data wajib diisi.');
        $( "#create_btn_pelanggan" ).prop( "disabled", false );
    } else { 
        // POST AXIOS
        axios.put(API_URL + `/api/pelanggan/update/${id_pelanggan}`, {
            nama_pelanggan: nama_pelanggan,
            email_pelanggan: email_pelanggan,
            nohp_pelanggan: nohp_pelanggan,
            alamat_pelanggan: alamat_pelanggan,
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#update_btn_pelanggan" ).prop( "disabled", false );
    
                alert('Pelanggan berhasil diubah')
                window.location.href = "/pelanggan";
            }, 1000);
        })
        .catch((err) => {
            $( "#update_btn_pelanggan" ).prop( "disabled", false );
            console.clear();
        })
    }
}

function deletePelanggan(id) {
    if (confirm('Yakin hapus data?')) {
        axios.delete(API_URL+ `/api/pelanggan/delete/${id}`)
        .then(() => {
            window.location.href = '/pelanggan';
        })
    }
}