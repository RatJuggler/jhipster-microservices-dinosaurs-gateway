package com.rj.dinosaurs.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link HighScoreSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class HighScoreSearchRepositoryMockConfiguration {

    @MockBean
    private HighScoreSearchRepository mockHighScoreSearchRepository;

}
