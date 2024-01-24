package com.penpick.users.controller;

import java.util.Map;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.penpick.users.service.MailService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MailController {

    private final MailService mailService;
    private final JavaMailSender javaMailSender;

    @ResponseBody
    @PostMapping("/mail")
    public String mailSend(@RequestBody Map<String, String> requestBody){
    	
//    	// MailService 객체 생성
//    	MailService mailService = new MailService(javaMailSender);
//         
//    	int number = mailService.sendMail(mail);
//    	String num = "" + number;
//    	return num;
    	
    	String mail = requestBody.get("mail");
        // MailService 객체 생성 시 javaMailSender를 주입하지 않아도 됨
        int number = mailService.sendMail(mail);
        return String.valueOf(number);
    }

}