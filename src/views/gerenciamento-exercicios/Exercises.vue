<template>
  <v-app>
    <v-app-bar app color="teal">
      <v-toolbar-title>Gerenciamento de Exercícios</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/dashboard">
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
    <v-container class="mt-15">
      <v-row>
        <v-col xs="12" sm="6">
          <v-text-field
            v-model="novoExercicio"
            label="Digite o nome do exercício"
            required
            class="text-field-responsive"
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="6" class="mt-4">
          <v-btn @click="adicionarExercicio" color="teal" class="mb-2">Cadastrar</v-btn>
        </v-col>
      </v-row>

      <h3>Exercícios Cadastrados</h3>

      <div class="table-responsive">
        <table class="exercise-table">
          <thead>
            <tr>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exercicio, index) in exercises" :key="index">
              <td>{{ exercicio.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="exercises.length === 0">Nenhum exercício cadastrado.</p>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      novoExercicio: '',
      exercises: []
    }
  },
  methods: {
    adicionarExercicio() {
      if (this.novoExercicio.trim() === '') {
        return
      }
      axios
        .post('http://localhost:3000/exercises', { description: this.novoExercicio })
        .then(() => {
          this.novoExercicio = ''
          this.buscarExercicios()
        })
        .catch((error) => {
          console.error('Erro ao cadastrar exercício:', error)
        })
    },
    buscarExercicios() {
      axios
        .get('http://localhost:3000/exercises')
        .then((response) => {
          this.exercises = response.data
        })
        .catch((error) => {
          console.error('Erro ao buscar exercícios:', error)
        })
    },
    removerExercicio(index) {
      this.exercises.splice(index, 1)
    }
  },
  mounted() {
    this.buscarExercicios()
  }
}
</script>

<style>
.table-responsive {
  max-width: 100%;
}

.exercise-table {
  width: 100%;
  border-collapse: collapse;
}

.exercise-table th,
.exercise-table td {
  border: 1px solid #e0e0e0;
  padding: 8px;
  text-align: left;
}

.exercise-table th {
  background-color: #f2f2f2;
}

@media (max-width: 800px) {
  .exercise-table th,
  .exercise-table td,
  .text-field-responsive {
    padding: 6px;
  }
}
</style>