package com.parentsphere.parentsphere.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDto {
    private Long id;
    private String content;
    private Long postId;
    private Long authorId;
    private int likesCount;
    private int dislikesCount;


}
