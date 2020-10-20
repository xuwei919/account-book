import request from '../utils/request'
const group_name = 'payment'
export default {

    payList(pageNo, pageSize) {
        return request({
            url: `/${group_name}/list?pageNo=` + pageNo + '&pageSize=' + pageSize,
            method: 'get'
        })
    },
    selectOne(id) {
        return request({
            url: `/${group_name}/selectOne?id=` + id,
            method: 'get'
        })
    },
    deleteById(id) {
        return request({
            url: `/${group_name}/deleteById?id=` + id,
            method: 'post'
        })
    },

    editById(id) {
        return request({
            url: `/${group_name}/editById?id=` + id,
            method: 'post'
        })
    }


}