package com.commonweal.background.service;

import com.commonweal.background.entity.User;
import com.commonweal.background.form.UserInfo;

public interface UserService {

    User selectByOpenId(String openID);

    boolean insertSelective(User user);

    UserInfo selectUserInfo(String openId);

    int updateByPrimaryKeySelective(User user);
}
