package com.commonweal.background.controller;

import com.commonweal.background.entity.Things;
import com.commonweal.background.service.ThingsService;
import com.commonweal.background.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author ：李永成
 * @date ：Created in 2019/3/7 21:26
 * @description：用户物品管理类
 */
@Controller
@RequestMapping("/things")
public class ThingsController {

    @Autowired
    private ThingsService thingsService;
    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping("/thingslist")
        public List<Things> thingsList(String openId,String thingComponent){
        Long userId = userService.selectByOpenId(openId).getId();

        List<Things> thingsList = null ;
        if(thingComponent!=null&&!"".equals(thingComponent)){
            thingComponent = thingComponent.trim();
            thingsList = thingsService.selectByComponent(userId,thingComponent);
        }
        else{
            thingsList = thingsService.selectAll(userId);
        }
        return thingsList;
    }
    @ResponseBody
    @RequestMapping("/sellthings")
    public String sellThings(Long thingId){
        try{
            thingsService.sellThings(thingId);
            return "1";
        }
        catch (Exception e){
            return "2";
        }
    }

}
