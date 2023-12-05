package com.parentsphere.parentsphere.mappers;

import com.parentsphere.parentsphere.dtos.ForumDto;
import com.parentsphere.parentsphere.entities.Forum;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ForumMapper {


    ForumDto forumToForumDto(Forum forum);


    Forum forumDtoToForum(ForumDto forumDTO);


    List<ForumDto> forumsToForumDtos(List<Forum> forums);
}
