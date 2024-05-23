<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
import { useTitle } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import type { Result, Specialisation } from '@/types'
import { useResultStore } from '@/stores/result'
import { storeToRefs } from 'pinia'

const title = useTitle()
title.value = 'Result | Odisee specialisatie test'

const resultStore = useResultStore()
const { userAnswers } = storeToRefs(resultStore)

const result = ref<Specialisation>()

const resultSaved = ref<string | null>(null)
const resultSend = ref<string | null>(null)

const nameSubmitted = ref<boolean>(false)
const saveName = ref<string>('')
const nameError = computed(() => {
  if (!nameSubmitted.value) return null
  if (!useAuthStore().isAuthenticated) return 'Login first'
  if (!saveName.value) return 'Enter a save name in'
  if (result.value === undefined) return 'Error saving result'

  return null
})

const emailSubmitted = ref<boolean>(false)
const email = ref<string>('')
const emailError = computed(() => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!emailSubmitted.value) return
  if (!email.value) return 'Email is a required field and was not provided'
  if (!emailRegex.test(email.value))
    return 'The email provided does not follow the pattern name@domain.extension'
  if (result.value === undefined) return 'Error sending result'

  return null
})

function calculateResult() {
  const specializationWeights: Map<Specialisation, number> = new Map()

  for (const key in userAnswers.value) {
    console.log(key)
    const specialisation = { ...userAnswers.value[key].answer.specialisation }
    const weight = userAnswers.value[key].answer.weight

    console.log(specializationWeights.keys())
    console.log(specialisation)

    if (!specializationWeights.has(specialisation)) {
      console.log('Specialisation not in list')

      specializationWeights.set(specialisation, weight)
    } else {
      console.log('Specialisation in list')

      const specWeight = specializationWeights.get(specialisation) ?? 0
      specializationWeights.set(specialisation, specWeight + weight)
    }
  }

  const mapArray = Array.from(specializationWeights.entries())
  mapArray.sort((a, b) => b[1] - a[1])
  result.value = mapArray[0][0]

  console.log(specializationWeights)
  console.log(mapArray)
}

function saveResult() {
  nameSubmitted.value = true

  if (resultSaved.value !== null) {
    resultSaved.value = 'Result already saved!'
  }

  if (nameError.value === null && result.value !== undefined && resultSaved.value === null) {
    resultStore
      .saveResult({
        name: saveName.value,
        description: 'test',
        specialisation_id: result.value.id
      })
      .then(() => {
        resultSaved.value = 'Result saved'
      })
      .catch()
  }
}

function saveUserAnswers() {
  resultStore.saveUserAnswers()
}

function sendResult() {
  emailSubmitted.value = true

  if (resultSend.value !== null) {
    resultSend.value = 'Result already send!'
  }

  if (emailError.value === null && result.value !== undefined && resultSend.value === null) {
    resultStore
      .sendResult({
        email: email.value,
        specialisation_id: result.value.id
      })
      .then(() => {
        resultSend.value = 'Result send'
      })
      .catch()
  }
}

onMounted(() => {
  calculateResult()
  saveUserAnswers()
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
        <label for="name">
          <span class="info">Naam resultaat</span>
          <span v-if="nameError" class="error" data-test="name-error">{{ nameError }}</span>
          <span v-if="resultSaved !== null" class="success">{{ resultSaved }}</span>
        </label>
        <AppInput type="text" id="name" name="name" v-model:value="saveName"></AppInput>
        <AppButton @click="saveResult">Sla op</AppButton>
      </div>

      <span></span>

      <div class="send-result">
        <label for="email">
          <span class="info">Email adres</span>
          <span v-if="emailError" class="error" data-test="email-error">{{ emailError }}</span>
          <span v-if="resultSend !== null" class="success">{{ resultSend }}</span>
        </label>
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

    label {
      display: flex;
      flex-flow: column;

      .info {
        font-size: 1.1em;
      }

      .success {
        color: rgb(74, 74, 201);
      }

      .error {
        color: red;
      }
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

    /*span {
      width: 80%;
      border: 1px solid var(--main);
    }*/
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

      /*span {
        transform: rotate(90deg);
        max-width: 11em;
      }*/
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
