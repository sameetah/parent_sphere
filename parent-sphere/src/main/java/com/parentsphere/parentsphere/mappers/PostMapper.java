package com.parentsphere.parentsphere.mappers;

import com.parentsphere.parentsphere.dtos.PostDto;
import com.parentsphere.parentsphere.entities.Forum;
import com.parentsphere.parentsphere.entities.Post;
import com.parentsphere.parentsphere.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(source = "author.id", target = "authorId")
    @Mapping(source = "forum.id", target = "forumId")
    PostDto postToPostDto(Post post);

    @Mapping(source = "authorId", target = "author", qualifiedByName = "idToUser")
    @Mapping(source = "forumId", target = "forum", qualifiedByName = "idToForum")
    Post postDtoToPost(PostDto postDto);

    List<PostDto> postsToPostDtos(List<Post> posts);

    @Named("idToUser")
    default User idToUser(Long id) {
        if (id == null) {
            return null;
        }
        User user = new User();
        user.setId(id);
        return user;
    }

    @Named("idToForum")
    default Forum idToForum(Long id) {
        if (id == null) {
            return null;
        }
        Forum forum = new Forum();
        forum.setId(id);
        return forum;
    }
}