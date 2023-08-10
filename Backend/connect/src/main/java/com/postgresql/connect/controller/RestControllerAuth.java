package com.postgresql.connect.controller;

import com.postgresql.connect.dtos.DtoAuthRespuesta;
import com.postgresql.connect.dtos.DtoLogin;
import com.postgresql.connect.dtos.DtoRegistro;
import com.postgresql.connect.model.Perfil;
import com.postgresql.connect.model.Persona;
import com.postgresql.connect.model.Usuario;
import com.postgresql.connect.repo.PerfilRepo;
import com.postgresql.connect.repo.PersonaRepo;
import com.postgresql.connect.repo.UsuarioRepo;
import com.postgresql.connect.security.JwtGenerador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth/")
public class RestControllerAuth {
    private AuthenticationManager authenticationManager;
    private PersonaRepo personaRepo;
    private PasswordEncoder passwordEncoder;
    private PerfilRepo perfilRepo;
    private UsuarioRepo usuarioRepo;
    private JwtGenerador jwtGenerador;

    @Autowired

    public RestControllerAuth(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, PerfilRepo perfilRepo, UsuarioRepo usuarioRepo, JwtGenerador jwtGenerador, PersonaRepo personaRepo) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.perfilRepo = perfilRepo;
        this.usuarioRepo = usuarioRepo;
        this.personaRepo = personaRepo;
        this.jwtGenerador = jwtGenerador;
    }
    //Método para poder registrar usuarios con role "user"
    @PostMapping("register")
    public ResponseEntity<String> registrar(@RequestBody DtoRegistro dtoRegistro) {
        if (usuarioRepo.existsByLogin(dtoRegistro.getLogin())) {
            return new ResponseEntity<>("el usuario ya existe, intenta con otro", HttpStatus.BAD_REQUEST);
        }
        System.out.println("Valor del campo usu_persona en el DTO: " + dtoRegistro.getUsu_persona());
        // Obtener la Persona correspondiente al usu_persona proporcionado en el DTO
        Persona persona = personaRepo.findById(dtoRegistro.getUsu_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        Usuario usuario = new Usuario();
        usuario.setUsu_persona(persona);
        usuario.setLogin(dtoRegistro.getLogin());
        usuario.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        Perfil perfil = perfilRepo.findByPerfil("USER").get();
        usuario.setPerfiles(Collections.singletonList(perfil));
        usuarioRepo.save(usuario);
        return new ResponseEntity<>("Registro de usuario exitoso", HttpStatus.OK);
    }

    //Método para poder guardar usuarios de tipo ADMIN
    @PostMapping("registerAdm")
    public ResponseEntity<String> registrarAdmin(@RequestBody DtoRegistro dtoRegistro) {
        if (usuarioRepo.existsByLogin(dtoRegistro.getLogin())) {
            return new ResponseEntity<>("el usuario ya existe, intenta con otro", HttpStatus.BAD_REQUEST);
        }
        // Obtener la Persona correspondiente al usu_persona proporcionado en el DTO
        Persona persona = personaRepo.findById(dtoRegistro.getUsu_persona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        Usuario usuarios = new Usuario();
        usuarios.setUsu_persona(persona);
        usuarios.setLogin(dtoRegistro.getLogin());
        usuarios.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        Perfil perfil = perfilRepo.findByPerfil("ADMIN").get();
        usuarios.setPerfiles(Collections.singletonList(perfil));
        usuarioRepo.save(usuarios);
        return new ResponseEntity<>("Registro de admin exitoso", HttpStatus.OK);
    }

    //Método para poder logear un usuario y obtener un token
    @PostMapping("login")
    public ResponseEntity<DtoAuthRespuesta> login(@RequestBody DtoLogin dtoLogin) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dtoLogin.getLogin(), dtoLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerador.generarToken(authentication);
        return new ResponseEntity<>(new DtoAuthRespuesta(token), HttpStatus.OK);
    }


}
