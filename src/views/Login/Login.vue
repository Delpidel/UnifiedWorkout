<template>
    <form @submit.prevent="handleLogin" class="login-form">
      <input placeholder="Digite o email" v-model="email" :class="{ error: emptyEmail }"
      @input="clearError('email')"/>
      <span v-if="emptyEmail" class="error-message">Campo obrigatório</span>
  
      <input type="password" placeholder="Digite a senha" v-model="password" :class="{ error: emptyPassword }"
      @input="clearError('password')"/>
      <span v-if="emptyPassword" class="error-message">Campo obrigatório</span>
      
  
      <button type="submit">Logar</button>
  
      <p>Ainda não tem conta? <router-link to="/cadastro">Cadastre-se</router-link></p>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        emptyEmail: false,
        emptyPassword: false
      }
    },
    methods: {
      handleLogin() {
          if (this.email === "") this.emptyEmail = true;
          if (this.password === "") this.emptyPassword = true;
      },
      clearError(fieldName) {
          if (fieldName === "email" && this.email) {
          this.emptyEmail = false;
          }
          if (fieldName === "password" && this.password) {
          this.emptyPassword = false;
        }
      }
  }
  }
  
  </script>
  
  <style scoped>
  .login-form {
    margin: 40px auto;
    width: 40%;
    border-radius: 4px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 30px;
  }
  
  input {
    height: 54px;
    width: 80%;
    border-radius: 8px;
    border: 1px solid #756767;
    outline: none;
  }
  .error {
    border: 1px solid red;
  }
  
  .error-message {
    color: red;
  }
  </style>