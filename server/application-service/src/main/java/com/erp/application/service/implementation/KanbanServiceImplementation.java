package com.erp.application.service.implementation;

import com.erp.application.exception.ResourceNotFoundException;
import com.erp.application.model.SheetModel;
import com.erp.application.model.kanban.KanbanModel;
import com.erp.application.payload.request.KanbanRequestPayload;
import com.erp.application.payload.request.SheetRequestPayload;
import com.erp.application.payload.response.KanbanResponsePayload;
import com.erp.application.payload.response.SheetResponsePayload;
import com.erp.application.repository.KanbanRepository;
import com.erp.application.service.KanbanService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KanbanServiceImplementation implements KanbanService {
    Logger logger = LoggerFactory.getLogger(CalendarServiceImplementation.class);

    @Autowired
    private KanbanRepository kanbanRepository;

    @Bean
    public ModelMapper kanbanModelMapper() {
        return new ModelMapper();
    }

    @Override
    public List<KanbanResponsePayload> getKanbans(String user_email) {
        logger.info("getKanbans method invoked with payload : " + user_email);
        List<KanbanModel> kanbanModelList = kanbanRepository.findAllByEmail(user_email)
                .orElseThrow(() -> new ResourceNotFoundException("Sheet", "User", user_email));

        List<KanbanResponsePayload> kanbanResponsePayloadList = new ArrayList<>();
        for(KanbanModel kanbanModel : kanbanModelList){
            KanbanResponsePayload kanbanResponsePayload = new KanbanResponsePayload();
            kanbanResponsePayload.setId(kanbanModel.getKanbanData().getId());
            kanbanResponsePayload.setAssignee(kanbanModel.getKanbanData().getAssignee());
            kanbanResponsePayload.setPriority(kanbanModel.getKanbanData().getPriority());
            kanbanResponsePayload.setSummary(kanbanModel.getKanbanData().getSummary());
            kanbanResponsePayload.setStatus(kanbanModel.getKanbanData().getStatus());
            kanbanResponsePayloadList.add(kanbanResponsePayload);
        }

        return kanbanResponsePayloadList;
    }

    @Override
    public void insertKanban(String email, KanbanRequestPayload kanbanRequestPayload) {
        logger.info("insertKanban method invoked with payload : " + kanbanRequestPayload);
        KanbanModel kanbanModel = KanbanModel.builder()
                .email(email)
                .kanbanData(kanbanRequestPayload.getKanbanData())
                .build();
        kanbanRepository.save(kanbanModel);
    }

    private KanbanModel mapToEntity(KanbanRequestPayload kanbanRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(kanbanRequestPayload, KanbanModel.class);
    }

    private KanbanResponsePayload mapToDto(KanbanModel kanbanModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(kanbanModel, KanbanResponsePayload.class);
    }
}
