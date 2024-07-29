package com.estoque.produto.domain.produto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProdutoRequestDTO(@NotBlank String name, @NotNull Float price, @NotNull Integer quantity, @NotNull Integer withdrawals) {
}
