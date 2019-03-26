package com.commonweal.background.controller;

import com.commonweal.background.entity.User;
import com.commonweal.background.entity.Welfare;
import com.commonweal.background.service.WelfareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ：李永成
 * @date ：Created in 2019/3/7 21:27
 * @description：公益项目类
 */
@Controller
@RequestMapping("/welfare")
public class WelfareController {

    @Autowired
    private WelfareService welfareService;

    /**
    * @Author: 李永成
    * @Date: 2019/3/8
    * @Description:  根据公益的id或者公益名字查出公益项目列表
    * @Param:  String welfareName
    * @return:  Map<String, List<Welfare>>
    */
    @ResponseBody
    @RequestMapping("/welfarelist")
    public Map<String, List<Welfare>> welfareList(String welfareName){
        Map welfareList = new HashMap<String,List<Welfare>>();
        List<Welfare> AllWelfare = null ;
        if(welfareName!=null&&!"".equals(welfareName)){
            welfareName = welfareName.trim();
            AllWelfare = welfareService.selectByName(welfareName);
        }
        else{
            AllWelfare = welfareService.selectAll();
        }
        welfareList.put("welfareList",AllWelfare);
        return welfareList;
    }

    /**
    * @Author: 李永成
    * @Date: 2019/3/8
    * @Description:  根据公益分类(导航栏)查出公益项目
    * @Param:  String welfareComponent
    * @return:  Map welfareList<String,List<Welfare>>()
    */
    @ResponseBody
    @RequestMapping("/welfarelist1")
    public Map<String, List<Welfare>> welfareList1(String welfareComponent){
        Map welfareList = new HashMap<String,List<Welfare>>();
        List<Welfare> AllWelfare = null ;
        if(welfareComponent!=null&&!"".equals(welfareComponent)){
            welfareComponent = welfareComponent.trim();
            AllWelfare = welfareService.selectByComponent(welfareComponent);
        }
        else{
            AllWelfare = welfareService.selectAll();
        }
        welfareList.put("welfareList",AllWelfare);
        return welfareList;
    }

    @ResponseBody
    @RequestMapping("/welfaredetail")
    public Welfare welfareDetail(Long welfareId){
        return welfareService.selectByPrimaryKey(welfareId);
    }
}
