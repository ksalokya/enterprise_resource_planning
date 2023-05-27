package com.erp.application.controller;

import com.erp.application.model.kanban.KanbanData;
import com.erp.application.model.kanban.KanbanModel;
import com.erp.application.payload.request.KanbanRequestPayload;
import com.erp.application.payload.response.EditorResponsePayload;
import com.erp.application.payload.response.KanbanResponsePayload;
import com.erp.application.repository.KanbanRepository;
import com.erp.application.service.KanbanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/kanban")
public class KanbanController {

    Logger logger = LoggerFactory.getLogger(EditorController.class);

    @Autowired
    private KanbanService kanbanService;

    @Autowired
    private KanbanRepository kanbanRepository;

    @PostMapping("/get/{userName}")
    public ResponseEntity<?> getKanbanController(@PathVariable(name  = "userName") String user_name){
        logger.info("getKanbanController method invoked with email :: " + user_name);
        List<KanbanResponsePayload> kanbanResponsePayloadList = kanbanService.getKanbans(user_name);
        return new ResponseEntity<>(kanbanResponsePayloadList, HttpStatus.OK);
    }

    @PostMapping("/insert/{userName}")
    public ResponseEntity<?> insertKanbanController(@PathVariable(name  = "userName") String user_name,
                                                    @RequestBody KanbanRequestPayload kanbanRequestPayload){
        logger.info("getKanbanController method invoked with email :: " + user_name);
        kanbanService.insertKanban(user_name, kanbanRequestPayload);
        return new ResponseEntity<>("Inserted Successfully", HttpStatus.OK);
    }

    @PostMapping("/update/{userName}")
    public ResponseEntity<?> updateKanbanController(@PathVariable(name  = "userName") String user_name,
                                                    @RequestBody KanbanRequestPayload kanbanRequestPayload){
        logger.info("updateKanbanController method invoked with email :: " + user_name);
        KanbanResponsePayload kanbanResponsePayload = kanbanService.updateKanban(user_name, kanbanRequestPayload);
        return new ResponseEntity<>(kanbanResponsePayload, HttpStatus.OK);
    }

    @PostMapping("/delete/{userName}")
    public ResponseEntity<?> deleteKanbanController(@PathVariable(name  = "userName") String user_name,
                                                    @RequestBody KanbanRequestPayload kanbanRequestPayload){
        logger.info("updateKanbanController method invoked with email :: " + user_name);
        kanbanService.deleteKanban(user_name, kanbanRequestPayload);
        return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
    }

// FOR TESTING
//    @PostMapping("/insertMany/{userName}")
//    public ResponseEntity<?> insertManyKanbanController(@PathVariable(name  = "userName") String user_name,
//                                                    @RequestBody List<KanbanData> kanbanData){
//        logger.info("getKanbanController method invoked with email :: " + user_name);
//        for(KanbanData kd : kanbanData){
//            KanbanModel kanbanModel = new KanbanModel();
//            kanbanModel.setEmail(user_name);
//            kanbanModel.setKanbanData(kd);
//            kanbanRepository.save(kanbanModel);
//        }
//        return new ResponseEntity<>("Inserted Successfully", HttpStatus.OK);
//    }
}
