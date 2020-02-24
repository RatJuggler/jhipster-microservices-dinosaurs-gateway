package com.rj.dinosaurs.gateway.web.rest;

import com.rj.dinosaurs.gateway.domain.HighScore;
import com.rj.dinosaurs.gateway.repository.HighScoreRepository;
import com.rj.dinosaurs.gateway.repository.search.HighScoreSearchRepository;
import com.rj.dinosaurs.gateway.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.rj.dinosaurs.gateway.domain.HighScore}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HighScoreResource {

    private final Logger log = LoggerFactory.getLogger(HighScoreResource.class);

    private static final String ENTITY_NAME = "highScore";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HighScoreRepository highScoreRepository;

    private final HighScoreSearchRepository highScoreSearchRepository;

    public HighScoreResource(HighScoreRepository highScoreRepository, HighScoreSearchRepository highScoreSearchRepository) {
        this.highScoreRepository = highScoreRepository;
        this.highScoreSearchRepository = highScoreSearchRepository;
    }

    /**
     * {@code POST  /high-scores} : Create a new highScore.
     *
     * @param highScore the highScore to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new highScore, or with status {@code 400 (Bad Request)} if the highScore has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/high-scores")
    public ResponseEntity<HighScore> createHighScore(@Valid @RequestBody HighScore highScore) throws URISyntaxException {
        log.debug("REST request to save HighScore : {}", highScore);
        if (highScore.getId() != null) {
            throw new BadRequestAlertException("A new highScore cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HighScore result = highScoreRepository.save(highScore);
        highScoreSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/high-scores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /high-scores} : Updates an existing highScore.
     *
     * @param highScore the highScore to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated highScore,
     * or with status {@code 400 (Bad Request)} if the highScore is not valid,
     * or with status {@code 500 (Internal Server Error)} if the highScore couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/high-scores")
    public ResponseEntity<HighScore> updateHighScore(@Valid @RequestBody HighScore highScore) throws URISyntaxException {
        log.debug("REST request to update HighScore : {}", highScore);
        if (highScore.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HighScore result = highScoreRepository.save(highScore);
        highScoreSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, highScore.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /high-scores} : get all the highScores.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of highScores in body.
     */
    @GetMapping("/high-scores")
    public List<HighScore> getAllHighScores() {
        log.debug("REST request to get all HighScores");
        return highScoreRepository.findAll();
    }

    /**
     * {@code GET  /high-scores/:id} : get the "id" highScore.
     *
     * @param id the id of the highScore to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the highScore, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/high-scores/{id}")
    public ResponseEntity<HighScore> getHighScore(@PathVariable Long id) {
        log.debug("REST request to get HighScore : {}", id);
        Optional<HighScore> highScore = highScoreRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(highScore);
    }

    /**
     * {@code DELETE  /high-scores/:id} : delete the "id" highScore.
     *
     * @param id the id of the highScore to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/high-scores/{id}")
    public ResponseEntity<Void> deleteHighScore(@PathVariable Long id) {
        log.debug("REST request to delete HighScore : {}", id);
        highScoreRepository.deleteById(id);
        highScoreSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/high-scores?query=:query} : search for the highScore corresponding
     * to the query.
     *
     * @param query the query of the highScore search.
     * @return the result of the search.
     */
    @GetMapping("/_search/high-scores")
    public List<HighScore> searchHighScores(@RequestParam String query) {
        log.debug("REST request to search HighScores for query {}", query);
        return StreamSupport
            .stream(highScoreSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
