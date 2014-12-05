package netosolis.com.push_notificaciones;

//importamos la libreria de parse
import com.parse.Parse;
import com.parse.ParseInstallation;
import com.parse.PushService;

public class Aplicacion extends android.app.Application {

  public Aplicacion() {
  }

@Override
  public void onCreate() {
    super.onCreate();
    //Inicializamos Parse con la APP_ID y la CLIENT_KEY
    Parse.initialize(this, "APP_ID", "CLIENT_KEY"); 
	PushService.setDefaultPushCallback(this, MainActivity.class);
	ParseInstallation.getCurrentInstallation().saveInBackground();
	
	//Debemos suscribir el dispositivo a un canal de comunicacion, en este caso se llama Notificacion
	//Parse maneja canales para enviar la notificacion
	PushService.subscribe(getBaseContext(), "Notificacion", MainActivity.class);
  }
  
}