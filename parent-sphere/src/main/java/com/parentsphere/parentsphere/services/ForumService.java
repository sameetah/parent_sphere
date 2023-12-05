package com.parentsphere.parentsphere.services;

import com.parentsphere.parentsphere.dtos.ForumDto;
import com.parentsphere.parentsphere.entities.Forum;
import com.parentsphere.parentsphere.entities.User;
import com.parentsphere.parentsphere.mappers.ForumMapper;
import com.parentsphere.parentsphere.repositories.ForumRepository;
import com.parentsphere.parentsphere.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ForumService {

    @Autowired
    private ForumRepository forumRepository;

   @Autowired
    private  UserRepository userRepository;
    @Autowired
    private ForumMapper forumMapper;

    public ForumDto createForum(ForumDto forumDto)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        log.info("Current username: {}", currentUsername);

        User currentUser=userRepository.findUserByUsername(currentUsername);
        Forum newForum=forumMapper.forumDtoToForum(forumDto);
        newForum.setAuthor(currentUser);
        newForum.setTitle(forumDto.getTitle());
       return forumMapper.forumToForumDto(forumRepository.save(newForum));

    }

    public List<ForumDto> getAllForums() {
        List<Forum> forums = forumRepository.findAll();
        return forumMapper.forumsToForumDtos(forums);
    }
}
