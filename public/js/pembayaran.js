function createPembayaran() {
    $("#create_btn_pembayaran").prop("disabled", true);

    const id_tagihan = $("#id_tagihan").val();
    const jenis_pembayaran = $("#jenis_pembayaran").val();
    const nomor_order = $("#id_tagihan option:selected").text();

    if(!id_tagihan || !jenis_pembayaran) {
        alert('Data wajib diisi.');
        $( "#create_btn_pembayaran" ).prop( "disabled", false );
    } else {
        // POST AXIOS
        axios.post(API_URL + '/api/pembayaran/create', {
            id_tagihan: id_tagihan,
            jenis_pembayaran: jenis_pembayaran,
            nomor_order: nomor_order
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#create_btn_pembayaran" ).prop( "disabled", false );
    
                alert('Pembayaran berhasil ditambahkan')
                window.location.href = "/pembayaran";
            }, 1000);
        })
        .catch((err) => {
            $( "#create_btn_pembayaran" ).prop( "disabled", false );
            // console.clear();
            console.log(err.response);
        })
    }

}

function deletePembayaran(id) {
    if (confirm('Yakin hapus data?')) {
        axios.delete(API_URL+ `/api/pembayaran/delete/${id}`)
        .then(() => {
            window.location.href = '/pembayaran';
        })
    }
}