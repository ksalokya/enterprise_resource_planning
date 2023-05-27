package com.erp.application.controller;

import com.erp.application.payload.request.EditorRequestPayload;
import com.erp.application.payload.response.EditorResponsePayload;
import com.erp.application.service.EditorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/editor")
public class EditorController {
    Logger logger = LoggerFactory.getLogger(EditorController.class);

    @Autowired
    private EditorService editorService;

    @GetMapping("/get/{user_name}")
    public ResponseEntity<?> getEditorController(@PathVariable(name  = "user_name") String user_name){
        logger.info("getEditorController method invoked with email :: " + user_name);
        EditorResponsePayload editorResponsePayload = editorService.getEditor(user_name);
        return new ResponseEntity<>(editorResponsePayload, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateEditorController(@RequestBody EditorRequestPayload editorRequestPayload){
        logger.info("getEditorController method invoked with email :: " + editorRequestPayload);
        EditorResponsePayload editorResponsePayload = editorService.updateEditor(editorRequestPayload);
        return new ResponseEntity<>(editorResponsePayload, HttpStatus.OK);
    }
}
