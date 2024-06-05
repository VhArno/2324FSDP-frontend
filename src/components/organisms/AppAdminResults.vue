<script setup lang="ts">
import { getAllResults, getUserAnswers } from '@/services/adminService'
import type { AllResults, UserAnswers } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import AppLoading from '../atoms/AppLoading.vue'
import AppChart from '@/components/atoms/AppChart.vue'
import AppAnswerChart from '@/components/molecules/AppAnswerChart.vue'
import { ref, watch } from 'vue'
import { useSpecialisationStore } from '@/stores/specialisation'
import { storeToRefs } from 'pinia'
import { useDateFormater } from '@/composables/dateFormater'
import AppButton from '../atoms/AppButton.vue'

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
const specializationCount = ref<Map<string, number>>(new Map<string, number>())

const populateSpecializationCount = (results: AllResults[]) => {
  const tempMap = new Map<string, number>()
  specialisations.value.forEach((spec) => {
    tempMap.set(spec.name, 0)
  })
  results.forEach((result) => {
    if (tempMap.has(result.specialisation.name)) {
      const value = tempMap.get(result.specialisation.name) ?? 0
      tempMap.set(result.specialisation.name, value + 1)
    }
  })
  specializationCount.value = tempMap
}

watch(
  () => data.value,
  (newData) => {
    if (newData) {
      populateSpecializationCount(newData.data.data)
    }
  },
  { immediate: true } // Execute the watcher immediately on component mount
)

// results charts
const currChart = ref<number>(0)

const nextChart = () => {
  currChart.value += 1
}

const previousChart = () => {
  currChart.value -= 1
}
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

  <div class="table-container">
    <table
      class="results"
      v-if="!isPending && !isError && data?.data.data && data?.data.data?.length > 0"
    >
      <thead>
        <tr class="table-head">
          <th>id</th>
          <th>name</th>
          <th>date</th>
          <th>result</th>
          <th>user email</th>
        </tr>
      </thead>

      <tbody>
        <tr class="result" v-for="result in data?.data.data" :key="result.id">
          <td>{{ result.id }}</td>
          <td>{{ result.name }}</td>
          <td>{{ useDateFormater(result.created_at).newDate }}</td>
          <td>
            <b>{{ result.specialisation.name }} {{ result.specialisation.description }}</b>
          </td>
          <td>{{ result.user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    class="charts"
    v-if="!isError && !isPending && data?.data.data && data?.data.data?.length > 0"
  >
    <h2>Result charts</h2>

    <div class="result-chart">
      <h3>Results per specialisation</h3>
      <AppChart
        :labels="Array.from(specializationCount.keys())"
        :values="Array.from(specializationCount.values())"
      ></AppChart>
    </div>

    <div class="answer-chart-title">
      <h3>Results per question</h3>
      <p>{{ currChart + 1 }}/{{ userAnswers.data.value?.data.data.length }}</p>
    </div>
    <div class="answers">
      <div class="answer-charts">
        <AppAnswerChart
          class="chart"
          v-show="currChart === index"
          v-for="(question, index) in userAnswers.data.value?.data.data"
          :key="question.id"
          :question="question.question"
          :answers="question.answers"
        ></AppAnswerChart>
      </div>

      <div class="chart-btns">
        <AppButton
          class="chart-btn previous"
          v-if="userAnswers.data.value"
          :disabled="currChart <= 0"
          @click="previousChart()"
          ><i class="fa-solid fa-chevron-left"></i
        ></AppButton>
        <AppButton
          class="chart-btn next"
          v-if="userAnswers.data.value"
          :disabled="currChart >= userAnswers.data.value?.data.data.length - 1"
          @click="nextChart()"
          ><i class="fa-solid fa-chevron-right"></i
        ></AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: auto;

  .results {
    width: 100%;
    height: 100%;
    min-width: max-content;
    min-height: max-content;
    text-align: center;
    border-collapse: collapse;

    tr {
      height: 2.5em;
      border: 1px solid var(--main-light);

      th {
        border-right: 1px solid var(--bg);
      }
    }

    thead {
      background-color: var(--main-light);

      th {
        text-transform: uppercase;
      }
    }

    tbody {
      position: relative;

      tr {
        .options {
          padding: 0.5rem;

          &:hover {
            background-color: var(--main-light);
            cursor: pointer;
          }
        }
      }
    }
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
    font-size: 1.2em;
  }

  .result-chart {
    text-align: center;
    margin: 0 auto;
    width: 100%;
    max-width: 60rem;
  }

  .answer-chart-title {
    text-align: center;
  }

  .answers {
    display: flex;
    flex-flow: column;
    gap: 2rem;
    text-align: center;
    margin-top: 1rem;
    width: 100%;
    align-items: center;
    justify-content: center;

    .chart-btns {
      display: flex;
      flex-flow: row;
      gap: 1rem;
    }

    .chart-btn {
      &:disabled {
        cursor: not-allowed;
      }
    }

    .answer-charts {
      text-align: center;
      margin: 0 auto;
      width: 100%;
      max-width: 60rem;

      .chart {
        width: 100%;
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
}

@media (min-width: 45em) {
  /*.charts {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
    margin-top: 2rem;

    .answers {
      display: flex;
      flex-flow: row;
      gap: 2rem;
      text-align: center;
      margin-top: 1rem;
      width: 100%;
      align-items: center;
      justify-content: center;

      .chart-btns {
        display:flex;
        flex-flow: row;
        gap: 1rem;
      }

      .previous {
        order: -1;
      }

      .next {
        order: 1;
      }

      .chart-btn {
        &:disabled{
          cursor: not-allowed
        }
      }

      .answer-charts {
        .chart {
      }
    }
  }
}*/
}
</style>
