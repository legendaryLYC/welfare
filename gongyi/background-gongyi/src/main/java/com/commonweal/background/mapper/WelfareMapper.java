package com.commonweal.background.mapper;

import com.commonweal.background.entity.Welfare;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WelfareMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Welfare record);

    int insertSelective(Welfare record);

    Welfare selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Welfare record);

    int updateByPrimaryKey(Welfare record);

    List<Welfare> selectByName(@Param("welfareName") String welfareName);

    List<Welfare> selectAll();

    List<Welfare> selectByComponent(@Param("welfareComponent") String welfareComponent);
}