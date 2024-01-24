package com.penpick.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.users.model.Users;
import com.penpick.users.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.Data;

import java.util.List;
import java.util.Optional;

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
    
//    //이메일 로그인 마이페이지 정보 불러오기 (세션에서 user 읽어와 해당 사용자의 정보를 제공)
//    @GetMapping("/info")
//    public ResponseEntity<Users> getUserInfo(HttpSession session) {
//        
//        String userEmail = (String) session.getAttribute("user");
//
//        if (userEmail != null) {
//            Optional<Users> user = userService.loginUser(userEmail);
//            
//            return user.map(ResponseEntity::ok)
//                       .orElse(ResponseEntity.notFound().build());
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }
    
    //마이페이지 정보 수정
    @PutMapping("/update")
    public ResponseEntity<Users> updateUser(@RequestBody Users updatedUser, HttpSession session) {
        
    	String userEmail = (String) session.getAttribute("user");

        if (userEmail != null) {
            
        	Optional<Users> existingUser = userService.loginUser(userEmail);
            
        	if (existingUser.isPresent()) {
                
        		Users user = existingUser.get();
        		
                //업데이트 로직 적용
                user.setUserEmail(updatedUser.getUserEmail());
                user.setNickname(updatedUser.getNickname());

                Users savedUser = userService.registerUser(user);
                return ResponseEntity.ok(savedUser);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
}