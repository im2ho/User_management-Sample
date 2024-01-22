package com.penpick.users.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.users.model.Users;
import com.penpick.users.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //전체 회원 조회 (api테스트용)
    public List<Users> getUserApi() {
        return userRepository.findAll();
    }
    
    //createUser 로직 생성
    public void createUser(Users user) {
    	userRepository.save(user);
    }
    
    //deleteUser 로직 생성
    public void deleteUser(Integer id) {
    	userRepository.deleteById(id);
    }
    
    //회원 정보 수정 로직 생성 > 특정 id에 대한 데이터 가져오기
    public Users userDetail(Integer id) {
    	return userRepository.findById(id).get();
    }
}