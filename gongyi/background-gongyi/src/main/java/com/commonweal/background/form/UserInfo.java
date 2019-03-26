package com.commonweal.background.form;

import com.commonweal.background.entity.Things;
import com.commonweal.background.entity.Welfare;

import java.util.List;

/**
 * @author ：李永成
 * @date ：Created in 2019/3/8 20:28
 * @description：用户详细信息表，包括用户参加的项目，拥有的书籍
 */
public class UserInfo {

    private Long id;

    private String openId;

    private String name;

    private String welfareId;

    private List<Things> thingsList;

    private List<Welfare> welfareList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWelfareId() {
        return welfareId;
    }

    public void setWelfareId(String welfareId) {
        this.welfareId = welfareId;
    }

    public List<Things> getThingsList() {
        return thingsList;
    }

    public void setThingsList(List<Things> thingsList) {
        this.thingsList = thingsList;
    }

    public List<Welfare> getWelfareList() {
        return welfareList;
    }

    public void setWelfareList(List<Welfare> welfareList) {
        this.welfareList = welfareList;
    }
}
