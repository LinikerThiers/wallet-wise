package com.linikerthiers.walletwise.repository;

import com.linikerthiers.walletwise.model.UsuarioGasto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioGastoRepository extends JpaRepository<UsuarioGasto, Long> {
    List<UsuarioGasto> findByUsuarioId(Long usuarioId);
    List<UsuarioGasto> findByUsuarioIdAndMesAno(Long usuarioId, Integer mesAno);
}
