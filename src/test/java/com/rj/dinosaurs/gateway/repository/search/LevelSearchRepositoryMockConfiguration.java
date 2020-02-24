package com.rj.dinosaurs.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link LevelSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class LevelSearchRepositoryMockConfiguration {

    @MockBean
    private LevelSearchRepository mockLevelSearchRepository;

}
