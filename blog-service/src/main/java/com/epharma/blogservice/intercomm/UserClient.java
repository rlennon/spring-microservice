package com.epharma.blogservice.intercomm;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@FeignClient("user-service")
public interface UserClient{


    public static final String APPLICATION_JSON = "application/json";

    @RequestMapping(value = "/service/names", method = RequestMethod.POST, consumes = APPLICATION_JSON)
    List<String> getUsers(@RequestBody List<Long> userIdList);
    
}