package com.cacodev.shalom.features.user.repository;

import com.cacodev.shalom.features.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByMemberId(UUID memberId);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.member WHERE u.username = :username")
    Optional<User> findByUsernameWithMember(String username);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.member WHERE u.id = :id")
    Optional<User> findByIdWithMember(UUID id);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.member")
    List<User> findAllWithMember();
}

