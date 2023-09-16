<template>
  <v-app>
    <v-app-bar app color="teal">
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer> 
      <router-link to="/">
        <v-btn text color="white">Home</v-btn>
      </router-link>
      <router-link to="/gerenciamento-alunos">
        <v-btn text color="white">Alunos</v-btn>
      </router-link>
      <router-link to="/cadastro-exercicios">
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
            <v-card-text class="usuario">{{ usuarioLogado }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Alunos</v-card-title>
            <v-card-text>{{ alunosCount }}</v-card-text>
            <v-btn color="teal"
          size="large"
          class="mb-4 ml-4"
          type="submit"
          variant="elevated"
          @click="adicionarAluno">Adicionar</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Exercícios</v-card-title>
            <v-card-text>{{ exerciciosCount }}</v-card-text>
            <v-btn color="teal"
          size="large"
          class="mb-4 ml-4"
          type="submit"
          variant="elevated"
          @click="adicionarExercicio">Adicionar</v-btn>
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
        alunosCount: 0,
        exerciciosCount: 0,
        usuarioLogado: localStorage.getItem('gym_name')
      };
    },
    mounted() {
      this.buscarDadosDashboard();
    },
    methods: {
    adicionarAluno() {
      axios.get("http://localhost:3000/dashboard").then((response) => {
        this.alunosCount++;
        localStorage.setItem('alunosCount', this.alunosCount)
      });
    },
    adicionarExercicio() {
      axios.get("http://localhost:3000/dashboard").then((response) => {
        this.exerciciosCount++;
        localStorage.setItem('exerciciosCount', this.exerciciosCount);
      });
    },
    buscarDadosDashboard() {
      axios.get("http://localhost:3000/dashboard").then((response) => {
        if (response.data) {
          this.alunosCount = response.data.amount_students;
          this.exerciciosCount = response.data.amount_exercises;
          this.alunosCount = parseInt(localStorage.getItem('alunosCount')) || 0;
          this.exerciciosCount = parseInt(localStorage.getItem('exerciciosCount')) || 0;
          this.$router.push('/dashboard');
        }
      
        })
        .catch((error) => {
          console.log('Erro', error);
        })
       
    },
  }
}
  </script>

<style scoped>
.usuario {
  font-size: 20px;
}

</style>