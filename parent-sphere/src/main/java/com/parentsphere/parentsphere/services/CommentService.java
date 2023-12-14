package com.parentsphere.parentsphere.services;


import com.parentsphere.parentsphere.dtos.CommentDto;
import com.parentsphere.parentsphere.entities.Comment;
import com.parentsphere.parentsphere.entities.Post;
import com.parentsphere.parentsphere.entities.User;
import com.parentsphere.parentsphere.exceptions.BlogAPIException;
import com.parentsphere.parentsphere.exceptions.ResourceNotFoundException;
import com.parentsphere.parentsphere.mappers.CommentMapper;
import com.parentsphere.parentsphere.repositories.CommentRepository;
import com.parentsphere.parentsphere.repositories.PostRepository;
import com.parentsphere.parentsphere.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentMapper commentMapper;

    public CommentDto createComment(long postId, CommentDto commentDto) {

        Comment comment = commentMapper.toEntity(commentDto);

        // retrieve post entity by id
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "id", postId));

        User author = userRepository.findById(commentDto.getAuthorId()).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", commentDto.getAuthorId()));
        comment.setAuthor(author);
        comment.setPost(post);

        // comment entity to DB
        Comment newComment = commentRepository.save(comment);

        return commentMapper.toDTO(newComment);
    }


    public CommentDto getCommentById(Long postId, Long commentId) {
        // retrieve post entity by id
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "id", postId));

        // retrieve comment by id
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
                new ResourceNotFoundException("Comment", "id", commentId));

        if (!comment.getPost().getId().equals(post.getId())) {
            throw new BlogAPIException(HttpStatus.BAD_REQUEST, "Comment does not belong to post");
        }
        CommentDto commentDto = commentMapper.toDTO(comment);


        return commentDto;
    }



    public CommentDto updateComment(Long postId, long commentId, CommentDto commentRequest) {
        // retrieve post entity by id
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "id", postId));

        // retrieve comment by id
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
                new ResourceNotFoundException("Comment", "id", commentId));

        if(!comment.getPost().getId().equals(post.getId())){
            throw new BlogAPIException(HttpStatus.BAD_REQUEST, "Comment does not belongs to post");
        }
        comment.setContent(commentRequest.getContent());



        Comment updatedComment = commentRepository.save(comment);
        return commentMapper.toDTO(updatedComment);
    }

    public CommentDto deleteComment(Long postId, Long commentId) {
        // retrieve post entity by id
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "id", postId));

        // retrieve comment by id
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
                new ResourceNotFoundException("Comment", "id", commentId));

        if(!comment.getPost().getId().equals(post.getId())){
            throw new BlogAPIException(HttpStatus.BAD_REQUEST, "Comment does not belongs to post");
        }
        CommentDto commentDto = commentMapper.toDTO(comment);

        // Perform the deletion
        commentRepository.delete(comment);

        // Return the CommentDto of the deleted comment
        return commentDto;
    }

    public CommentDto likeComment(Long commentId, Long userId, Long postId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));


        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "id", postId));

        if(!comment.getPost().getId().equals(post.getId())){
            throw new BlogAPIException(HttpStatus.BAD_REQUEST, "Comment does not belongs to post");
        }
        boolean liked = comment.getLikedBy().add(user); // Attempt to like
        if (!liked) {
            comment.getLikedBy().remove(user); // Undo like if already liked
        }

        // Remove from dislikes if present
        comment.getDislikedBy().remove(user);
        log.info("Comment: {}", comment.getLikesCount());

        commentRepository.save(comment);
       return commentMapper.toDTO(comment);
    }

    public CommentDto dislikeComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        boolean disliked = comment.getDislikedBy().add(user); // Attempt to dislike
        if (!disliked) {
            comment.getDislikedBy().remove(user); // Undo dislike if already disliked
        }

        // Remove from likes if present
        comment.getLikedBy().remove(user);

        commentRepository.save(comment);
        return commentMapper.toDTO(comment);
    }

    public List<CommentDto> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);

        return commentMapper.toDTOList(comments);
    }
}