package com.estoque.produto.repositories;

import com.estoque.produto.domain.produto.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, String> {
    Produto findByName(String name);
}
