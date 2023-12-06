package com.parentsphere.parentsphere.mappers;

import com.parentsphere.parentsphere.dtos.PostDto;
import com.parentsphere.parentsphere.entities.Forum;
import com.parentsphere.parentsphere.entities.Post;
import com.parentsphere.parentsphere.entities.User;
import com.parentsphere.parentsphere.services.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class PostMapper {

    @Autowired
    private UserService userService;

    @Mapping(target = "username", source = "author.username")
    @Mapping(source = "forum.id", target = "forumId")
    public abstract PostDto postToPostDto(Post post);

    @Mapping(source = "forumId", target = "forum.id")
    public abstract Post postDtoToPost(PostDto postDto);

    public abstract List<PostDto> postsToPostDtos(List<Post> posts);
}



