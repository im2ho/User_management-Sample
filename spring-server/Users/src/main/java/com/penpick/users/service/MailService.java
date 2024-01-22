package com.penpick.users.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "tpgml0816@gmail.com";

    //인증번호 생성
    public int createNumber() {
        return (int) (Math.random() * 90000) + 100000;
    }

    public MimeMessage createMail(String mail) {
        int number = createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse(mail));
            message.setSubject("이메일 인증");
            String body = "<h3>요청하신 인증 번호입니다.</h3><h1>" + number + "</h1><h3>감사합니다.</h3>";
            message.setContent(body, "text/html; charset=utf-8");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }

    public int sendMail(String mail) {
        MimeMessage message = createMail(mail);
        javaMailSender.send(message);
        return createNumber();
    }
}

