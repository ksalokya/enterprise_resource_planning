package com.erp.application.service.implementation;

import com.erp.application.exception.ResourceNotFoundException;
import com.erp.application.model.kanban.KanbanModel;
import com.erp.application.payload.response.KanbanResponsePayload;
import com.erp.application.repository.KanbanRepository;
import com.erp.application.service.KanbanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KanbanServiceImplementation implements KanbanService {
    Logger logger = LoggerFactory.getLogger(CalendarServiceImplementation.class);

    @Autowired
    private KanbanRepository kanbanRepository;


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
}
