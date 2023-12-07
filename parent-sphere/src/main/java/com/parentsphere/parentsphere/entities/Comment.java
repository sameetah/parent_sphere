package com.parentsphere.parentsphere.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.Set;

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



    @JsonIgnore

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

   @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "comment_likes",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> likedBy;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "comment_dislikes",
            joinColumns = @JoinColumn(name = "comment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> dislikedBy;

    public int getLikesCount() {
        return likedBy != null ? likedBy.size() : 0;
    }

    public int getDislikesCount() {
        return dislikedBy != null ? dislikedBy.size() : 0;
    }
}
