package com.rj.dinosaurs.gateway.service.mapper;


import com.rj.dinosaurs.gateway.domain.*;
import com.rj.dinosaurs.gateway.service.dto.CladeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Clade} and its DTO {@link CladeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CladeMapper extends EntityMapper<CladeDTO, Clade> {


    @Mapping(target = "dinosaurs", ignore = true)
    @Mapping(target = "removeDinosaur", ignore = true)
    Clade toEntity(CladeDTO cladeDTO);

    default Clade fromId(Long id) {
        if (id == null) {
            return null;
        }
        Clade clade = new Clade();
        clade.setId(id);
        return clade;
    }
}
