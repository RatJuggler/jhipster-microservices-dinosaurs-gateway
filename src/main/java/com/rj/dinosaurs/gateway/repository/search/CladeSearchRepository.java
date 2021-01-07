package com.rj.dinosaurs.gateway.repository.search;

import com.rj.dinosaurs.gateway.domain.Clade;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Clade} entity.
 */
public interface CladeSearchRepository extends ElasticsearchRepository<Clade, Long> {
}
