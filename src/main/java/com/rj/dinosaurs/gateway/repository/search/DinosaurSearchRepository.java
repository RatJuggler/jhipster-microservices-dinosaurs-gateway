package com.rj.dinosaurs.gateway.repository.search;

import com.rj.dinosaurs.gateway.domain.Dinosaur;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Dinosaur} entity.
 */
public interface DinosaurSearchRepository extends ElasticsearchRepository<Dinosaur, Long> {
}
