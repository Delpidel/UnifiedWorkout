<template>
    <div>
      <h2 class="mb-4">Visualização de Treinos</h2>
  
      <!-- Mostrar informações de treinos por dia da semana -->
      <div v-for="(dayData, dayOfWeek) in treinos" :key="dayOfWeek">
        <h3>{{ dayOfWeek }}</h3>
        <ul>
          <li v-for="treino in dayData" :key="treino.id">
            <label>
              <input type="checkbox" v-model="treino.checked" @change="marcarTreino(treino)">
              {{ treino.exercise_name }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        treinos: {}, // Armazenar treinos por dia da semana
        studentId: 1, // Substitua pelo ID do estudante selecionado
      };
    },
    mounted() {
      this.carregarTreinos();
    },
    methods: {
      async carregarTreinos() {
        try {
          // Substitua :id pelo ID do estudante selecionado
          const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.studentId}`);
          const treinosData = response.data;
  
          // Organizar treinos por dia da semana
          this.treinos = this.organizarTreinosPorDia(treinosData);
        } catch (error) {
          console.error('Erro ao carregar treinos:', error);
        }
      },
      organizarTreinosPorDia(treinosData) {
        const treinosPorDia = {};
  
        treinosData.forEach((treino) => {
          const diaSemana = treino.day;
  
          if (!treinosPorDia[diaSemana]) {
            treinosPorDia[diaSemana] = [];
          }
  
          treinosPorDia[diaSemana].push({
            id: treino.id,
            exercise_name: treino.exercise_name,
            checked: false,
          });
        });
  
        return treinosPorDia;
      },
      async marcarTreino(treino) {
        try {
          const requestBody = {
            workout_id: treino.id,
            student_id: this.studentId,
            day_of_week: this.obterDiaSemana(treino),
          };
  
          // Fazer uma solicitação POST para /workouts/check
          await axios.post('http://localhost:3000/workouts/check', requestBody);
  
          // Lidar com a resposta ou atualizar os treinos, se necessário
        } catch (error) {
          console.error('Erro ao marcar treino:', error);
        }
      },
      obterDiaSemana(treino) {
        // Lógica para obter o dia da semana com base no treino (por exemplo, usando uma biblioteca de data)
        // Substitua esta função de acordo com suas necessidades
        return 'segunda-feira'; // Exemplo: retornar sempre segunda-feira
      },
    },
  };
  </script>
  
  <style>

  </style>