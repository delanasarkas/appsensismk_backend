function filterData() {
    const start_date = $( "#start_date" ).val();
    const end_date = $( "#end_date" ).val();

    if(!start_date || !end_date) {
        alert('Filter wajib diisi.');
    } else {
        window.location.href = `/absensi-filter?start_date=${start_date}&end_date=${end_date}`;
    }
}