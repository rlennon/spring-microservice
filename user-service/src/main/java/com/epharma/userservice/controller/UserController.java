package com.epharma.userservice.controller;

import java.security.Principal;
import java.util.List;

import com.epharma.userservice.dto.StringResponse;
import com.epharma.userservice.model.Role;
import com.epharma.userservice.model.User;
import com.epharma.userservice.service.SecurityService;
import com.epharma.userservice.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/service/registration")
    public ResponseEntity<?> register(@RequestBody User user){
        if (userService.findByUsername(user.getUsername()) != null) {
            logger.error("username Already exist " + user.getUsername());
            return new ResponseEntity(
                    new StringResponse("user with username " + user.getUsername() + "already exist "),
                    HttpStatus.CONFLICT);
        }
        user.setRole(Role.USER);

        userService.save(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @GetMapping("/service/user")
    public ResponseEntity<?> user(Principal principal) {
        logger.debug("user logged "+principal);
        if(principal==null || principal.getName()==null){
            return ResponseEntity.ok(principal);
        }
        return new ResponseEntity<User>(userService.findByUsername(principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/api/user/service/user")
    public ResponseEntity<?> auth(Principal principal) {
        logger.debug("user logged "+principal);
        if(principal==null || principal.getName()==null){
            return ResponseEntity.ok(principal);
        }
        return new ResponseEntity<User>(userService.findByUsername(principal.getName()), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/service/names")
    public ResponseEntity<?> getUsers(@RequestBody List<Long> userIdList){
        return ResponseEntity.ok(userService.findUsers(userIdList));
    }
}