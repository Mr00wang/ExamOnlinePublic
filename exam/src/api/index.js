/*
要求： 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
 */

import ajax from "./ajax"
import ajax1 from "./ajax1"
const BASE = '';

//用户登陆接口
export const reqLogin = (username,password) => ajax( BASE+'/login', {username,password}, 'POST');

//用户注册接口
export const reqRegister = (username, password, nickname, email, code, role) => ajax(BASE+'/user/register', {username, password, nickname, email, code,role}, 'POST');

//用户注册发送验证码接口
export const reqSendCode = (username, email) => ajax(BASE+'/get_email_code', {username, email}, 'POST');

//查询群组
export const reqSearchGroup = (groupMasterId, id) => ajax(BASE+'/group/select_group', {groupMasterId, id}, 'POST');

//获取群组内成员接口
export const reqGetGroupUser = (groupId) => ajax(BASE+'/group/select_group_users', {groupId}, 'POST');

//删除群组内成员接口
export const reqDeleteGroupUser = (groupId, userId) => ajax(BASE+'/group/delete_user_group', {groupId, userId}, 'POST');

//创建群组
export const reqAddGroup = (groupName) => ajax(BASE+'/group/create_group', {groupName}, 'POST');

//修改群组
export const reqUpdateGroup = (id, groupName, groupMasterId) => ajax(BASE+'/group/update_group', {id, groupName, groupMasterId}, 'POST');

//删除群组
export const reqDeleteGroup = (groupId) => ajax(BASE+'/group/delete_group_by_id', {groupId}, 'POST');

//申请加群/邀请加群接口
export const reqApplyAddGroup = (groupId, userId, desc) => ajax(BASE+'/group_request/add_request', {groupId, userId, desc}, 'POST');

//查询加群请求
export const reqGetApplyCommit = (groupId, userId) => ajax1(BASE+'/group_request/select_request', {groupId, userId}, 'POST');

//群组通过所有加群请求
export const reqByAllGroupCommit = (groupId) => ajax(BASE+'/group_request/pass_a_group_all_request', {groupId}, 'POST');

//群组批量通过加群请求
export const reqByGroupCommit = (userList, groupId) => ajax(BASE+'/group_request/pass_request', {userList, groupId}, 'POST');

//群组批量拒绝加群请求
export const reqRefuseGroupCommit = (userList, groupId) => ajax(BASE+'/group_request/refuse_request', {userList, groupId}, 'POST');

//查看题库接口
export const reqLookTitles = (type, tag) => ajax(BASE+'/subject/select_subject',{type, tag}, 'POST');

//添加试题接口
export const reqAddTitles = (type, tag, question, answerList, optionList) => ajax(BASE+'/subject/add_subject',{type, tag, question, answerList, optionList},'POST');

//查看试卷接口
export const reqLookTests = (createUserId, id) => ajax(BASE+'/test_paper/select_test_paper_no_detail', {createUserId, id}, 'POST');

//查看试卷详细接口
export const reqLookDescTest = (createUserId, id) => ajax(BASE+'/test_paper/select_test_paper_detail', {createUserId, id}, 'POST')

//添加试卷接口
export const reqAddTest = (name, subjects) => ajax(BASE+'/test_paper/add_test_paper',{name, subjects}, 'POST');

//查询考试接口
export const reqLookExams = (exam, status) => ajax(BASE+'/exam/select_exam_activity', {exam, status}, 'POST');

//创建考试接口
export const reqAddExam = (testPaperId, activityName, isPrivate, examAccessGroupList, startTime, endTime, examDuration) => ajax(BASE+'/exam/create_exam_activity', {testPaperId, activityName, isPrivate, examAccessGroupList,  startTime, endTime, examDuration}, 'POST');

//修改考试信息接口
export const reqUpdateExam = (id, activityName, isPrivate, startTime, endTime, examDuration) => ajax(BASE+'/exam/update_exam_activity',{id, activityName, isPrivate,  startTime, endTime, examDuration}, 'POST')

//查询用户加入群组信息接口
export const reqLookJoinGroup = (userId) => ajax(BASE+'/group/select_user_join_groups', {userId}, 'POST');

//学生端查询参加的考试接口
export const reqLookCompleteExam = () => ajax1(BASE+'/exam/select_user_can_take_part_in_exam', {}, 'POST');

//参加考试
export const reqEnterExam = (examId) => ajax1(BASE+'/exam/take_part_in_exam', {examId}, 'POST');

//提交考试接口
export const reqCommitExam = (examId, subjectList, userNoteName, testPaperId) => ajax1(BASE+'/exam/finish_exam', {examId, subjectList, userNoteName, testPaperId}, 'POST');

//查询完成考试的粗略信息，获取考试分数
export const reqGetScore = (testPaperId, userId) => ajax(BASE+'/complete_test_paper/select_complete_test_paper_no_detail', {testPaperId, userId}, 'POST');