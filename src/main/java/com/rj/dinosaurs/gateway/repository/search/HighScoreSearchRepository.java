package com.rj.dinosaurs.gateway.repository.search;

import com.rj.dinosaurs.gateway.domain.HighScore;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link HighScore} entity.
 */
public interface HighScoreSearchRepository extends ElasticsearchRepository<HighScore, Long> {
}
