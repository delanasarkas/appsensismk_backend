function createTagihan() {
    $("#create_btn_tagihan").prop("disabled", true);

    const id_survey = $( "#id_survey" ).val();
    const total_tagihan = $( "#total_tagihan" ).val();

    if(!id_survey || !total_tagihan) {
        alert('Data wajib diisi.');
        $( "#create_btn_tagihan" ).prop( "disabled", false );
    } else {
        // POST AXIOS
        axios.post(API_URL + '/api/tagihan/create', {
            id_survey: id_survey,
            total_tagihan: total_tagihan,
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#create_btn_tagihan" ).prop( "disabled", false );
    
                alert('Tagihan berhasil ditambahkan')
                window.location.href = "/tagihan";
            }, 1000);
        })
        .catch((err) => {
            $( "#create_btn_tagihan" ).prop( "disabled", false );
            console.clear();
        })
    }

}

function deleteTagihan(id) {
    if (confirm('Yakin hapus data?')) {
        axios.delete(API_URL+ `/api/tagihan/delete/${id}`)
        .then(() => {
            window.location.href = '/tagihan';
        })
    }
}