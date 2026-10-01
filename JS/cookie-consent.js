var purecookieTitle = "Cookies.",
    purecookieDesc = "Este site utiliza cookies para garantir as funcionalidades essenciais e aprimorar sua experiência de navegação. Ao continuar utilizando este site, você concorda com a utilização de cookies.",
    purecookieLink = '<a href="https://medimagem.med.br/politicadeprivacidade.html" target="_blank">Política de privacidade</a>',
    purecookieButtonAccept = "Concordo",
    purecookieButtonReject = "Rejeitar";

function pureFadeIn(elementId, display) {
    var element = document.getElementById(elementId);
    element.style.opacity = 0;
    element.style.display = display || "block";
    (function fadeIn() {
        var opacity = parseFloat(element.style.opacity);
        if ((opacity += 0.02) <= 1) {
            element.style.opacity = opacity;
            requestAnimationFrame(fadeIn);
        }
    })();
}

function pureFadeOut(elementId) {
    var element = document.getElementById(elementId);
    element.style.opacity = 1;
    (function fadeOut() {
        if ((element.style.opacity -= 0.02) < 0) {
            element.style.display = "none";
        } else {
            requestAnimationFrame(fadeOut);
        }
    })();
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function cookieConsent() {
    if (!getCookie("purecookieDismiss")) {
        var consentContainer = document.createElement("div");
        consentContainer.className = "cookieConsentContainer";
        consentContainer.id = "cookieConsentContainer";
        consentContainer.innerHTML =
            '<div class="cookieDesc">' +
            '<p>' + purecookieDesc + " " + purecookieLink + '</p>' +
            '</div>' +
            '<div class="cookieButton">' +
            '<a onClick="purecookieAccept();" style="cursor: pointer;">' + purecookieButtonAccept + "</a>" +
            '<a onClick="purecookieReject();" style="cursor: pointer;">' + purecookieButtonReject + "</a>" +
            "</div>";
        document.body.appendChild(consentContainer);
        pureFadeIn("cookieConsentContainer");
    }
}

function purecookieAccept() {
    setCookie("purecookieDismiss", "1", 7);
    pureFadeOut("cookieConsentContainer");
}

function purecookieReject() {
    alert("Você rejeitou os cookies. Algumas funcionalidades do site podem não estar disponíveis.");
    pureFadeOut("cookieConsentContainer");
}

window.onload = function () {
    cookieConsent();
};
