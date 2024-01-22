package com.penpick.users.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.penpick.users.model.Users;
import com.penpick.users.repository.UserRepository;

import lombok.Data;

@Data
@Service
public class UserService {

	@Autowired
    private final UserRepository userRepository;
//	@Autowired
//	private final PasswordEncoder passwordEncoder;

	//전체 사용자 조회 (api 테스트)
	public List<Users> getUserApi() {
        return userRepository.findAll();
    }
	
	//로그인 위한 회원 조회
	public Optional<Users> loginUser(String userEmail){
		return userRepository.findByUserEmail(userEmail);
	}
	
//    //새로운 사용자 등록
//	//회원가입 할 경우 비밀번호 암호화해서 DB 저장
//    public Users registerUser(Users users) {
//    	Users user = new Users();
//		user.setUserEmail(users.getUserEmail());
//		//사용자가 비밀번호를 입력한대로 db에 저장하지 X
//		//passwordEncoder를 사용해서 입력받은 비밀번호를 암호화 처리해서 저장하자
//		user.setPassword(passwordEncoder.encode(users.getPassword())); 
//		return userRepository.save(user);
//	}
	
	//새로운 사용자 등록
	public Users registerUser(Users user) {
		return userRepository.save(user);
	}

}