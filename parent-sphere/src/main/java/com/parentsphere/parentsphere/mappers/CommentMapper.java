package com.parentsphere.parentsphere.mappers;


import com.parentsphere.parentsphere.dtos.CommentDto;
import com.parentsphere.parentsphere.entities.Comment;
import com.parentsphere.parentsphere.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;



@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "post.id", target = "postId")
    @Mapping(source = "author.id", target = "authorId")
    @Mapping(target = "likesCount", source = "likedBy", qualifiedByName = "likesCount")
    @Mapping(target = "dislikesCount", source = "dislikedBy", qualifiedByName = "dislikesCount")
    CommentDto toDTO(Comment comment);

    @Mapping(source = "postId", target = "post.id")
    @Mapping(source = "authorId", target = "author.id")
    Comment toEntity(CommentDto commentDto);

    List<CommentDto> toDTOList(List<Comment> comments);
    List<Comment> toEntityList(List<CommentDto> commentDTOs);

    // Custom methods to calculate likes and dislikes count
    @Named("likesCount")
    default int mapLikesCount(Set<User> likedBy) {
        return likedBy != null ? likedBy.size() : 0;
    }

    @Named("dislikesCount")
    default int mapDislikesCount(Set<User> dislikedBy) {
        return dislikedBy != null ? dislikedBy.size() : 0;
    }

}

