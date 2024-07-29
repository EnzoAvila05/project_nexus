package com.estoque.produto.domain.produto;

public record ProdutoResponseDTO(String id, String name, Float price, Integer quantity, Integer withdrawals) {

    public ProdutoResponseDTO(Produto produto){
        this(produto.getId(), produto.getName(), produto.getPrice(), produto.getQuantity(), produto.getWithdrawals());
    }
}
