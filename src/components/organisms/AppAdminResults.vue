<script setup lang="ts">
import { getAllResults, getUserAnswers } from '@/services/adminService'
import type { AllResults, ChartData, UserAnswers } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import AppLoading from '../atoms/AppLoading.vue'
import AppChart from '@/components/atoms/AppChart.vue'
import AppAnswerChart from '@/components/molecules/AppAnswerChart.vue'
import { ref } from 'vue'
import { useSpecialisationStore } from '@/stores/specialisation'
import { storeToRefs } from 'pinia'
import { useDateFormater } from '@/composables/dateFormater'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['results'],
  queryFn: getAllResults<{ data: AllResults[] }>
})

const userAnswers = useQuery({
  queryKey: ['userAnswers'],
  queryFn: getUserAnswers<{ data: UserAnswers[] }>
})

// specialisations
const specialistionStore = useSpecialisationStore()
const { specialisations } = storeToRefs(specialistionStore)

// results chart
const specializationCount: Map<string, number> = new Map<string, number>()

/* Setting map keys */
specialisations.value.map((spec) => {
  specializationCount.set(spec.name, 0)
})

/* settings map values */
data.value?.data.data.map((rest) => {
  if (specializationCount.has(rest.specialisation.name)) {
    const value = specializationCount.get(rest.specialisation.name) ?? 0
    specializationCount.set(rest.specialisation.name, value + 1)
  }
})

const labels = ref(Array.from(specializationCount.keys()))
const values = ref(Array.from(specializationCount.values()))

// answers chart
</script>

<template>
  <h1>Results</h1>

  <div class="error" v-if="isPending">
    <h2>Loading results...</h2>
    <AppLoading></AppLoading>
  </div>

  <div class="error" v-if="isError">
    <h2>Something went wrong! Try again later...</h2>
    <p>{{ error }}</p>
  </div>

  <div
    class="error"
    v-if="!isError && !isPending && data?.data.data && data?.data.data?.length <= 0"
  >
    <h2>There are no results yet</h2>
  </div>

  <div class="results" v-if="!isPending && !isError">
    <h2>All saved results</h2>
    <div class="result">
      <p>id</p>
      <p>name</p>
      <span>date</span>
      <span>result</span>
      <span>email</span>
    </div>

    <div class="result" v-for="result in data?.data.data" :key="result.id">
      <p>{{ result.id }}</p>
      <p>{{ result.name }}</p>
      <span>{{ useDateFormater(result.created_at).newDate }}</span>
      <span
        ><b>{{ result.specialisation.name }} {{ result.specialisation.description }}</b></span
      >
      <span>{{ result.user.email }}</span>
    </div>
  </div>

  <div class="charts">
    <h2>Result charts</h2>

    <div class="result-chart">
      <h3>Results per specialisation</h3>
      <AppChart :labels="labels" :values="values"></AppChart>
    </div>

    <h3>Results per question</h3>
    <div class="answers">
      <div class="answer-charts">
        <AppAnswerChart
          class="chart"
          v-for="question in userAnswers.data.value?.data.data"
          :key="question.id"
          :question="question.question"
          :answers="question.answers"
        ></AppAnswerChart>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.results {
  display: flex;
  flex-flow: column;
  gap: 1rem;

  .result {
    background-color: var(--main-light);
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
}

.charts {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;

  h3 {
    text-align: center;
    text-decoration: underline;
    font-weight: 600;
  }

  .result-chart {
    text-align: center;
    margin: 0 auto;
    width: 100%;
    max-width: 50rem;
  }

  .answers {
    text-align: center;
    margin-top: 1rem;
    overflow-x: scroll;
    width: 100%;

    .answer-charts {
      width: max-content;
      display: flex;
      flex-flow: row;
      gap: 5rem;

      .chart {
        flex: 1;
        width: 50rem !important;
      }
    }
  }
}

.error {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
}
</style>
