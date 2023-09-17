<template>
  <v-app>
    <v-app-bar app color="teal">
      <v-toolbar-title>Visualizar Treinos</v-toolbar-title>
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
      <div v-if="arrayTreino.length > 0" class="mt-15">
        <h2>Treino</h2>
      </div>
      <h2>Exercícios de Hoje</h2>
      <div>
      <v-checkbox v-for="workout in todayWorkout" :key="workout.id" v-model="status" :label="[workout.exercise_description, ' || ',
      workout.weight, ' kg || ', workout.repetitions, ' repetições || ', workout.break_time, ' tempo de Pausa ']"
        :value="workout.id">{{ workout.exercise_description }}</v-checkbox>
      </div>
      <h2>Exercícios da Semana</h2>
      <v-card>
        <v-tabs v-model="diaSemana">
          <v-tab value="segunda">Segunda</v-tab>
          <v-tab value="terca">Terça</v-tab>
          <v-tab value="quarta">Quarta</v-tab>
          <v-tab value="quinta">Quinta</v-tab>
          <v-tab value="sexta">Sexta</v-tab>
          <v-tab value="sabado">Sábado</v-tab>
          <v-tab value="domingo">Domingo</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window>
            <v-window-item>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">
                      Nome
                    </th>
                    <th class="text-left">
                      Peso
                    </th>
                    <th class="text-left">
                      Repetições
                    </th>
                    <th>
                      Pausa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="treino in arrayTreino" :key="treino.id">
                    <td> {{ treino.exercise_description }}</td>
                    <td> {{ treino.weight }} Quilos</td>
                    <td> {{ treino.repetitions }} Repetições</td>
                    <td> {{ treino.break_time }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
export default {
  data() {
    return {
      alunoId: this.$route.query.id,
      alunoName: this.$route.query.name,
      diaSemana: null,
      arrayTreino: [],
      todayWorkout: [],
      treino: {},
      todayDay: 'domingo',
      status: '',
      selectedExerciseId: '',
      treinoNovo: []
    };
  },

  mounted() {
    this.todayDay = format(new Date(), "cccc", { locale: ptBR })
    this.fetchExercises()
    this.fetchTodaysExercise()
    console.log(this.diaSemana)
    console.log(this.todayDay)
    this.newTreino()

  },

  methods: {
    async fetchExercises() {
      try {
        const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.alunoId}`)
        this.arrayTreino = response.data.workouts
        this.arrayTreino = this.arrayTreino.filter(item => item.day === this.diaSemana)
        console.log(this.arrayTreino)
      } catch (error) {
        console.error('Erro ao buscar treinos', error)
      }
    
  },

  async fetchTodaysExercise(){
    try {
      const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.student_id}`)
      this.todayWorkout = response.data.workouts
     // this.selectedExerciseId = response.data.workouts.id
      this.todayWorkout = this.todayWorkout.filter(item => item.day === 'domingo' )
      console.log(this.todayWorkout)

      console.log(this.selectedExerciseId)
    } catch (error) {
      console.error("Falhou", error)
    }
    },

  workoutStatus(){
    axios.post(`http://localhost:3000/workouts/check`,
    {
      selectedExerciseId: this.selectedExercise,
      student_id: this.alunoId,
      day_of_week: this.todayDay,
    })
  },
  newTreino(){
     axios.get(`http://localhost:3000/workouts?student_id=${this.student_id}`)
        
        .then((response) => {
          this.treinoNovo = response.data.workouts;
          console.log(this.treinoNovo)

        })
        .catch(() => {
          console.log("dados não encontrados");
        });
    },


  },
  watch: {
    diaSemana() {
      this.fetchExercises()
    },
    status(){
      this.workoutStatus()
    }
  }
}
</script>