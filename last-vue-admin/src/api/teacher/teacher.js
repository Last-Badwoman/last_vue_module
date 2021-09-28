import request from '@/utils/request'

export default {

  findTeachersPage(current, limit, teacherQuery) {
    return request({
      url: `/last/service/teacher/find/${current}/${limit}`,
      method: "post",
      data: teacherQuery
    })
  },

  delTeacherById(id) {
    return request({
      url: `/last/service/teacher/del/${id}`,
      method: "delete"
    });
  },

  saveTeacher(teacher) {
    return request({
      url: `/last/service/teacher/save`,
      method: "post",
      data: teacher
    });
  },

  findTeacherById(id) {
    return request({
      url: `/last/service/teacher/find/${id}`,
      method: "get"
    })
  },

  updateTeacher(teacher) {
    return request({
      url: `/last/service/teacher/update`,
      method: "post",
      data: teacher
    })
  }
}
