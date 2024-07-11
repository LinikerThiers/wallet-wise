package com.linikerthiers.walletwise.service;

import com.linikerthiers.walletwise.model.Usuario;
import com.linikerthiers.walletwise.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    public Optional<Usuario> buscarUsuarioPorEmail(String email){
        return Optional.ofNullable(usuarioRepository.findByEmail(email));
    }
    public Optional<Usuario> buscarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    public void atualizarUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }
}
