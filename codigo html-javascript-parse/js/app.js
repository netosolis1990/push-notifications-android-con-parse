$(document).ready(function() {
    //Checamos cuando den click en el boton...para enviar el mensage del area de texto
	$('#bt-enviar').click(function(event) {
        event.preventDefault();
        msg = $('#msj').val();
        if($.trim(msg).length < 20){
            nota("error","Error al mandar la notificacion. (20 caracteres)");
            return;
        }
        enviarNotificacion(msg,'Notificacion');
    });
});

//funcion para enviar notificaciones al usuario la libreria la descargas de http://ned.im/noty/
function nota(op,msg,time){
    if(time == undefined)time = 5000;
    var n = noty({text:msg,maxVisible: 1,type:op,killer:true,timeout:time,layout: 'top'});
}

//funcion que envia la notificacion a los dispositivos android
function enviarNotificacion(msg,canal){
  //Inicializamos el servicio de parse con la APP_ID y la JAVASCRIPT KEY
  Parse.initialize("APP_ID", "JAVASCRIPT_KEY");
  //Detallamos los parametros para enviar la notificacion
  Parse.Push.send({
    //A qeu canales de comunicacion se les enviara la notificacion
    channels: [ canal ],
    //Cuanto tardara en expirar la notificacion en segundos, 300 = 5 minutos
    expiration_interval: 300,
    //El mensaje
    data: {
      alert: msg
    }
  }, {
    //Funciones (callback) de exito y error
      success: function(data) {
        nota("success","Notificacion enviada correctamente.");
        $('#msj').val('');
      },
      error: function(error) {
        nota("error","Error al mandar la notificacion.");
        $('#msj').val('')
      }
    });
}