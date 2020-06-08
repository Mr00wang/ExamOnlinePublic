const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/teacher/home', // 对应的path
        icon: 'home', // 图标名称
        isPublic: true, // 公开的
    },

   /* {
        title: '学生管理', // 菜单标题名称
        key: '/teacher/stu_manage', // 对应的path
        icon: 'edit', // 图标名称
    },*/
    {
        title: '分组管理',
        key: '/teacher/group',
        icon: 'apartment',
    },
    {
        title: '考试管理',
        key: '/teacher/exam_manage',
        icon: 'profile',
        children: [ // 子菜单列表
            {
                title: '查看考试',
                key: '/teacher/exam_manage/look',
                icon: 'eye'
            },
            {
                title: '添加考试',
                key: '/teacher/exam_manage/add',
                icon: 'plus'
            },
        ]
    },
    {
        title: '试卷管理',
        key: '/teacher/practice_manage',
        icon: 'project',
        children: [ // 子菜单列表
            {
                title: '查看试卷',
                key: '/teacher/practice_manage/look',
                icon: 'eye'
            },
            {
                title: '添加试卷',
                key: '/teacher/practice_manage/add',
                icon: 'plus'
            },
        ]
    },
    {
        title: '题库',
        key: '/teacher/title_manage',
        icon: 'database',
        children: [ // 子菜单列表
            {
                title: '查看题库',
                key: '/teacher/title_manage/look',
                icon: 'eye'
            },
            {
                title: '添加题库',
                key: '/teacher/title_manage/add',
                icon: 'plus'
            },
        ]
    },
    {
        title: '成绩管理',
        key: '/teacher/score_manage',
        icon: 'fund',
        children: [ // 子菜单列表
            {
                title: '考试成绩',
                key: '/teacher/score_manage/look',
                icon: 'eye'
            },
        ]
    },
    {
        title: '申请通知',
        key: '/teacher/inform',
        icon: 'notification'
    }


];

export default menuList