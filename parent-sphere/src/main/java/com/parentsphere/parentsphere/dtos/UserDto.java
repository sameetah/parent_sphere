package com.parentsphere.parentsphere.dtos;

import com.parentsphere.parentsphere.entities.Post;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;

    private String firstName;

    private String lastName;
    private String username;
    private String role;//ROLE_USER{ read, edit }, ROLE_ADMIN {delete}

    private String profileImageUrl;
}
