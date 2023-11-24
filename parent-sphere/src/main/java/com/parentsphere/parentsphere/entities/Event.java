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
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;

    @Temporal(TemporalType.DATE)
    private Date eventDate;

    // Relationship with User (organizer)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User organizer;
}

