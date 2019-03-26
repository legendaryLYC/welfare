package com.commonweal.background.service;

import com.commonweal.background.entity.Welfare;

import java.util.List;

public interface WelfareService {

     List<Welfare> selectByName(String welfareName);

     List<Welfare> selectAll();

     Welfare selectByPrimaryKey(Long id);

     List<Welfare> selectByComponent(String welfareComponent);
}
