package com.estoque.produto.controllers;

import com.estoque.produto.domain.produto.Produto;
import com.estoque.produto.domain.produto.ProdutoRequestDTO;
import com.estoque.produto.domain.produto.ProdutoResponseDTO;
import com.estoque.produto.repositories.ProdutoRepository;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    ProdutoRepository repository;

    @PostMapping
    public ResponseEntity postProduto(@RequestBody @Valid ProdutoRequestDTO body){
        Produto existingProduto = repository.findByName(body.name());
        if (existingProduto != null) {
            existingProduto.setQuantity(existingProduto.getQuantity() + body.quantity());
            repository.save(existingProduto);
            return ResponseEntity.ok().build();
        }

        Produto newProduto = new Produto(body);
        this.repository.save(newProduto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getAllProdutos(){
        List<ProdutoResponseDTO> produtoList = this.repository
                .findAll().stream().map(ProdutoResponseDTO::new)
                .toList();

        return ResponseEntity.ok(produtoList);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateProduto(@PathVariable String id, @RequestBody @Valid ProdutoRequestDTO body) {
        return repository.findById(id)
                .map(produto -> {
                    produto.setQuantity(body.quantity());
                    produto.setPrice(body.price());
                    produto.setWithdraws(body.withdrawals());
                    repository.save(produto);
                    return ResponseEntity.ok(new ProdutoResponseDTO(produto));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProduto(@PathVariable String id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/id")
    public ResponseEntity getProdutoIdByName(@RequestParam String name) {
        Produto produto = repository.findByName(name);
        if (produto != null) {
            return ResponseEntity.ok(produto.getId());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdf() {
        try {
            List<Produto> produtos = repository.findAll();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            document.add(new Paragraph("Relatório de Produtos"));
            PdfPTable table = new PdfPTable(4);
            table.addCell("Nome");
            table.addCell("Retiradas");
            table.addCell("Valor Total de Vendas");
            table.addCell("Porcentagem Vendida");

            for (Produto produto : produtos) {
                table.addCell(produto.getName());
                table.addCell(produto.getWithdrawals().toString());
                table.addCell(String.format("%.2f", produto.getPrice() * produto.getWithdrawals()));
                int totalQuantity = produto.getQuantity() + produto.getWithdrawals();
                double percentageWithdrawn = totalQuantity > 0 ? (produto.getWithdrawals() / (double) totalQuantity) * 100 : 0;
                table.addCell(String.format("%.2f%%", percentageWithdrawn));
            }

            document.add(table);
            document.close();

            byte[] pdfBytes = baos.toByteArray();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=relatorio_produtos.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (DocumentException e) {
            return ResponseEntity.status(500).build();
        }
    }
}
