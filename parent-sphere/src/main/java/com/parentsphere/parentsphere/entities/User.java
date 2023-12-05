package com.parentsphere.parentsphere.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String email;


    private String profileImageUrl;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;//ROLE_USER{ read, edit }, ROLE_ADMIN {delete}

    private String[] authorities;


    @OneToMany(mappedBy = "author")
    private Set<Post> posts;


    @OneToMany(mappedBy = "author")
    private Set<Comment> comments;


    @OneToMany(mappedBy = "organizer")
    private Set<Event> events;





    private boolean isNotLocked;
}
