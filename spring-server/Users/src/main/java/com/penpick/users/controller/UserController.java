package com.penpick.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.users.model.Users;
import com.penpick.users.service.UserService;

import lombok.Data;

import java.util.List;

@Data
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true")
public class UserController {
   
	@Autowired
    private UserService userService;
	
	//전체 사용자 리스트 (api 테스트용)
	@ResponseBody
	@GetMapping
	public List<Users> userApi() {
        return userService.getUserApi();
    }

    //회원가입 창
    @PostMapping("/add")
    public ResponseEntity<Users> registerUser(@RequestBody Users user) {
    	Users saveUser = userService.registerUser(user);
    	return ResponseEntity.ok(saveUser);
    }
    
}