package com.parentsphere.parentsphere.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "forums")
public class Forum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;





    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;


    @OneToMany(mappedBy = "forum")
    private Set<Post> posts = new HashSet<>();
}
