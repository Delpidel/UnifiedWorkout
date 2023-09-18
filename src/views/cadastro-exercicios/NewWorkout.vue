<template>
  <v-app>
    <v-app-bar app color="teal">
      <v-toolbar-title>Cadastro de Treino</v-toolbar-title>
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
    <div>
      <h2 class="mb-4">Cadastro de Novo Treino</h2>
      <v-container>
        <v-sheet class="pa-12" rounded>
          <v-card class="mx-auto px-6 py-8" max-width="auto">
            <v-form @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="12">
                  <p class="pb-2">Exercício</p>
                  <v-select
                    v-model="selectedExercise"
                    label="Exercício"
                    :items="getExerciseDescription()"
                    :rules="[required]"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <p class="pb-2">Repetições</p>
                  <v-text-field
                    v-model="repetitions"
                    label="Repetições"
                    type="number"
                    min="1"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <p class="pb-2">Quilos</p>
                  <v-text-field
                    v-model="weight"
                    label="Quilos"
                    type="number"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <p class="pb-2">Pausa</p>
                  <v-text-field
                    v-model="breakTime"
                    label="Pausa"
                    type="time"
                    :rules="[required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <p class="pb-2">Dia da semana</p>
                  <v-select v-model="day" label="Dia da semana" :items="weekDays"></v-select>
                </v-col>
                <v-col cols="12" md="12">
                  <p class="pb-2">Observações para esse treino</p>
                  <v-textarea v-model="observations" label="Observações"></v-textarea>
                </v-col>
                <v-btn type="submit" color="teal" class="mr-5">Cadastrar</v-btn>
                <router-link :to="'/gerenciamento-alunos/'"></router-link>
                <v-btn @click="sendToStudents()" type="reset" color="error">Cancelar</v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-sheet>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      alunoId: this.$route.query.id,
      weekDays: [
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado',
        'domingo'
      ],
      repetitions: '',
      weight: '',
      breakTime: '',
      day: '',
      observations: '',
      selectedExercise: '',
      exercises: []
    }
  },

  mounted() {
    this.fetchExercises()
    const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' })
    this.day = today
  },

  methods: {
    fetchExercises() {
      axios
        .get('http://localhost:3000/exercises')
        .then((res) => {
          console.log('sucesso')
          this.exercises = res.data
        })
        .catch(() => alert('falhou'))
    },
    getExerciseDescription() {
      return this.exercises.map((item) => item.description)
    },
    getExerciseId(description) {
      const exercise = this.exercises.find((item) => item.exercise_description === description)
      return exercise.id
    },
    submitForm() {
      this.selectedExerciseId = this.getExerciseId(this.exercises.description)
      const formData = {
        student_id: this.alunoId,
        exercise_id: this.selectedExerciseId,
        repetitions: this.repetitions,
        weight: this.weight,
        break_time: this.breakTime,
        observations: this.observations,
        day: this.day
      }
      console.log(formData)

      axios
        .post(`http://localhost:3000/workouts`, formData)
        .then((response) => {
          console.log('Treino cadastrado com sucesso:', response.data)
        })
        .catch((error) => {
          console.error('Erro ao cadastrar treino:', error)
        })
    },
    sendToStudents() {
      this.$router.push({
        path: '/gerenciamento-alunos'
      })
    },
    required(v) {
      return !!v || 'Campo obrigatório'
    }
  }
}
</script>
