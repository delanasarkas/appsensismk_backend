// AXIOS PROCCESS
const API_URL = 'http://103.145.226.234/~arifrah2';

function login() {
    $("#login_btn").prop("disabled", true);
    $('#alert_error_login').addClass("d-none")

    const email = $( "#email" ).val();
    const password = $( "#password" ).val();

    // POST AXIOS
    axios.post(API_URL + '/api/auth/login', {
        email: email,
        password: password,
    })
    .then((res) => {
        const user = res.data.data;

        setTimeout(() => {
            $( "#login_btn" ).prop( "disabled", false );

            if(user.role === 'karyawan') {
                window.location.href = "/login";
            } else {
                window.location.href = "/";
            }
        }, 1000);
    })
    .catch((err) => {
        // ERR
        const errMessage = err.response.data.meta.message;
        $('#alert_error_login').removeClass( "d-none" ).append(`
            <small>${errMessage}</small>
        `);
        $( "#login_btn" ).prop( "disabled", false );
        console.clear();
    })
}