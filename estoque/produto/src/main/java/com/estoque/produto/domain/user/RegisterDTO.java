package com.estoque.produto.domain.user;

public record RegisterDTO(String username, String password, UserRole role, String email, String name, String cellphone) {
}
