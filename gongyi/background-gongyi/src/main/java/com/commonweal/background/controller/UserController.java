package com.commonweal.background.controller;
import com.commonweal.background.entity.User;
import com.commonweal.background.form.UserInfo;
import com.commonweal.background.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * @author ：李永成
 * @date ：Created in 2019/3/5 11:22
 * @description：登陆用户的看病流程
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping("/userinfo")
    public UserInfo userInfo(String openId) {
        return userService.selectUserInfo(openId);
    }
    @ResponseBody
    @RequestMapping("/donate")
    public String donate(String openId,int money,Long welfareId){
        User user = userService.selectByOpenId(openId);
        String welfare[] = user.getWelfareId().split(",");
        // flag来判断是否该用户为该项目捐款，false代表之前未捐款，更新user的welfareId字段信息，否则不更新。
        boolean flag = false;
        for(String one : welfare){
            if(one!=null&&!"".equals(one)){
                if(Long.parseLong(one)==welfareId){
                    flag = true;
                }
            }
        }
        if(flag == false){
            user.setWelfareId(user.getWelfareId()+","+welfareId);
            userService.updateByPrimaryKeySelective (user);
        }
        return "1";
    }
}
