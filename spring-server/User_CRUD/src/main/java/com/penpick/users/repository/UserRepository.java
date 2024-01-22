package com.penpick.users.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.penpick.users.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
}
