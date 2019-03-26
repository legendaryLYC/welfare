package com.commonweal.background.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.commonweal.background.entity.User;
import com.commonweal.background.entity.WeChatAppLoginReq;
import com.commonweal.background.service.UserService;
import com.commonweal.background.util.WechatGetUserInfoUtil;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

import java.io.IOException;

/**
 * @ClassName: GetOpenId
 * @Description: TODO 用来获取openid
 * @Author: HRX
 * @Date: 2019/3/2 11:19
 **/
@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value={"/getOpenId"})
    public Map<String, Object> get(@ModelAttribute WeChatAppLoginReq req, String encryptedData, String iv, HttpServletRequest request) throws IOException {
        /**
         * TODO 此处填写小程序的appid
         **/

        //孟晓冬:wxd19d375968142baa
    	//宋博通：wx5f54656e21c8543e
        //lyc :wx034750048ff00e3f
        String appid = "wx034750048ff00e3f";
        /**
         * TODO 小程序 appSecret
         **/
        //孟晓冬:2fcef77da14b41288dce5ce2100d94ea
        //宋博通：cbbc4c5a310e06cf139ae3dde83a74c8
        // lyc: ee5092b4e07be31a0740da0eca2ae93a
        String secret = "ee5092b4e07be31a0740da0eca2ae93a";

        /**
         * TODO 小程序登录时获取的 code
         **/
        String jsCode = req.getCode();
        /**
         * TODO 授权类型，此处只需填写 authorization_code
         **/
        String grantType = "authorization_code";

        String url = "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+jsCode+"&grant_type="+grantType;
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(url);
        CloseableHttpResponse res = client.execute(httpGet);
        if (res.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
            HttpEntity entity = res.getEntity();
            String result= EntityUtils.toString(entity, "UTF-8");
            JSONObject jsonObject = JSON.parseObject(result);
            
            com.alibaba.fastjson.JSONObject json =  WechatGetUserInfoUtil.getUserInfo(encryptedData,jsonObject.getString("session_key"),iv);
            //得到登陆人的信息
            String openID = json.get("openId").toString();
            Integer sex = (Integer)json.get("gender");
            String name = json.get("nickName").toString();
            // 获取openId ,存入数据库中
            User user = new User();
            user.setOpenId(openID);
            user.setName(name);
            User isExist = userService.selectByOpenId(openID);
            if(isExist==null){
                userService.insertSelective(user);
            }
            System.out.println(json);
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("openId",openID);
            return map;
        }
        return null;
    }
}
