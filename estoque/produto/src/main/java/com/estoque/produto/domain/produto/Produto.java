package com.estoque.produto.domain.produto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "produto")
@Entity(name = "produto")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private Float price;
    private Integer quantity;
    private Integer withdrawals = 0;

    public Produto(ProdutoRequestDTO data){
        this.price = data.price();
        this.name = data.name();
        this.quantity = data.quantity();
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public void setWithdraws(Integer withdrawals){
        this.withdrawals = withdrawals;
    }

}
