package com.rj.dinosaurs.gateway.repository.search;

import com.rj.dinosaurs.gateway.domain.Sighting;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Sighting} entity.
 */
public interface SightingSearchRepository extends ElasticsearchRepository<Sighting, Long> {
}
