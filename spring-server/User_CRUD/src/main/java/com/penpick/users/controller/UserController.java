package com.penpick.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.users.model.Users;
import com.penpick.users.service.UserService;

import java.util.List;

@Controller
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true")
public class UserController {

    @Autowired
    private UserService userService;

    //전체 회원 정보(api 테스트)
    @ResponseBody
    @GetMapping("/user")
    public List<Users> userApi() {
        return userService.getUserApi();
    }
    
    //해당 url 경로에 form양식의 데이터를 보내면 매개변수 user에 담아온다
    @PostMapping("/user/create")
    public String createUser(Users user) {
    	userService.createUser(user);
    	
    	//post 하고난 뒤 표시할 url
    	//리액트의 서버 포트가 3000을 사용하므로 localhost:3000
    	return "redirect:http://localhost:3000/";
    }
    
    //회원 삭제
    @GetMapping("/user/delete")
    public String deleteUser(Integer id) {
    	userService.deleteUser(id);
    	
    	return "redirect:http://localhost:3000/";
    }
    
    //회원 정보 수정
    @PostMapping("/user/update")
    public String updateUser(Integer id, Users user) {
    	Users userTemp = userService.userDetail(id);
    	userTemp.setIntroduce(user.getIntroduce());
    	
    	userService.createUser(userTemp);
    	return "redirect:http://localhost:3000/";
    }
}