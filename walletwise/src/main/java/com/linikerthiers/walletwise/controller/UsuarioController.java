package com.linikerthiers.walletwise.controller;

import com.linikerthiers.walletwise.model.RedefinirSenhaDTO;
import com.linikerthiers.walletwise.model.Usuario;
import com.linikerthiers.walletwise.model.UsuarioDTO;
import com.linikerthiers.walletwise.model.UsuarioGasto;
import com.linikerthiers.walletwise.service.UsuarioGastoService;
import com.linikerthiers.walletwise.service.UsuarioService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/register")
public class UsuarioController {

    @Autowired
    private UsuarioGastoService usuarioGastoService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @PostMapping("/inscrever")
    public ResponseEntity<Usuario> inscreverUsuario(@RequestBody Usuario usuario) {
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);
        Usuario novoUsuario = usuarioService.salvarUsuario(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        if (usuario.getEmail() == null || usuario.getSenha() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email ou senha não fornecidos");
        }

        Optional<Usuario> usuarioOptional = usuarioService.buscarUsuarioPorEmail(usuario.getEmail());
        if (usuarioOptional.isPresent()) {
            Usuario usuarioExistente = usuarioOptional.get();
            if (passwordEncoder.matches(usuario.getSenha(), usuarioExistente.getSenha())) {
                UsuarioDTO usuarioDTO = new UsuarioDTO();
                usuarioDTO.setId(usuarioExistente.getId());
                usuarioDTO.setNome(usuarioExistente.getNome());
                usuarioDTO.setEmail(usuarioExistente.getEmail());

                return ResponseEntity.ok(usuarioDTO);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> esqueceuSenha(@RequestBody Usuario usuario) {
        if (usuario.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email não fornecido");
        }

        Optional<Usuario> usuarioOptional = usuarioService.buscarUsuarioPorEmail(usuario.getEmail());
        if (usuarioOptional.isPresent()) {
            Usuario usuarioExistente = usuarioOptional.get();
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setId(usuarioExistente.getId());
            usuarioDTO.setNome(usuarioExistente.getNome());
            usuarioDTO.setEmail(usuarioExistente.getEmail());

            return ResponseEntity.ok(usuarioDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }


    @PostMapping("/gastos")
    public ResponseEntity<?> adicionarGasto(@RequestBody UsuarioGasto gasto) {
        try {
            Optional<Usuario> usuarioOptional = usuarioService.buscarUsuarioPorId(gasto.getUsuario().getId());
            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();
                gasto.setUsuario(usuario);

                if (!"entrada".equals(gasto.getTipo()) && !"saida".equals(gasto.getTipo())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo inválido. Use 'entrada' ou 'saida'.");
                }

                UsuarioGasto novoGasto = usuarioGastoService.salvarGasto(gasto);
                return ResponseEntity.status(HttpStatus.CREATED).body(novoGasto);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor");
        }
    }

    @GetMapping("/gastos/{usuarioId}")
    public ResponseEntity<?> obterGastosPorUsuario(@PathVariable Long usuarioId) {
        try {
            Optional<Usuario> usuarioOptional = usuarioService.buscarUsuarioPorId(usuarioId);
            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();
                List<UsuarioGasto> gastos = usuarioGastoService.buscarGastosPorUsuarioId(usuarioId);
                return ResponseEntity.ok(gastos);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor");
        }
    }

    @DeleteMapping("/gastos/{id}")
    public ResponseEntity<?> excluirGasto(@PathVariable Long id) {
        try {
            UsuarioGasto gasto = usuarioGastoService.getGastoById(id);
            if (gasto != null) {
                usuarioGastoService.deleteGasto(id);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gasto não encontrado");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor");
        }
    }

    @GetMapping("/{usuarioId}/mes")
    public ResponseEntity<?> obterGastosPorUsuarioEMes(@PathVariable Long usuarioId, @RequestParam Integer mesAno) {
        try {
            Optional<Usuario> usuarioOptional = usuarioService.buscarUsuarioPorId(usuarioId);
            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();
                List<UsuarioGasto> gastos = usuarioGastoService.buscarGastosPorUsuarioIdEMesAno(usuarioId, mesAno);
                return ResponseEntity.ok(gastos);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor");
        }
    }

    @PutMapping("/redefinir-senha-perfil")
    public ResponseEntity<?> redefinirSenha(@RequestBody RedefinirSenhaDTO redefinirSenhaDTO){
        if(redefinirSenhaDTO.getEmail() == null || redefinirSenhaDTO.getSenhaAtual() == null || redefinirSenhaDTO.getNovaSenha() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email, senha atual ou nova senha não " +
                    "fornecidos");
        }

        Optional<Usuario> usuarioOptional = usuarioService.buscarUsuarioPorEmail(redefinirSenhaDTO.getEmail());
        if (usuarioOptional.isPresent()) {
            Usuario usuarioExistente = usuarioOptional.get();
            if (passwordEncoder.matches(redefinirSenhaDTO.getSenhaAtual(), usuarioExistente.getSenha())) {
                usuarioExistente.setSenha(passwordEncoder.encode(redefinirSenhaDTO.getNovaSenha()));
                usuarioService.atualizarUsuario(usuarioExistente);
                return ResponseEntity.ok("Senha redefinida com sucesso");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha atual inválida");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    @PutMapping("/redefinir-senha-inicio")
    public ResponseEntity<?> esqueciSenha(@RequestBody RedefinirSenhaDTO redefinirSenhaDTO){
        if(redefinirSenhaDTO.getEmail() == null || redefinirSenhaDTO.getNovaSenha() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email e nova senha devem ser fornecidos.");
        }

        Optional<Usuario> usuarioOptional = usuarioService.buscarUsuarioPorEmail(redefinirSenhaDTO.getEmail());
        if (usuarioOptional.isPresent()) {
            Usuario usuarioExistente = usuarioOptional.get();

            usuarioExistente.setSenha(passwordEncoder.encode(redefinirSenhaDTO.getNovaSenha()));
            usuarioService.atualizarUsuario(usuarioExistente);
            return ResponseEntity.ok("Senha redefinida com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }
    }

}
