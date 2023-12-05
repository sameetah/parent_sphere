package com.parentsphere.parentsphere.repositories;

import com.parentsphere.parentsphere.entities.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Forum, Long> {
}
