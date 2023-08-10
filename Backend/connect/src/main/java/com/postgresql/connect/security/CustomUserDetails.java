package com.postgresql.connect.security;

import com.postgresql.connect.model.Perfil;
import com.postgresql.connect.model.Usuario;
import com.postgresql.connect.model.UsuarioPerfil;
import com.postgresql.connect.repo.UsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetails implements UserDetailsService {
    private UsuarioRepo usuarioRepo;

    @Autowired
    public CustomUserDetails(UsuarioRepo usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    //metodo para juntar todas las autoridades en una lista
    public Collection<GrantedAuthority> mapToAuthorities(List<Perfil> perfiles){
        return perfiles.stream().map(perfil -> new SimpleGrantedAuthority(perfil.getPerfil())).collect(Collectors.toList());
    }

    //Metodo para traernos un usuario con todos sus datos por medio de sus username
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepo.findByLogin(login).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return new User(usuario.getLogin(), usuario.getPassword(), mapToAuthorities(usuario.getPerfiles()));
    }
}
