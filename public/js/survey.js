function createSurvey() {
    $("#create_btn_survey").prop("disabled", true);

    const id_users = $( "#id_users" ).val();
    const id_pemesanan = $( "#id_pemesanan" ).val();

    if(!id_users || !id_pemesanan) {
        alert('Data wajib diisi.');
        $( "#create_btn_survey" ).prop( "disabled", false );
    } else {
        // POST AXIOS
        axios.post(API_URL + '/api/survey/create', {
            id_users: id_users,
            id_pemesanan: id_pemesanan,
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#create_btn_survey" ).prop( "disabled", false );
    
                alert('Survey berhasil ditambahkan')
                window.location.href = "/survey";
            }, 1000);
        })
        .catch((err) => {
            $( "#create_btn_survey" ).prop( "disabled", false );
            console.clear();
        })
    }

}

function updateSurvey() {
    $("#update_btn_survey").prop("disabled", true);

    const id_survey = $( "#id_survey" ).val();
    const id_users = $( "#id_users" ).val();

    if(!id_users) {
        alert('Data wajib diisi.');
        $( "#create_btn_survey" ).prop( "disabled", false );
    } else { 
        // POST AXIOS
        axios.put(API_URL + `/api/survey/update/${id_survey}`, {
            id_users: id_users,
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#update_btn_survey" ).prop( "disabled", false );
    
                alert('Survey berhasil diubah')
                window.location.href = "/survey";
            }, 1000);
        })
        .catch((err) => {
            $( "#update_btn_survey" ).prop( "disabled", false );
            console.clear();
        })
    }
}

function deleteSurvey(id) {
    if (confirm('Yakin hapus data?')) {
        axios.delete(API_URL+ `/api/survey/delete/${id}`)
        .then(() => {
            window.location.href = '/survey';
        })
    }
}