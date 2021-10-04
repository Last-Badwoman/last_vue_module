import request from '@/utils/request'


export default {

  findSubject(pid) {
    return request({
      url: `/last/service/subject/find/${pid}`,
      method: "get"
    });
  },

  saveSubject(pid, name) {
    return request({
      url: `/last/service/subject/save`,
      method: "get",
      params: {pid, name}
    });
  },
  deleteSubject(id) {
    return request({
      url: `/last/service/subject/del/${id}`,
      method: "delete"
    })
  },

}
