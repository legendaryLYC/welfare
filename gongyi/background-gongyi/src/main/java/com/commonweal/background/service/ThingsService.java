package com.commonweal.background.service;

import com.commonweal.background.entity.Things;

import java.util.List;

public interface ThingsService {

    List<Things> selectByComponent(Long userId,String thingComponent);

    List<Things> selectAll(Long userId);

    int sellThings(Long thingId);

}
