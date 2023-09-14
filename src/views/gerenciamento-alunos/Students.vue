<template>
  <v-app>
    <v-app-bar app color="teal">
      <v-toolbar-title>Gerenciamento de Alunos</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn text color="white">Home</v-btn>
      </router-link>
      <router-link to="/link2">
        <v-btn text color="white">Alunos</v-btn>
      </router-link>
      <router-link to="/link3">
        <v-btn text color="white">Exercícios</v-btn>
      </router-link>
      <router-link to="/link1">
        <v-btn text color="white">Sair</v-btn>
      </router-link>
    </v-app-bar>
    <v-container class="mt-15">
      <v-row>
        <v-col xs="12" sm="6">
          <v-text-field
            v-model="pesquisa"
            label="Pesquisar Aluno"
            @input="filtrarAlunos"
          ></v-text-field>
        </v-col>
        <v-col xs="12" sm="6" class="mt-4">
          <v-btn
            @click="searchStudent"
            color="teal"
            class="mb-2"
          >Buscar</v-btn>
        </v-col>
      </v-row>

      <h3>Alunos Cadastrados</h3>

      <div class="table-responsive">
        <table class="exercise-table">
          <thead>
            <tr>
              <th>Aluno(a)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(aluno, index) in alunosFiltrados" :key="index">
              <td>{{ aluno.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pesquisa: '',
      alunos: [],
    };
  },
  computed: {
    alunosFiltrados() {
      return this.alunos.filter(aluno => {
        return (
          aluno.name.toLowerCase().includes(this.pesquisa.toLowerCase())
          // Adicione outras condições de pesquisa, se necessário
        );
      });
    },
  },
  methods: {
    buscarAlunos() {
      axios.get('http://localhost:3000/students')
        .then(response => {
          this.alunos = response.data.students;
        })
        .catch(error => {
          console.error('Erro ao buscar alunos:', error);
        });
    },
    filtrarAlunos() {
      // Atualize a lista de alunos filtrados com base na pesquisa
    },
  },
  mounted() {
    this.buscarAlunos();
  },
};
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