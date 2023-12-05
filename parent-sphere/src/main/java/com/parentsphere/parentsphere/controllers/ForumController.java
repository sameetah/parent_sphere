package com.parentsphere.parentsphere.controllers;


import com.parentsphere.parentsphere.dtos.ForumDto;
import com.parentsphere.parentsphere.repositories.ForumRepository;
import com.parentsphere.parentsphere.services.ForumService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/parent-sphere/forums")
public class ForumController {

    @Autowired
    private ForumService forumService;

    @PostMapping
    public ResponseEntity<ForumDto> createForum(@Valid @RequestBody ForumDto forumDto){
        return new ResponseEntity<>(forumService.createForum(forumDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ForumDto>> getForums(){
        return new ResponseEntity<>(forumService.getAllForums(), HttpStatus.CREATED);
    }
}
