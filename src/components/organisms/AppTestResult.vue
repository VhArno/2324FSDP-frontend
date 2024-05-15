<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
import { useTitle } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import type { Result, Specialisation } from '@/types'
import { useResultStore } from '@/stores/result'
import { storeToRefs } from 'pinia'

const title = useTitle()
title.value = 'Result | Odisee specialisatie test'

const resultStore = useResultStore()
const { results } = storeToRefs(resultStore)

const saveErrors = ref<string[]>([])
const emailErrors = ref<string[]>([])

const saveName = ref<string>('')
const email = ref<string>('')

const result = ref<Specialisation>()

function calculateResult() {
  const specializationWeights: Map<number, number> = new Map()

  // Calculate weights for each specialization
  results.value?.forEach((result) => {
    const specializationId = result.answer.specialisation.id
    const weight = result.answer.weight

    if (specializationWeights.has(specializationId)) {
      specializationWeights.set(
        specializationId,
        specializationWeights.get(specializationId)! + weight
      )
    } else {
      specializationWeights.set(specializationId, weight)
    }
  })

  // Find specialization with the highest total weight
  let highestWeight = -Infinity

  specializationWeights.forEach((weight, specializationId) => {
    if (weight > highestWeight) {
      highestWeight = weight
      result.value = results.value?.find(
        (result) => result.answer.specialisation.id === specializationId
      )?.answer.specialisation
    }
  })
}

function saveResult() {
  saveErrors.value = []

  if (useAuthStore().isAuthenticated && saveName.value && result.value) {
    resultStore.saveResult({
      name: saveName.value,
      description: 'test',
      specialisation_id: result.value.id
    })
  } else {
    !useAuthStore().isAuthenticated ? saveErrors.value.push('Log eerst in') : ''
    !saveName.value ? saveErrors.value.push('Vul een geldige naam in') : ''
  }
}

function sendResult() {
  emailErrors.value = []
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (emailRegex.test(email.value) && result.value) {
    resultStore.sendResult({
      email: email.value,
      specialisation_id: result.value.id
    })
  } else {
    emailErrors.value.push('Vul een geldig email adres in')
  }
}

onMounted(() => {
  calculateResult()
})
</script>

<template>
  <section class="results">
    <div class="frame-top">
      <img src="/src/assets/imgs/frame3.svg" alt="odisee icon" />
    </div>

    <h1 tabindex="-1">Resultaat</h1>

    <div class="text">
      <p>
        Bedankt voor je deelname aan onze studiekeuzetest. Deze test is ontworpen door de Arno Van
        hee, student van hogeschool Odisee. Deze elektronica-ICT specialisatie matcht het best bij
        jouw profiel:
      </p>
      <h2 class="result">{{ result?.name }}</h2>
      <p>
        Ben je verrast, of helemaal niet? Check zeker ook de andere opleidingen die aansluiten bij
        jouw interesses. Zo mis je geen enkele kans in je zoektocht naar een goede opleiding.
      </p>
    </div>

    <div class="save">
      <div class="save-result">
        <label for="name">Naam resultaat</label>
        <div class="error" v-if="saveErrors.length > 0">{{ saveErrors[0] }}</div>
        <AppInput type="text" id="name" name="name" v-model:value="saveName"></AppInput>
        <AppButton @click="saveResult">Sla op</AppButton>
      </div>

      <span></span>

      <div class="send-result">
        <label for="email">Email</label>
        <div class="error" v-if="emailErrors.length > 0">{{ emailErrors[0] }}</div>
        <AppInput type="email" id="email" name="email" v-model:value="email"></AppInput>
        <AppButton @click="sendResult">Verstuur via email</AppButton>
      </div>
    </div>

    <div class="frames">
      <img src="/src/assets/imgs/frame1.svg" alt="odisee icon" />
      <img src="/src/assets/imgs/frame2.svg" alt="odisee icon" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.frame-top {
  margin-bottom: 1rem;
}

.results {
  text-align: center;

  .text {
    margin: 1rem auto;

    .result {
      margin: 1rem 0;
    }
  }

  .save {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    margin: 4rem auto;
    gap: 2rem;

    .error {
      color: red;
    }

    div {
      display: flex;
      flex-flow: column;
      width: 100%;
      max-width: 20em;

      label {
        text-align: left;
        font-weight: 500;
      }

      button {
        margin-top: 1rem;
      }
    }

    span {
      width: 80%;
      border: 1px solid var(--main);
    }
  }

  .frames {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    position: static;

    img {
      width: 10em;
    }

    :nth-child(1) {
      z-index: -1;
      flex: 1;
      width: 50%;
      max-width: 10em;
    }

    :nth-child(2) {
      z-index: -1;
      flex: 1;
      width: 50%;
      max-width: 10em;
      transform: rotate(90deg);
    }
  }
}

@media (min-width: 55em) {
  .frame-top {
    position: absolute;
    top: 0px;
    left: 0px;

    img {
      max-width: 10em;
    }
  }

  .results {
    padding-top: 2rem;

    .text {
      max-width: 50%;

      .result {
        margin: 1rem 0;
      }
    }

    .save {
      flex-flow: row;

      span {
        transform: rotate(90deg);
        max-width: 11em;
      }
    }
  }

  .frames {
    :nth-child(1) {
      position: absolute;
      bottom: 0px;
      left: 0px;
    }

    :nth-child(2) {
      position: absolute;
      bottom: 0px;
      right: 0px;
      transform: rotate(90deg);
    }
  }
}
</style>
