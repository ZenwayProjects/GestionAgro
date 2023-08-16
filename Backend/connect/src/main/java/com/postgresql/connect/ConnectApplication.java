package com.postgresql.connect;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class ConnectApplication {

    @Value("${rt-server.host}")
    private String host;

    @Value("${rt-server.port}")
    private Integer port;


    public static void main(String[] args) {
        SpringApplication.run(ConnectApplication.class, args);
    }


    @Bean
    public SocketIOServer socketIOServer() {
        Configuration config = new Configuration();
        config.setHostname(host);
        config.setPort(port);
        // Ajustar el tiempo de ping en milisegundos (por defecto es 25,000 ms)
        config.setPingInterval(30000); // Por ejemplo, aquí lo he configurado a 30 segundos

        // Ajustar el tiempo de inactividad en milisegundos (por defecto es 60,000 ms)
        config.setPingTimeout(60000); // Por ejemplo, aquí lo he configurado a 60 segundos

        return new SocketIOServer(config);
    }
    

}
