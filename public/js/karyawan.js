function createKaryawan() {
    $("#create_btn_karyawan").prop("disabled", true);

    const nama_karyawan = $( "#nama_karyawan" ).val().toUpperCase();
    const email_karyawan = $( "#email_karyawan" ).val();
    const nohp_karyawan = $( "#nohp_karyawan" ).val();
    const password_karyawan = $( "#password_karyawan" ).val();

    if(!nama_karyawan || !email_karyawan || !nohp_karyawan || !password_karyawan) {
        alert('Data wajib diisi.');
        $( "#create_btn_karyawan").prop( "disabled", false );
    } else {
        // POST AXIOS
        axios.post(API_URL + '/api/auth/register', {
            nama_karyawan: nama_karyawan,
            email_karyawan: email_karyawan,
            nohp_karyawan: nohp_karyawan,
            password_karyawan: password_karyawan,
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#create_btn_karyawan" ).prop( "disabled", false );
    
                alert('Karyawan berhasil ditambahkan')
                window.location.href = "/karyawan";
            }, 1000);
        })
        .catch((err) => {
            $( "#create_btn_karyawan" ).prop( "disabled", false );
            console.clear();
        })
    }

}

function updateKaryawan() {
    $("#update_btn_karyawan").prop("disabled", true);

    const id_karyawan = $( "#id_users" ).val();
    const nama_karyawan = $( "#nama_karyawan" ).val().toUpperCase();
    const email_karyawan = $( "#email_karyawan" ).val();
    const nohp_karyawan = $( "#nohp_karyawan" ).val();
    const password_karyawan = $( "#password_karyawan" ).val();

    if(!nama_karyawan || !email_karyawan || !nohp_karyawan) {
        alert('Data wajib diisi.');
        $( "#create_btn_karyawan" ).prop( "disabled", false );
    } else { 
        // POST AXIOS
        axios.put(API_URL + `/api/auth/update/${id_karyawan}`, {
            nama_user: nama_karyawan,
            email_user: email_karyawan,
            nohp_user: nohp_karyawan,
            password_karyawan: password_karyawan,
        })
        .then((res) => {
            const user = res.data.data;
            setTimeout(() => {
                $( "#update_btn_karyawan" ).prop( "disabled", false );
    
                alert('Karyawan berhasil diubah')
                window.location.href = "/karyawan";
            }, 1000);
        })
        .catch((err) => {
            $( "#update_btn_karyawan" ).prop( "disabled", false );
            console.clear();
        })
    }
}

function deleteKaryawan(id) {
    if (confirm('Yakin hapus data?')) {
        axios.delete(API_URL+ `/api/auth/delete/${id}`)
        .then(() => {
            window.location.href = '/karyawan';
        })
    }
}