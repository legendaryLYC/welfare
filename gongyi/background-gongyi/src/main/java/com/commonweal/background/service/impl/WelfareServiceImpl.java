package com.commonweal.background.service.impl;

import com.commonweal.background.entity.Welfare;
import com.commonweal.background.mapper.WelfareMapper;
import com.commonweal.background.service.WelfareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ：李永成
 * @date ：Created in 2019/3/8 10:43
 * @description：公益列表类
 */

@Service("welfareService")
public class WelfareServiceImpl implements WelfareService {

    @Autowired
    private WelfareMapper welfareMapper;

    @Override
    public List<Welfare> selectAll() {
        return welfareMapper.selectAll();
    }

    @Override
    public List<Welfare> selectByName(String welfareName) {
        return welfareMapper.selectByName(welfareName);
    }

    @Override
    public List<Welfare> selectByComponent(String Component) {
        return welfareMapper.selectByComponent(Component);
    }

    @Override
    public Welfare selectByPrimaryKey(Long id){
        return welfareMapper.selectByPrimaryKey(id);
    }
}
