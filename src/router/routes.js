import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login/Login.vue'
import SignUp from '..views/SignUp/SignUp.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import ManageExercises from '../views/ManageExercises/Exercises.vue'
import ManageStudents from '../views/ManageStudents/Students.vue'
import NewStudent from '../views/NewStudent/NewStudent.vue'
import NewWorkout from '../views/NewWorkout/NewWorkout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastros',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/'
    }
  ]
})

export default router
