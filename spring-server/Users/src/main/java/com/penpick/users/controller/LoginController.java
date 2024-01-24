package com.penpick.users.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.users.model.Users;
import com.penpick.users.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.Data;

@Data
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {

	@Autowired
    private UserService userService;
	
	//로그인 & 로그인한 유저 정보(userEmail) 세션에 저장하기
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Users credentials, HttpSession session) {
		
		Optional<Users> userOptional = userService.loginUser(credentials.getUserEmail());
		
		if (userOptional.isPresent()) {
            Users user = userOptional.get();

            if (user.getPassword().equals(credentials.getPassword())) {
                session.setAttribute("user", user.getUserEmail());
                return ResponseEntity.ok("로그인 성공");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
		
	}
	
	//로그인한 유저 정보 세션에서 불러오기
	@ResponseBody
	@GetMapping("/userdata")
    public ResponseEntity<Users> getUserData(HttpSession session) {
        
		String userEmail = (String) session.getAttribute("user");

        if (userEmail != null) {
            Optional<Users> userOptional = userService.loginUser(userEmail);

            if (userOptional.isPresent()) {
                Users user = userOptional.get();
                return ResponseEntity.ok(user);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
	
	//로그아웃
	@GetMapping("/logout")
	public ResponseEntity<String> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("Logout successful");
	}
 
}
