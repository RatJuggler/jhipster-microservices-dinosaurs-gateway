package com.rj.dinosaurs.gateway.repository.search;

import com.rj.dinosaurs.gateway.domain.Level;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Level} entity.
 */
public interface LevelSearchRepository extends ElasticsearchRepository<Level, Long> {
}
