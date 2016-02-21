(function () {

    var username, userpass, btlogin, suseralias, susermail, suserpass, suserpassconfirm, 
    btsingup, mensaje;
    
    username = document.getElementById("username");
    userpass = document.getElementById("userpass");
    btlogin = document.getElementById("btlogin");
    suseralias = document.getElementById("suseralias")
    susermail = document.getElementById("susermail");
    suserpass = document.getElementById("suserpass");
    suserpassconfirm = document.getElementById("suserpassconfirm");
    btsingup = document.getElementById("btsingup");
    mensaje = document.getElementById("mensaje");

    
    //Login
    btlogin.addEventListener("click", function () {
        var procesarRespuesta = function (respuesta) {
            if (respuesta.login) {
                window.location = "index.php?action=read&do=view";
            } else {
                mensaje.style.color = "#F00";
                mensaje.textContent = "Los datos no son correctos";
                username.addEventListener("focus", function(){
                    mensaje.innerHTML = "&nbsp;";
                });
                userpass.addEventListener("focus", function(){
                    mensaje.innerHTML = "&nbsp;";
                });
            }
        };
        var ajax = new Ajax();
        var datoUsername = encodeURI(username.value);
        var datoUserpass = encodeURI(userpass.value);
        ajax.setUrl("ajax/ajaxlogin.php?email=" + datoUsername + "&pass=" + datoUserpass);
        ajax.setRespuesta(procesarRespuesta);
        ajax.doPeticion();
    }, false);

    
    //SignUp
    btsingup.addEventListener("click", function () {
        var procesarRespuesta = function (respuesta) {
            if (respuesta.signup) {
                mensaje.style.color = '#0F0';
                mensaje.textContent = "Usuario creado con éxito";
            } else {
                mensaje.style.colot = "#F00";
                mensaje.textContent = "Ese usuario ya existe";
            }
        };
        if(suseralias.value!=="" && susermail.value!=="" && suserpass.value!=="" 
                && suserpassconfirm.value!==""
                && suserpass.value===suserpassconfirm.value){
            var ajax = new Ajax();
            var datoalias = encodeURI(suseralias.value);
            var datomail = encodeURI(susermail.value);
            var datopass = encodeURI(suserpass.value);
            ajax.setUrl("ajax/ajaxsignup.php?alias=" + datoalias + "&mail=" + datomail + "&pass=" + datopass);
            ajax.setRespuesta(procesarRespuesta);
            ajax.doPeticion();
        }else{
            mensaje.style.color = "#F00";
            mensaje.textContent = "Debe rellenar los campos";
        }
    }, false);

    
})();