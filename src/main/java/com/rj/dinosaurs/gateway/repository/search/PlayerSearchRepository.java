package com.rj.dinosaurs.gateway.repository.search;

import com.rj.dinosaurs.gateway.domain.Player;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Player} entity.
 */
public interface PlayerSearchRepository extends ElasticsearchRepository<Player, Long> {
}
