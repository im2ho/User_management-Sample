//package com.penpick.kakao.controller;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.penpick.kakao.dto.KakaoLoginDTO;
//import com.penpick.kakao.model.KakaoUser;
//import com.penpick.kakao.repository.KakaoUserRepository;
//import com.penpick.kakao.service.KakaoLoginService;
//
//import jakarta.servlet.http.HttpSession;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
//@RequestMapping("/api")
//public class KakaoLoginController {
//
//    private final KakaoLoginService kakaoLoginService;
//    private final KakaoUserRepository userRepository;
//    private final HttpSession httpSession;
//
//    @Autowired
//    public KakaoLoginController(KakaoLoginService kakaoLoginService, KakaoUserRepository userRepository, HttpSession httpSession) {
//        this.kakaoLoginService = kakaoLoginService;
//        this.userRepository = userRepository;
//        this.httpSession = httpSession;
//    }
//
//    @PostMapping("/kakao-login")
//    public ResponseEntity<String> handleKakaoLogin(@RequestParam String code) {
//    	
//        try {
//            // 카카오톡으로 인증한 사용자 정보
//            KakaoLoginDTO kakaoLoginDTO = kakaoLoginService.getKakaoInfo(code);
//
//            // 이미 DB에 저장된 사용자인지 확인
//            Optional<KakaoUser> existingUser = userRepository.findByEmail(kakaoLoginDTO.getEmail());
//
//            if (existingUser.isPresent()) {
//                // 이미 저장된 사용자일 경우 세션에만 저장
//                httpSession.setAttribute("kakaoUserInfo", kakaoLoginDTO);
//                return ResponseEntity.ok("카카오 로그인 성공");
//            } else {
//                // DB에 사용자 정보 저장
//                KakaoUser newUser = kakaoLoginService.registerUser(kakaoLoginDTO);
//                httpSession.setAttribute("kakaoUserInfo", kakaoLoginDTO);
//                return ResponseEntity.ok("카카오 회원가입 및 로그인 성공");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("카카오 로그인 실패");
//        }
//    }
//
//    @GetMapping("/kakao-userdata")
//    public ResponseEntity<KakaoLoginDTO> getSessionValues() {
//    	
//    	//로그인한 유저 정보 가져오기
//        KakaoLoginDTO kakaoUserInfo = (KakaoLoginDTO)httpSession.getAttribute("kakaoUserInfo");
//        
//        if (kakaoUserInfo != null) {
//            return ResponseEntity.ok(kakaoUserInfo);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }
//}
