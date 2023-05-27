package com.erp.application.controller;

import com.erp.application.payload.response.EditorResponsePayload;
import com.erp.application.payload.response.KanbanResponsePayload;
import com.erp.application.service.KanbanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/kanban")
public class KanbanController {

    Logger logger = LoggerFactory.getLogger(EditorController.class);

    @Autowired
    private KanbanService kanbanService;

    @GetMapping("/get/{userName}")
    public ResponseEntity<?> getKanbanController(@PathVariable(name  = "user_name") String user_name){
        logger.info("getKanbanController method invoked with email :: " + user_name);
        List<KanbanResponsePayload> kanbanResponsePayloadList = kanbanService.getKanbans(user_name);
        return new ResponseEntity<>(kanbanResponsePayloadList, HttpStatus.OK);
    }
}
