package com.commonweal.background.service.impl;

import com.commonweal.background.entity.Things;
import com.commonweal.background.mapper.ThingsMapper;
import com.commonweal.background.service.ThingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ：李永成
 * @date ：Created in 2019/3/8 14:57
 * @description：物品信息管理类
 */
@Service("/thingsService")
public class ThingsServiceImpl implements ThingsService {

    @Autowired
    private ThingsMapper thingsMapper;

    @Override
    public List<Things> selectByComponent(Long userId, String thingComponent) {
        return thingsMapper.selectByComponent(userId,thingComponent);
    }

    @Override
    public List<Things> selectAll(Long userId) {
        return thingsMapper.selectAll(userId);
    }

    @Override
    public int sellThings(Long thingId){
        return thingsMapper.sellThings(thingId);
    }
}
