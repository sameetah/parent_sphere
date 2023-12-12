package com.parentsphere.parentsphere.controllers;


import com.parentsphere.parentsphere.dtos.CommentDto;
import com.parentsphere.parentsphere.services.CommentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/parent-sphere/posts/{postId}/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentDto> createComment(@PathVariable(value = "postId") long postId,
                                                    @Valid @RequestBody CommentDto commentDto){
        return new ResponseEntity<>(commentService.createComment(postId, commentDto), HttpStatus.CREATED);
    }

    @GetMapping
    public List<CommentDto> getCommentsByPostId(@PathVariable(value = "postId") Long postId){
        return commentService.getCommentsByPostId(postId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDto> getCommentById(@PathVariable(value = "postId") Long postId,
                                                     @PathVariable(value = "id") Long commentId){
        CommentDto commentDto = commentService.getCommentById(postId, commentId);
        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDto> updateComment(@PathVariable(value = "postId") Long postId,
                                                    @PathVariable(value = "id") Long commentId,
                                                    @Valid @RequestBody CommentDto commentDto){
        CommentDto updatedComment = commentService.updateComment(postId, commentId, commentDto);
        return new ResponseEntity<>(updatedComment, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable(value = "postId") Long postId,
                                                @PathVariable(value = "id") Long commentId){
        commentService.deleteComment(postId, commentId);
        return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
    }

    @PostMapping("/{commentId}/likes")
    public ResponseEntity<String> likeComment(@PathVariable(value = "postId") Long postId,
                                              @PathVariable(value = "commentId") Long commentId,
                                              @RequestParam(value = "userId") Long userId) {
        commentService.likeComment(commentId, userId);
        return new ResponseEntity<>("Comment liked successfully", HttpStatus.OK);
    }

    @PostMapping("/{commentId}/dislikes")
    public ResponseEntity<String> dislikeComment(@PathVariable(value = "postId") Long postId,
                                                 @PathVariable(value = "commentId") Long commentId,
                                                 @RequestParam(value = "userId") Long userId) {
        commentService.dislikeComment(commentId, userId);
        return new ResponseEntity<>("Comment disliked successfully", HttpStatus.OK);
    }
}
