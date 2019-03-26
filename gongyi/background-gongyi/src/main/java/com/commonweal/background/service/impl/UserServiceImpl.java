package com.commonweal.background.service.impl;

import com.commonweal.background.entity.User;
import com.commonweal.background.entity.Welfare;
import com.commonweal.background.form.UserInfo;
import com.commonweal.background.mapper.UserMapper;
import com.commonweal.background.service.ThingsService;
import com.commonweal.background.service.UserService;


import com.commonweal.background.service.WelfareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @author ：李永成
 * @date ：Created in 2019/3/5 10:37
 * @description：用户信息
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private WelfareService welfareService;
    @Autowired
    private ThingsService thingsService;

    @Override
    public User selectByOpenId(String openID) {
        return userMapper.selectByOpenId(openID);
    }

    @Override
    public boolean insertSelective(User user) {
        int result = userMapper.insertSelective(user);
        if(result!=0){
            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public UserInfo selectUserInfo(String openId){
        UserInfo userInfo = new UserInfo();
        User user = userMapper.selectByOpenId(openId);
        //导入user的基本信息到UserInfo实体类
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setOpenId(user.getOpenId());
        // 根据项目id数组得到所有项目，set到UserInfo的List中
        String welfare = user.getWelfareId();
        ArrayList welfareList = new ArrayList<Welfare>();
        String Array1[]={};
        if(welfare==null||welfare.equals("")){
            Array1 = null;
        }
        else{
            Array1= welfare.split(",");
            for(String one : Array1){
                if(one!=null&&!"".equals(one)){
                    welfareList.add(welfareService.selectByPrimaryKey(Long.parseLong(one)));
                }
            }
        }
        userInfo.setWelfareList(welfareList);
        // 根据用户的id联表查出该用户的所有没有义卖的物品。
        userInfo.setThingsList(thingsService.selectAll(user.getId()));
        return userInfo;
    }
    @Override
    public int updateByPrimaryKeySelective(User user){
        return userMapper.updateByPrimaryKeySelective(user);
    }
}
