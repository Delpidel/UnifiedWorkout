<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :type="show1 ? 'text' : 'password'"
          :rules="[required]"
          clearable
          label="Senha"
          placeholder="Password"
        ></v-text-field>

        <br>
        <v-btn
          color="teal"
          size="large"
          type="submit"
          variant="elevated"
          block
          >
          Entrar
        </v-btn><br>
        <p>Ainda não tem conta? <router-link to="/cadastro">Cadastre-se</router-link></p>
      </v-form>
    </v-card>
  </v-sheet>
</template>
  
<script>

import axios from 'axios'
  export default {
    data: () => ({
      form: false,
      email: '',
      emailRules: [
        v => !!v || 'Campo obrigatório',
      ],
      password: '',
      loading: false,
    }),

    methods: {
      onSubmit () {
        console.log("enviou formulário")

        axios
        .post('http://localhost:3000/sessions', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
         alert("Logado com sucesso")
          localStorage.setItem("gym_token", response.data.token)
          localStorage.setItem("gym_name", response.data.name)
          this.$router.push('/dashboard');
        })
        .catch((error) => {
          console.error('Erro ao realizar login:', error);
        })
       
    },
    // Propriedade RULES para deixar o código mais enxuto
      required (v) {
        return !!v || 'Campo obrigatório'
      },
    },
  }
</script>
