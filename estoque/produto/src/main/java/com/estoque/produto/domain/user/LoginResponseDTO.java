package com.estoque.produto.domain.user;

public record LoginResponseDTO(String token, UserRole role) {
}
