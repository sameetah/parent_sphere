package com.parentsphere.parentsphere.services;


import com.parentsphere.parentsphere.dtos.PostDto;
import com.parentsphere.parentsphere.dtos.PostResponse;
import com.parentsphere.parentsphere.entities.Forum;
import com.parentsphere.parentsphere.entities.Post;
import com.parentsphere.parentsphere.entities.User;
import com.parentsphere.parentsphere.exceptions.ResourceNotFoundException;
import com.parentsphere.parentsphere.mappers.PostMapper;
import com.parentsphere.parentsphere.repositories.ForumRepository;
import com.parentsphere.parentsphere.repositories.PostRepository;
import com.parentsphere.parentsphere.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import static com.parentsphere.parentsphere.constant.UserImplConstant.NO_USER_FOUND_BY_USERNAME;


 @Slf4j
@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ForumRepository forumRepository;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private UserRepository userRepository;

    public PostDto createPost(PostDto postDto) {
log.info(postDto.getContent()+"forum id");
        Post post = postMapper.postDtoToPost(postDto);


        Forum forum = forumRepository.findById(postDto.getForumId())
                .orElseThrow(() -> new ResourceNotFoundException("Forum not found with id: " + postDto.getForumId()));
        TimeZone timeZone = TimeZone.getTimeZone("Europe/Berlin");
        post.setDate(new Date(System.currentTimeMillis() + timeZone.getOffset(System.currentTimeMillis())));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findUserByUsername(username);
        post.setForum(forum);
        post.setContent(post.getContent());
        post.setAuthor(user);

        Post savedPost = postRepository.save(post);


        return postMapper.postToPostDto(savedPost);
    }

    public PostDto getPostById(long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post with id not found"));
        return postMapper.postToPostDto(post);
    }

    public PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Post> posts = postRepository.findAll(pageable);
        List<Post> listOfPosts = posts.getContent();
        List<PostDto> postDtos = postMapper.postsToPostDtos(listOfPosts);
        PostResponse postResponse = new PostResponse();
        postResponse.setContent(postDtos);
        postResponse.setPageNo(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLast(posts.isLast());
        return postResponse;
    }

    public PostDto updatePost(PostDto postDto, long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post with id not found"));

        post.setContent(postDto.getContent());
        Post updatedPost = postRepository.save(post);
        return postMapper.postToPostDto(updatedPost);
        
    }

    public void deletePostById(long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();


     User user= userRepository.findUserByUsername(username);
        if (user == null) {
           log.error(NO_USER_FOUND_BY_USERNAME + username);
            throw new UsernameNotFoundException(NO_USER_FOUND_BY_USERNAME + username);
        } else {
            if (!post.getAuthor().getId().equals(user.getId())) {
                throw new AccessDeniedException("You are not authorized to delete this post");
            }
            postRepository.delete(post);
    }
}
 }