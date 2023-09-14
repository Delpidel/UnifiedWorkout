<template>
    <h2 class="mb-4">Cadastro de Novo aluno</h2>
    <v-container>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width=auto>
        <v-form @submit.prevent="cadastrarAluno">
          <v-row>
            <v-col
             cols="12"
              md="6"
               >
          <v-text-field
            v-model="aluno.name"
            label="Nome Completo"
            :rules="[required]"
            clearable
            required
          ></v-text-field>
        </v-col>
        <v-col
             cols="12"
              md="6"
               >
          <v-text-field
            v-model="aluno.email"
            label="E-mail"
            required
            clearable
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
            clearable
            required
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
            clearable
            type="date"
            required
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
            @blur="consultarCEP"
            :rules="[required]"
            required
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
            required
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
            required
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
            required
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
            required
          ></v-text-field>
          </v-col>
          <v-col
             cols="12"
              md="4"
               >
          <v-text-field
           v-model="aluno.complement" 
           label="Complemento" 
           required
           ></v-text-field>
           </v-col>

          <v-btn type="submit" color="teal">Cadastrar</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-sheet>
   </v-container>
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
    consultarCEP() {
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
          console.error('Erro ao consultar CEP:', error)
        })
    },
    cadastrarAluno() {
      axios
        .post('http://localhost:3000/students', this.aluno)
        .then((response) => {
          alert('Cadastrado com sucesso')
          localStorage.setItem('gym_name', response.data.name)
          this.$router.push('/')
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
