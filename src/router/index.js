import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import adminLogin from '../views/AdminLogin.vue'
import index from '../components/AdminIndex'
import adminlist from "../views/AdminList.vue"
import student from "../views/StudentManager.vue"
import teacher from "../views/TeacherManager.vue"
import collegeManager from "../views/CollegeManager.vue"
import classManager from "../views/ClassManager.vue"
import specManager from "../views/SpecManager.vue"
import courseManager from "../views/CourseManager.vue"
import MyIndex from "../components/MyIndex"
import myClass from "../views/MyClass.vue";
import selectClass from "../views/SelectClass.vue"
import myGrades from "../views/MyGrades.vue"
import MyInfo from "../views/MyInfo.vue"
import gradesPage from "../views/GradesPages"
import TCManager from "../views/TCourseManager.vue"
import TGManager from "../views/TGradesManager.vue"

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const   routes=[
    {
      path: '/',
      redirect: '/Login'
    },{
      path: '/admin',
      name: 'adminLogin',
      component: adminLogin
    },{
      path: '/Login',
      name: 'Login',
      component: Login
    },{
      path: '/index',
      name: 'Index',
      component: index,
      children:[
        {
          path:"/adminlist",
          name:"adminlist",
          component:adminlist,
          meta:{
            title:'管理员列表'
          }
        },        
        {
          path:"/studentManager",
          name:"studentManager",
          component:student,
          meta:{
            title:'学生管理'
          }
        },
        {
          path:"/teacherManager",
          name:"teacherManager",
          component:teacher,
          meta:{
            title:'教师管理'
          }
        },
        {
          path:"/collegeManager",
          name:"collegeManager",
          component:collegeManager,
          meta:{
            title:'学院信息'
          }
        },
        {
          path:"/specManager",
          name:"specManager",
          component:specManager,
          meta:{
            title:'专业信息'
          }
        },
        {
          path:"/classManager",
          name:"classManager",
          component:classManager,
          meta:{
            title:'班级信息'
          }
        },
        {
          path:"/courseManager",
          name:"courseManager",
          component:courseManager,
          meta:{
            title:'课程管理'
          }
        },
        {
          path:"/TCManager",
          name:"TCManager",
          component:TCManager,
          meta:{
            title:'课程管理'
          }
        },
        {
          path:"/TGManager",
          name:"TGManager",
          component:TGManager,
          meta:{
            title:'成绩管理'
          }
        },
      ]
    },
    {
      path: '/MyIndex',
      name: 'MyIndex',
      component: MyIndex,
      meta:{
        title:'我的主页'
      },
      children:[
        {
          path:"/myClass",
          name:"myClass",
          component:myClass,
          meta:{
            title:'我的课程'
          }
        },  
        {
          path:"/selectClass",
          name:"selectClass",
          component:selectClass,
          meta:{
            title:'课程管理'
          }
        }, 
        {
          path:"/myGrades",
          name:"MyGrades",
          component:myGrades,
          meta:{
            title:'我的成绩'
          }
        }, 
        {
          path:"/grades",
          name:"grades",
          component:gradesPage,
          meta:{
            title:'我的成绩'
          }
        }, 
        {
          path:"/myInfo",
          name:"Info",
          component:MyInfo,
          meta:{
            title:'个人信息'
          }
        }, 
      ]
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
