<template>
  <v-app>
    <v-app-bar app color="teal">
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="dashboard/">
        <v-btn text color="white">Home</v-btn>
      </router-link>
      <router-link to="/gerenciamento-alunos">
        <v-btn text color="white">Alunos</v-btn>
      </router-link>
      <router-link to="/gerenciamento-exercicios">
        <v-btn text color="white">Exercícios</v-btn>
      </router-link>
      <router-link to="/">
        <v-btn text color="white">Sair</v-btn>
      </router-link>
    </v-app-bar>
    <div class="mt-15">
      <v-row>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>Bem-vindo(a),</v-card-title>
            <v-card-text class="usuario">{{ loggedUser }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Alunos</v-card-title>
            <v-card-text>{{ studentsCount }}</v-card-text>
            <v-btn
              color="teal"
              size="large"
              class="mb-4 ml-4"
              type="submit"
              variant="elevated"
              @click="addStudent"
              >Adicionar</v-btn
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Exercícios</v-card-title>
            <v-card-text>{{ exercisesCount }}</v-card-text>
            <v-btn
              color="teal"
              size="large"
              class="mb-4 ml-4"
              type="submit"
              variant="elevated"
              @click="addExercises"
              >Adicionar</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      studentsCount: 0,
      exercisesCount: 0,
      loggedUser: localStorage.getItem('gym_name')
    }
  },
  mounted() {
    this.fetchDashboardData()
  },
  methods: {
    addStudent() {
      axios.get('http://localhost:3000/dashboard').then((response) => {
        this.studentsCount++
        localStorage.setItem('studentsCount', this.studentssCount)
      })
    },
    addExercises() {
      axios.get('http://localhost:3000/dashboard').then((response) => {
        this.exercisesCount++
        localStorage.setItem('exercisesCount', this.exercisesCount)
      })
    },
    fetchDashboardData() {
      axios
        .get('http://localhost:3000/dashboard')
        .then((response) => {
          if (response.data) {
            this.studentssCount = response.data.amount_students
            this.exercisesCount = response.data.amount_exercises
            this.studentsCount = parseInt(localStorage.getItem('studentsCount')) || 0
            this.exercisesCount = parseInt(localStorage.getItem('exercisesCount')) || 0
            this.$router.push('/dashboard')
          }
        })
        .catch((error) => {
          console.log('Erro', error)
        })
    }
  }
}
</script>

<style scoped>
.usuario {
  font-size: 20px;
}
</style>
