package com.linikerthiers.walletwise.service;

import com.linikerthiers.walletwise.model.UsuarioGasto;
import com.linikerthiers.walletwise.repository.UsuarioGastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioGastoService {
    @Autowired
    private UsuarioGastoRepository usuarioGastoRepository;

    public List<UsuarioGasto> getAllGastos() {
        return usuarioGastoRepository.findAll();
    }

    public UsuarioGasto getGastoById(Long id) {
        Optional<UsuarioGasto> gasto = usuarioGastoRepository.findById(id);
        return gasto.orElse(null);
    }

    public UsuarioGasto salvarGasto(UsuarioGasto gasto) {
        return usuarioGastoRepository.save(gasto);
    }

    public void deleteGasto(Long id) {
        usuarioGastoRepository.deleteById(id);
    }

    public List<UsuarioGasto> buscarGastosPorUsuarioId(Long usuarioId) {
        return usuarioGastoRepository.findByUsuarioId(usuarioId);
    }

    public List<UsuarioGasto> buscarGastosPorUsuarioIdEMesAno(Long usuarioId, Integer mesAno) {
        return usuarioGastoRepository.findByUsuarioIdAndMesAno(usuarioId, mesAno);
    }

}
