(function () {

    var btlogout, btnew, btedit, inputNombre, inputDia, inputHora, inputId;

    btlogout = $("#btlogout");
    btnew = $("#btnew");
    btedit = $("#btedit");
    inputNombre = $("#eventName");
    inputDia = $("#eventDia");
    inputHora = $("#eventHora");

    $(window).on("load", mostrarEventos);
    $(window).on("load", mostrarReserva);
    $(window).on("load", hayReserva);

    function hayReserva() {
        event.preventDefault();
        var procesarRespuesta = function (respuesta) {
            if (respuesta.r[0].id) {
                swal({
                    title: "Info",
                    text: "Tienes eventos en la cola de reserva. Modifícalos para reservar fecha y hora",
                    type: "info",
                    showConfirmButton: true
                });
            }
        };
        var ajax = new Ajax();
        ajax.setUrl("ajax/ajaxhayreserva.php");
        ajax.setRespuesta(procesarRespuesta);
        ajax.doPeticion();
    }
    
    //Logout
    btlogout.on("click", function (event) {
        event.preventDefault();
        var procesarRespuesta = function (respuesta) {
            if (!respuesta.login) {
                window.location = "index.php";
            }
        };
        var ajax = new Ajax();
        ajax.setUrl("ajax/ajaxlogout.php");
        ajax.setRespuesta(procesarRespuesta);
        ajax.doPeticion();
    });

    //Crear nuevo evento
    btnew.on("click", function (event) {
        event.preventDefault();
        var procesarRespuesta = function (respuesta) {
            if (respuesta.insert) {
                swal({
                    title: "Insertar",
                    text: "El evento se ha insertado con éxito",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                mostrarEventos();
                mostrarReserva();
                limpiaForm();
            } else {
                var respuestaReserva = function (respuesta) {
                    if (respuesta.insert) {
                        swal({
                            title: "Insertar",
                            text: "Ya existe un evento para esa hora. Su evento ha sido guardado en la reserva",
                            type: "warning",
                            showConfirmButton: true
                        });
                        mostrarEventos();
                        mostrarReserva();
                    } else {
                        swal({
                            title: "Insertar",
                            text: "Ups! Algo no ha salido bien. Inténtalo de nuevo",
                            type: "error",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                };
                var ajax = new Ajax();
                var nombre = inputNombre.val();
                ajax.setUrl("ajax/ajaxinsertreserva.php?nombre=" + nombre);
                ajax.setRespuesta(respuestaReserva);
                ajax.doPeticion();
            }
        };
        var nombre = inputNombre.val();
        var dia = inputDia.val();
        var hora = inputHora.val();
        var ajax = new Ajax();
        ajax.setUrl("ajax/ajaxinsert.php?nombre=" + nombre + "&dia=" + dia + "&hora=" + hora);
        ajax.setRespuesta(procesarRespuesta);
        ajax.doPeticion();
    });

    //Modificar eventos
    function modificarEvento() {
        var pkId = $(this).find("input[type='hidden']").val();
        var hora = $(this).find(".fc-event-time").text();
        var dia = $(this).parent().parent().find(".fc-day-number").text();
        var nombre = $(this).find(".fc-event-title").text();
        inputNombre.val(nombre);
        inputDia.val(dia);
        var p = hora.search(":");
        if (p == 1) {
            hora = hora.substr(0, 1);
            inputHora.val(hora);
        } else {
            hora = hora.substr(0, 2);
            inputHora.val(hora);
        }

        btedit.on("click", function () {
            var procesarRespuesta = function (respuesta) {
                if (respuesta.edit) {
                    swal({
                        title: "Editar",
                        text: "El evento se ha editado con éxito",
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    limpiaForm();
                    mostrarEventos();
                    mostrarReserva();
                } else {
                    swal({
                        title: "Editar",
                        text: "No se ha podido editar el evento",
                        type: "error",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    limpiaForm();
                }
            };
            var datosnombre = inputNombre.val();
            var datosdia = inputDia.val();
            var datoshora = inputHora.val();
            var ajax = new Ajax();
            ajax.setUrl("ajax/ajaxedit.php?id=" + pkId + "&nombre=" + datosnombre + "&dia=" + datosdia + "&hora=" + datoshora);
            ajax.setRespuesta(procesarRespuesta);
            ajax.doPeticion();
        });
    }

    //Eliminar eventos
    function eliminarEvento() {
        var pkId = $(this).parent().find("input[type='hidden']").val();
        swal({
            title: "¿Está seguro?",
            text: "Si acepta no podrá recuperar el evento",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
                function (isConfirm) {
                    if (isConfirm) {
                        var procesarRespuesta = function (respuesta) {
                            if (respuesta.delete) {
                                swal({
                                    title: "¡Borrado!",
                                    text: "Tu evento ha sido borrado",
                                    type: "error",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                                mostrarEventos();
                                mostrarReserva();
                                limpiaForm();
                            } else {
                                swal({
                                    title: "Cancelado",
                                    text: "Sólo puede borrar este evento su creador",
                                    type: "info",
                                    showConfirmButton: true
                                });
                                limpiaForm();
                            }
                        };

                        var ajax = new Ajax();
                        ajax.setUrl("ajax/ajaxdelete.php?id=" + pkId);
                        ajax.setRespuesta(procesarRespuesta);
                        ajax.doPeticion();
                    } else {
                        swal({
                            title: "Cancelado",
                            text: "Tu evento está a salvo",
                            type: "error",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                });
    }
    
    
    //Eliminar reserva
    function eliminarReserva() {
        var pkId = $(this).parent().find("input[type='hidden']").val();
        swal({
            title: "¿Está seguro?",
            text: "Si acepta no podrá recuperar el evento",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
                function (isConfirm) {
                    if (isConfirm) {
                        var procesarRespuesta = function (respuesta) {
                            if (respuesta.delete) {
                                swal({
                                    title: "¡Borrado!",
                                    text: "Tu evento ha sido borrado",
                                    type: "error",
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                                mostrarEventos();
                                mostrarReserva();
                                limpiaForm();
                            } else {
                                swal({
                                    title: "Cancelado",
                                    text: "Sólo puede borrar este evento su creador",
                                    type: "info",
                                    showConfirmButton: true
                                });
                                limpiaForm();
                            }
                        };

                        var ajax = new Ajax();
                        ajax.setUrl("ajax/ajaxdeleteReserva.php?id=" + pkId);
                        ajax.setRespuesta(procesarRespuesta);
                        ajax.doPeticion();
                    } else {
                        swal({
                            title: "Cancelado",
                            text: "El evento está a salvo",
                            type: "error",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                });
    }

    //Mostrar eventos (función)
    function mostrarEventos() {
        var procesarRespuesta = function (respuesta) {
            if (respuesta.r) {
                //limpiar eventos
                $('.fc-event').remove();
                //pintar eventos
                for (var i = 0; i < respuesta.r.length; i++) {
                    var cajaEvento = $("td#dia" + respuesta.r[i].dia).find(".fc-day-content");
                    var evento = $("<div class='evento' title='" + respuesta.r[i].email + "'></div>");
                    cajaEvento.append(evento);
                    var id = $("<input type='hidden' />");
                    id.attr("value", respuesta.r[i].id);
                    evento.append(id);
                    evento.addClass("fc-event fc-event-hori fc-event-start fc-event-end");
                    evento.append($("<span class='fc-event-time'></span>").text(respuesta.r[i].hora + ":00"));
                    evento.append($("<span class='fc-event-tittle'></span>").text(parseInt(respuesta.r[i].hora) + 1 + ":00"));
                    evento.append($("<span class='fc-event-title'></span>").text(respuesta.r[i].nombre));
                    evento.append($("<span class='right'></span>").text("X"));
                }
                $(".fc-event").on("click", modificarEvento);
                $(".right").on("click", eliminarEvento);
            }
            limpiaForm();
        };
        var ajax = new Ajax();
        ajax.setUrl("ajax/ajaxMostrarEventos.php");
        ajax.setRespuesta(procesarRespuesta);
        ajax.doPeticion();
    }

    //Mostrar reserva
    function mostrarReserva() {
        var procesarRespuesta = function (respuesta) {
            if (respuesta.r) {
                //limpiar eventos
                $('.reserve-event').remove();
                //pintar eventos
                for (var i = 0; i < respuesta.r.length; i++) {
                    var evento = $("<div class='reserve-event'></div>");
                    var cajaEvento = $('.reserve-box');
                    cajaEvento.append(evento);
                    var id = $("<input type='hidden' name='id-event' />");
                    id.attr("value", respuesta.r[i].id);
                    evento.append(id);
                    evento.append($("<span class='fc-event-title'></span>").text(respuesta.r[i].nombre));
                    evento.append($("<span class='fc-event-time'></span>").text(respuesta.r[i].email));
                    evento.append($("<span class='delete'></span>").text("X"));
                }
                $(".reserve-event").on("click", modificarEvento);
                $(".delete").on("click", eliminarReserva);
            }
            limpiaForm();
        };
        var ajax = new Ajax();
        ajax.setUrl("ajax/ajaxMostrarReserva.php");
        ajax.setRespuesta(procesarRespuesta);
        ajax.doPeticion();
    }

    //función que limpia el formulario
    function limpiaForm() {
        inputNombre.val("");
        inputDia.val("");
        inputHora.val("");
    }

})();