package com.parentsphere.parentsphere.mappers;


import com.parentsphere.parentsphere.dtos.CommentDto;
import com.parentsphere.parentsphere.entities.Comment;
import com.parentsphere.parentsphere.entities.User;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "post.id", target = "postId")
    @Mapping(source = "author.id", target = "authorId")
    @Mapping(target = "likesCount", ignore = true) // Ignore during automatic mapping
    @Mapping(target = "dislikesCount", ignore = true) // Ignore during automatic mapping
    CommentDto toDTO(Comment comment);

    @Mapping(source = "postId", target = "post.id")
    @Mapping(source = "authorId", target = "author.id")
    Comment toEntity(CommentDto commentDto);

    List<CommentDto> toDTOList(List<Comment> comments);
    List<Comment> toEntityList(List<CommentDto> commentDTOs);

    // Custom methods to calculate likes and dislikes count
    default int mapLikesCount(Set<User> likes) {
        return likes != null ? likes.size() : 0;
    }

    default int mapDislikesCount(Set<User> dislikes) {
        return dislikes != null ? dislikes.size() : 0;
    }

    // AfterMapping to set likesCount and dislikesCount
    @AfterMapping
    default void setLikesDislikesCount(@MappingTarget CommentDto target, Comment source) {
        target.setLikesCount(mapLikesCount(source.getLikedBy()));
        target.setDislikesCount(mapDislikesCount(source.getDislikedBy()));
    }
}

