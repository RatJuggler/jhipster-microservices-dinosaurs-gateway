package com.rj.dinosaurs.gateway.repository;

import com.rj.dinosaurs.gateway.domain.HighScore;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the HighScore entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HighScoreRepository extends JpaRepository<HighScore, Long> {

}
