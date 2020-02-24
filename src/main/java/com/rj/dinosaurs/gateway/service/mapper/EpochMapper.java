package com.rj.dinosaurs.gateway.service.mapper;


import com.rj.dinosaurs.gateway.domain.*;
import com.rj.dinosaurs.gateway.service.dto.EpochDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Epoch} and its DTO {@link EpochDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EpochMapper extends EntityMapper<EpochDTO, Epoch> {


    @Mapping(target = "dinosaurs", ignore = true)
    @Mapping(target = "removeDinosaur", ignore = true)
    Epoch toEntity(EpochDTO epochDTO);

    default Epoch fromId(Long id) {
        if (id == null) {
            return null;
        }
        Epoch epoch = new Epoch();
        epoch.setId(id);
        return epoch;
    }
}
