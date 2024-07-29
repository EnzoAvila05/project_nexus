package com.estoque.produto.controllers;


import com.estoque.produto.domain.user.AuthenticationDTO;
import com.estoque.produto.domain.user.LoginResponseDTO;
import com.estoque.produto.domain.user.RegisterDTO;
import com.estoque.produto.domain.user.User;
import com.estoque.produto.infra.security.TokenService;
import com.estoque.produto.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        var user = this.repository.findByUsername(data.username());

        return ResponseEntity.ok(new LoginResponseDTO(token, user.getRole()));

    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.repository.findByUsername(data.username()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.username(), encryptedPassword, data.role(), data.email(), data.name(), data.cellphone());

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
