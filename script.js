function login() {
    const u = document.getElementById("user").value;
    const p = document.getElementById("pass").value;

    // EXTREEM STERK WACHTWOORD
    const superWachtwoord = "X9!pA7#qT2vL@8rZ$wF4mN%kH6sB*3dJ0yR";

    if (u === "admin" && p === superWachtwoord) {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("msg").textContent = "Fout wachtwoord";
    }
}

