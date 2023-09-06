import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/login/Login.vue'
import SignUp from '..views/cadastro/SignUp.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import ManageExercises from '../views/gerenciamento-exercicios/Exercises.vue'
import ManageStudents from '../views/gerenciamento-alunos/Students.vue'
import NewStudent from '../views/novo-aluno/NewStudent.vue'
import NewWorkout from '../views/cadastro-exercicios/NewWorkout.vue'
import WorkoutView from '../views/visualizar-exercicios/WorkoutView.vue'

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
      path: '/gerenciamento-exercicios',
      name: 'Exercises',
      component: ManageExercises
    },
    {
      path: '../gerenciamento-alunos',
      name: 'Students',
      component: ManageStudents
    },
    {
      path: '../novo-aluno',
      name: 'NewStudent',
      component: NewStudent
    },
    {
      path: '../cadastro-exercicios',
      name: 'NewWorkout',
      component: NewWorkout
    },
    {
      path: '../visualizar-exercicios',
      name: 'WorkoutView',
      component: WorkoutView
    }
  ]
})

export default router
