<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="name"
          class="mb-2"
          :error-messages="errors.name"
          label="Nome completo"
        ></v-text-field>

        <v-text-field
          v-model="email"
          class="mb-2"
          :error-messages="errors.email"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          :error-messages="errors.password"
          label="Senha"
          placeholder="Password"
        ></v-text-field>

        <v-text-field
          v-model="verifyPassword"
          type="password"
          :error-messages="errors.verifyPassword"
          label="Confirme a senha"
          placeholder="Password"
        ></v-text-field>

        <v-select
          v-model="type_plan"
          :error-messages="errors.type_plan"
          :items="items"
          label="Selecione o plano"
          required
        ></v-select>

        <br />
        <v-btn 
        color="teal" 
        size="large" 
        type="submit" 
        variant="elevated"
        block> Criar conta </v-btn
        ><br />
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import axios from 'axios'
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
export default {
  data: () => ({
    errors: {},
    name: '',
    email: '',
    password: '',
    type_plan: 'bronze',
    items: [
      {
        title: 'Bronze',
        value: 'bronze'
      },
      {
        title: 'Prata',
        value: 'silver'
      },
      {
        title: 'Ouro',
        value: 'gold'
      }
    ]
  }),

  methods: {
    onSubmit() {
      try {
        const schema = yup.object().shape({
          name: yup.string().required('Nome é obrigatório'),
          email: yup.string().email('Email não é valido').required('Email é obrigatório'),
          type_plan: yup.string().required('Escolha um plano'),
          password: yup
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .max(20, 'Deve ter entre 8-20 caracteres')
            .required('A senha é obrigatória'),
          verifyPassword: yup
            .string()
            .required('A confirmação necessária')
            .oneOf([yup.ref('password')], 'As senhas devem coincidir')
        })

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            type_plan: this.type_plan,
            password: this.password,
            verifyPassword: this.verifyPassword
          },
          { abortEarly: false }
        )

        axios
          .post('http://localhost:3000/users', {
            name: this.name,
            email: this.email,
            password: this.password,
            verifyPassword: '',
            type_plan: this.type_plan
          })
          .then(() => {
            alert('Cadastrado com sucesso')
            this.$router.push('/')
          })
          .catch(() => {
            alert('Falha ao cadastrar')
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
        }
      }
    }
  }
}
</script>
