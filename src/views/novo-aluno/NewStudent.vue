<template>
   <v-app>
    <v-app-bar app color="teal">
      <v-toolbar-title>Cadastro de Alunos</v-toolbar-title>
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
    <v-container>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width=auto>
        <v-form @submit.prevent="addStudent">
          <v-row>
            <v-col
             cols="12"
              md="6"
               >
          <v-text-field
            v-model="aluno.name"
            label="Nome Completo"
            :rules="[required]"
          ></v-text-field>
        </v-col>
        <v-col
             cols="12"
              md="6"
               >
          <v-text-field
            v-model="aluno.email"
            label="E-mail"
            :rules="emailRules"
          ></v-text-field>
        </v-col>
        <v-col
             cols="12"
              md="6"
               >
          <v-text-field
            v-model="aluno.contact"
            label="Telefone"
            :rules="[required]"
          ></v-text-field>
          </v-col>
          <v-col
             cols="12"
              md="6"
               >
          <v-text-field
            v-model="aluno.date_birth"
            label="Data de Nascimento"
            :rules="[required]"
            type="date"
            max="2009-09-13"
          ></v-text-field>
          </v-col>
          <v-col
             cols="12"
              md="4"
               >
          <v-text-field
            v-model="cep"
            label="CEP"
            @blur="fetchCEP"
            :rules="[required]"
          ></v-text-field>
          </v-col>
          <v-col
             cols="12"
              md="4"
               >
          <v-text-field
            v-model="aluno.street"
            :rules="[required]"
            label="Logradouro"
          ></v-text-field>
          </v-col>
          <v-col
             cols="12"
              md="4"
               >
          <v-text-field
            v-model="aluno.neighborhood"
            :rules="[required]"
            label="Bairro"
          ></v-text-field>
          </v-col>
          <v-col
             cols="12"
              md="4"
               >
          <v-text-field
            v-model="aluno.city"
            :rules="[required]"
            label="Cidade"
          ></v-text-field>
          </v-col>
          <v-col
             cols="12"
              md="4"
               >
          <v-text-field
            v-model="aluno.province"
            :rules="[required]"
            label="Estado"
          ></v-text-field>
          </v-col>
          <v-col
             cols="12"
              md="4"
               >
          <v-text-field
           v-model="aluno.complement" 
           label="Complemento" 
           ></v-text-field>
           </v-col>
          <v-btn type="submit" color="teal">Cadastrar</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-sheet>
   </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      aluno: {
        name: '',
        email: '',
        contact: '',
        date_birth: '',
        cep: '',
        street: '',
        neighborhood: '',
        city: '',
        province: '',
        complement: '',
        number: ''
      },

      cep: '',
      emailRules: [(v) => !!v || 'E-mail é obrigatório']
    }
  },
  methods: {
    fetchCEP() {
      axios
        .get(`https://viacep.com.br/ws/${this.cep}/json/`)
        .then((response) => {
          const data = response.data
          this.aluno.street = data.logradouro
          this.aluno.neighborhood = data.bairro
          this.aluno.city = data.localidade
          this.aluno.province = data.uf
        })
        .catch((error) => {
          console.error('Erro ao fetch CEP:', error)
        })
    },
    addStudent() {
      axios
        .post('http://localhost:3000/students', this.aluno)
        .then((response) => {
          alert('Cadastrado com sucesso')
          localStorage.setItem('gym_name', response.data.name)
          this.$router.push('/gerenciamento-alunos/')
        })
        .catch((error) => {
          this.mensagem = 'Erro ao cadastrar aluno.'
          this.mensagemTipo = 'error'
          console.error('Erro ao cadastrar aluno:', error)
        })
    },
    required(v) {
      return !!v || 'Campo obrigatório'
    }
  }
}
</script>
