package com.parentsphere.parentsphere.dtos;

import lombok.*;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
    private Long id;

    private String content;
    private Date date;
    private String username;
    private Long forumId;
}