package com.rj.dinosaurs.gateway.web.rest;

import com.rj.dinosaurs.gateway.GatewayApp;
import com.rj.dinosaurs.gateway.domain.HighScore;
import com.rj.dinosaurs.gateway.domain.Player;
import com.rj.dinosaurs.gateway.domain.Level;
import com.rj.dinosaurs.gateway.repository.HighScoreRepository;
import com.rj.dinosaurs.gateway.repository.search.HighScoreSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link HighScoreResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class HighScoreResourceIT {

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    private static final Instant DEFAULT_ACHIEVED_DT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACHIEVED_DT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private HighScoreRepository highScoreRepository;

    /**
     * This repository is mocked in the com.rj.dinosaurs.gateway.repository.search test package.
     *
     * @see com.rj.dinosaurs.gateway.repository.search.HighScoreSearchRepositoryMockConfiguration
     */
    @Autowired
    private HighScoreSearchRepository mockHighScoreSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHighScoreMockMvc;

    private HighScore highScore;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HighScore createEntity(EntityManager em) {
        HighScore highScore = new HighScore()
            .score(DEFAULT_SCORE)
            .achievedDt(DEFAULT_ACHIEVED_DT);
        // Add required entity
        Player player;
        if (TestUtil.findAll(em, Player.class).isEmpty()) {
            player = PlayerResourceIT.createEntity(em);
            em.persist(player);
            em.flush();
        } else {
            player = TestUtil.findAll(em, Player.class).get(0);
        }
        highScore.setPlayer(player);
        // Add required entity
        Level level;
        if (TestUtil.findAll(em, Level.class).isEmpty()) {
            level = LevelResourceIT.createEntity(em);
            em.persist(level);
            em.flush();
        } else {
            level = TestUtil.findAll(em, Level.class).get(0);
        }
        highScore.setLevel(level);
        return highScore;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HighScore createUpdatedEntity(EntityManager em) {
        HighScore highScore = new HighScore()
            .score(UPDATED_SCORE)
            .achievedDt(UPDATED_ACHIEVED_DT);
        // Add required entity
        Player player;
        if (TestUtil.findAll(em, Player.class).isEmpty()) {
            player = PlayerResourceIT.createUpdatedEntity(em);
            em.persist(player);
            em.flush();
        } else {
            player = TestUtil.findAll(em, Player.class).get(0);
        }
        highScore.setPlayer(player);
        // Add required entity
        Level level;
        if (TestUtil.findAll(em, Level.class).isEmpty()) {
            level = LevelResourceIT.createUpdatedEntity(em);
            em.persist(level);
            em.flush();
        } else {
            level = TestUtil.findAll(em, Level.class).get(0);
        }
        highScore.setLevel(level);
        return highScore;
    }

    @BeforeEach
    public void initTest() {
        highScore = createEntity(em);
    }

    @Test
    @Transactional
    public void createHighScore() throws Exception {
        int databaseSizeBeforeCreate = highScoreRepository.findAll().size();
        // Create the HighScore
        restHighScoreMockMvc.perform(post("/api/high-scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(highScore)))
            .andExpect(status().isCreated());

        // Validate the HighScore in the database
        List<HighScore> highScoreList = highScoreRepository.findAll();
        assertThat(highScoreList).hasSize(databaseSizeBeforeCreate + 1);
        HighScore testHighScore = highScoreList.get(highScoreList.size() - 1);
        assertThat(testHighScore.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testHighScore.getAchievedDt()).isEqualTo(DEFAULT_ACHIEVED_DT);

        // Validate the HighScore in Elasticsearch
        verify(mockHighScoreSearchRepository, times(1)).save(testHighScore);
    }

    @Test
    @Transactional
    public void createHighScoreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = highScoreRepository.findAll().size();

        // Create the HighScore with an existing ID
        highScore.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHighScoreMockMvc.perform(post("/api/high-scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(highScore)))
            .andExpect(status().isBadRequest());

        // Validate the HighScore in the database
        List<HighScore> highScoreList = highScoreRepository.findAll();
        assertThat(highScoreList).hasSize(databaseSizeBeforeCreate);

        // Validate the HighScore in Elasticsearch
        verify(mockHighScoreSearchRepository, times(0)).save(highScore);
    }


    @Test
    @Transactional
    public void checkScoreIsRequired() throws Exception {
        int databaseSizeBeforeTest = highScoreRepository.findAll().size();
        // set the field null
        highScore.setScore(null);

        // Create the HighScore, which fails.


        restHighScoreMockMvc.perform(post("/api/high-scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(highScore)))
            .andExpect(status().isBadRequest());

        List<HighScore> highScoreList = highScoreRepository.findAll();
        assertThat(highScoreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAchievedDtIsRequired() throws Exception {
        int databaseSizeBeforeTest = highScoreRepository.findAll().size();
        // set the field null
        highScore.setAchievedDt(null);

        // Create the HighScore, which fails.


        restHighScoreMockMvc.perform(post("/api/high-scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(highScore)))
            .andExpect(status().isBadRequest());

        List<HighScore> highScoreList = highScoreRepository.findAll();
        assertThat(highScoreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHighScores() throws Exception {
        // Initialize the database
        highScoreRepository.saveAndFlush(highScore);

        // Get all the highScoreList
        restHighScoreMockMvc.perform(get("/api/high-scores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(highScore.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].achievedDt").value(hasItem(DEFAULT_ACHIEVED_DT.toString())));
    }
    
    @Test
    @Transactional
    public void getHighScore() throws Exception {
        // Initialize the database
        highScoreRepository.saveAndFlush(highScore);

        // Get the highScore
        restHighScoreMockMvc.perform(get("/api/high-scores/{id}", highScore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(highScore.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.achievedDt").value(DEFAULT_ACHIEVED_DT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingHighScore() throws Exception {
        // Get the highScore
        restHighScoreMockMvc.perform(get("/api/high-scores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHighScore() throws Exception {
        // Initialize the database
        highScoreRepository.saveAndFlush(highScore);

        int databaseSizeBeforeUpdate = highScoreRepository.findAll().size();

        // Update the highScore
        HighScore updatedHighScore = highScoreRepository.findById(highScore.getId()).get();
        // Disconnect from session so that the updates on updatedHighScore are not directly saved in db
        em.detach(updatedHighScore);
        updatedHighScore
            .score(UPDATED_SCORE)
            .achievedDt(UPDATED_ACHIEVED_DT);

        restHighScoreMockMvc.perform(put("/api/high-scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHighScore)))
            .andExpect(status().isOk());

        // Validate the HighScore in the database
        List<HighScore> highScoreList = highScoreRepository.findAll();
        assertThat(highScoreList).hasSize(databaseSizeBeforeUpdate);
        HighScore testHighScore = highScoreList.get(highScoreList.size() - 1);
        assertThat(testHighScore.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testHighScore.getAchievedDt()).isEqualTo(UPDATED_ACHIEVED_DT);

        // Validate the HighScore in Elasticsearch
        verify(mockHighScoreSearchRepository, times(1)).save(testHighScore);
    }

    @Test
    @Transactional
    public void updateNonExistingHighScore() throws Exception {
        int databaseSizeBeforeUpdate = highScoreRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHighScoreMockMvc.perform(put("/api/high-scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(highScore)))
            .andExpect(status().isBadRequest());

        // Validate the HighScore in the database
        List<HighScore> highScoreList = highScoreRepository.findAll();
        assertThat(highScoreList).hasSize(databaseSizeBeforeUpdate);

        // Validate the HighScore in Elasticsearch
        verify(mockHighScoreSearchRepository, times(0)).save(highScore);
    }

    @Test
    @Transactional
    public void deleteHighScore() throws Exception {
        // Initialize the database
        highScoreRepository.saveAndFlush(highScore);

        int databaseSizeBeforeDelete = highScoreRepository.findAll().size();

        // Delete the highScore
        restHighScoreMockMvc.perform(delete("/api/high-scores/{id}", highScore.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HighScore> highScoreList = highScoreRepository.findAll();
        assertThat(highScoreList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the HighScore in Elasticsearch
        verify(mockHighScoreSearchRepository, times(1)).deleteById(highScore.getId());
    }

    @Test
    @Transactional
    public void searchHighScore() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        highScoreRepository.saveAndFlush(highScore);
        when(mockHighScoreSearchRepository.search(queryStringQuery("id:" + highScore.getId())))
            .thenReturn(Collections.singletonList(highScore));

        // Search the highScore
        restHighScoreMockMvc.perform(get("/api/_search/high-scores?query=id:" + highScore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(highScore.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].achievedDt").value(hasItem(DEFAULT_ACHIEVED_DT.toString())));
    }
}
