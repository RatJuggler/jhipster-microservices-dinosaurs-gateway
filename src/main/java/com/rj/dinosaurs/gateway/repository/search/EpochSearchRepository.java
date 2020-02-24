package com.rj.dinosaurs.gateway.repository.search;

import com.rj.dinosaurs.gateway.domain.Epoch;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Epoch} entity.
 */
public interface EpochSearchRepository extends ElasticsearchRepository<Epoch, Long> {
}
