package com.rj.dinosaurs.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.rj.dinosaurs.gateway.web.rest.TestUtil;

public class SightingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sighting.class);
        Sighting sighting1 = new Sighting();
        sighting1.setId(1L);
        Sighting sighting2 = new Sighting();
        sighting2.setId(sighting1.getId());
        assertThat(sighting1).isEqualTo(sighting2);
        sighting2.setId(2L);
        assertThat(sighting1).isNotEqualTo(sighting2);
        sighting1.setId(null);
        assertThat(sighting1).isNotEqualTo(sighting2);
    }
}
