package com.commonweal.background.mapper;

import com.commonweal.background.entity.Things;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ThingsMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Things record);

    int insertSelective(Things record);

    Things selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Things record);

    int updateByPrimaryKey(Things record);

    List<Things> selectByComponent(@Param("userId") Long userId, @Param("thingComponent") String thingComponent);

    List<Things> selectAll(Long userId);

    int sellThings(Long thingId);
}