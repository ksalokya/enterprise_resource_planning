package com.erp.application.model.kanban;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "kanban")
public class KanbanModel {
    private String email;
    private KanbanData kanbanData;
}
