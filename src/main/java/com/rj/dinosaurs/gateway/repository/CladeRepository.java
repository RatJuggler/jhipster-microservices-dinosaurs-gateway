package com.rj.dinosaurs.gateway.repository;

import com.rj.dinosaurs.gateway.domain.Clade;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Clade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CladeRepository extends JpaRepository<Clade, Long> {
}
