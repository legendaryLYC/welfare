package com.commonweal.background.entity;

public class Welfare {
    private Long id;

    private String title;

    private String remark;

    private String plan;

    private String charityMission;

    private String charityOfficer;

    private String component;

    private String headImg;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan == null ? null : plan.trim();
    }

    public String getCharityMission() {
        return charityMission;
    }

    public void setCharityMission(String charityMission) {
        this.charityMission = charityMission == null ? null : charityMission.trim();
    }

    public String getCharityOfficer() {
        return charityOfficer;
    }

    public void setCharityOfficer(String charityOfficer) {
        this.charityOfficer = charityOfficer == null ? null : charityOfficer.trim();
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component == null ? null : component.trim();
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg == null ? null : headImg.trim();
    }
}