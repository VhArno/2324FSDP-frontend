<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
import { useTitle } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import type { Specialisation } from '@/types'
import { useResultStore } from '@/stores/result'
import { storeToRefs } from 'pinia'
import { useSpecialisationStore } from '@/stores/specialisation'
import { useTestStore } from '@/stores/test'

const title = useTitle()
title.value = 'Result | Odisee specialisatie test'

// Specialisations store
const specialisationStore = useSpecialisationStore()
const { specialisations } = storeToRefs(specialisationStore)

// Results store
const testStore = useTestStore()
const { userAnswers, testSaved, savedResult } = storeToRefs(testStore)

const result = ref<[Specialisation, number][]>([])
result.value = savedResult.value ? savedResult.value : []
const result_id = ref<number | null>(null)

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
const email = ref<string>(useAuthStore().user?.email || '')
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

  specialisations.value.forEach((spec) => {
    specializationWeights.set({ ...spec }, 0)
  })

  for (const key in userAnswers.value) {
    const specialisation = { ...userAnswers.value[key].answer.specialisation }
    const weight = userAnswers.value[key].answer.weight

    for (const k of specializationWeights.keys()) {
      if (k.id === specialisation.id) {
        const value = specializationWeights.get(k) ?? 0
        specializationWeights.set(k, value + weight)
      }
    }
  }

  const mapArray = Array.from(specializationWeights.entries())
  mapArray.sort((a, b) => b[1] - a[1])
  result.value = mapArray

  console.log(specializationWeights)
  console.log(mapArray)

  testStore.setResult(mapArray)
  return mapArray
}

async function saveResult() {
  if (!nameSubmitted.value) {
    try {
      const res = await useResultStore().saveResult({
        description: 'test',
        specialisation_id: result.value[0][0].id
      })
      result_id.value = res ?? null // Assign the result or null if undefined
    } catch (error) {
      console.error(error)
    }

    console.log(result_id.value)
  }
}

function saveUserResult() {
  nameSubmitted.value = true

  if (resultSaved.value !== null) {
    resultSaved.value = 'Result already saved!'
  }

  if (
    nameError.value === null &&
    result.value !== undefined &&
    resultSaved.value === null &&
    result_id.value !== null
  ) {
    useResultStore()
      .editResult({
        name: saveName.value,
        description: 'test',
        result_id: result_id.value
      })
      .then(() => {
        resultSaved.value = 'Result saved'
      })
      .catch(() => {
        resultSaved.value = 'Error saving result'
      })
  }
}

function saveUserAnswers() {
  useResultStore().saveUserAnswers()
}

function sendResult() {
  emailSubmitted.value = true

  if (resultSend.value !== null) {
    resultSend.value = 'Result already send!'
  }

  if (emailError.value === null && result.value !== undefined && resultSend.value === null) {
    useResultStore()
      .sendResult({
        email: email.value,
        specialisation_id: result.value[0][0].id
      })
      .then(() => {
        resultSend.value = 'Result send'
      })
      .catch(() => {
        resultSaved.value = 'Error sending result'
      })
  }
}

onMounted(async () => {
  if ((await testSaved.value) == false) {
    calculateResult()
    saveUserAnswers()
    saveResult()
    testSaved.value = true
  }
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
      <div class="result">
        <h2 v-for="(res, index) in result" :key="index" v-show="res[1] !== 0">
          {{ res[0].name }} : {{ res[1] * 10 }}%
        </h2>
      </div>
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
        <AppButton @click="saveUserResult">Sla op</AppButton>
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

    <div class="retake">
      <p>Doe de test opnieuw!</p>
      <AppButton @click="testStore.resetTest">Doe test opnieuw</AppButton>
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
