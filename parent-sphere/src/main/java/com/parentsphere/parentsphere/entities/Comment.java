package com.parentsphere.parentsphere.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    // Relationship with Post
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    // Relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;
}
