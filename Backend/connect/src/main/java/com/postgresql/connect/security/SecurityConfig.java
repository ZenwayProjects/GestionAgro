package com.postgresql.connect.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration//Le indica al contenedor de Spring que esta clase es de seguridad
@EnableWebSecurity
//Indicamos que se activa la seguridad web en la app y ademas es una clase que contendra toda la configuracion referente a la seguridad
public class SecurityConfig {
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Value("classpath:rutas.json")
    private Resource rutaConfigResource;

    @Autowired
    public SecurityConfig(JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint){
        this.jwtAuthenticationEntryPoint =jwtAuthenticationEntryPoint;
    }
    //Este bean va a encargarse de verificar la info de los usuarios que se loguearan en nuestra api
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }
    //Este bean encripta todas las contraseñas
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    //Este bean incorpora el filtro de seguridad de JWT
    @Bean
    JwtAuthenticationFilter jwtAuthenticationFilter(){
        return new JwtAuthenticationFilter();
    }
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        List<RutaConfig> rutaConfigs = loadRutasFromJson();
        // Agregar un mensaje de depuración para verificar las rutas cargadas desde el JSON
        System.out.println("Rutas cargadas desde el JSON: " + rutaConfigs);
        http
                .csrf((csrf) -> csrf.disable())
                //permitimos el manejo de excepciones
                .exceptionHandling((exceptionHandling) ->
                        exceptionHandling
                                .authenticationEntryPoint(jwtAuthenticationEntryPoint))
                //Establece el punto de entrada personalizado de autenticacion para el manejo de las autenticaciones no autorizadas
                .sessionManagement((sessionManagement) ->
                        sessionManagement
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))//Permite la gestion de sesiones
                .cors(cors -> cors
                .configurationSource(request -> {
                    CorsConfiguration corsConfig = new CorsConfiguration();
                    corsConfig.addAllowedOrigin("http://localhost");
//                    corsConfig.addAllowedOrigin("http://localhost");
                    corsConfig.addAllowedHeader("*");
                    corsConfig.addAllowedMethod("*");
                    corsConfig.setAllowCredentials(true);
                    return corsConfig;
                }))


                //Toda peticion debe ser autorizada
                .authorizeHttpRequests(authorizeHttpRequests -> {
                    authorizeHttpRequests
                            .requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers("/api/idioma/**").permitAll();

                    for (RutaConfig rutaConfig : rutaConfigs) {
                        for (String role : rutaConfig.getRoles()) {
                            authorizeHttpRequests
                                    .requestMatchers(HttpMethod.valueOf(rutaConfig.getMetodo()), rutaConfig.getRuta())
                                    .hasAnyAuthority(role);
                        }
                    }

                    authorizeHttpRequests.anyRequest().authenticated();
                })
                .httpBasic(withDefaults());

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    private List<RutaConfig> loadRutasFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(rutaConfigResource.getInputStream(), new TypeReference<List<RutaConfig>>() {});
    }
}
