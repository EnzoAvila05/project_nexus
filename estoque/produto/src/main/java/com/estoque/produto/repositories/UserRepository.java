package com.estoque.produto.repositories;

import com.estoque.produto.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, String> {

    User findByUsername(String username);
}
