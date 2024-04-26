<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppButton from '../atoms/AppButton.vue'

const router = useRouter()

function goToTest() {
  router.push('/test')
}
</script>

<template>
  <section class="intro">
    <div>
      <div class="title">
        <h1>Bachelor Elektronica-ICT</h1>
        <h3>Bachelor - Digital technologie en wetenschap</h3>
      </div>

      <p>
        De bachelor Elektronica-ICT bij Odisee is de gedroomde opleiding als je gebeten bent door
        internet, computers, smartphones en alle technologie die erachter zit. Wil je zelf netwerken
        leggen, apps en websites maken of slimme toestellen ontwerpen voor het Internet of Things?
        In deze opleiding stel je zélf je lessenpakket samen en word je een kei in Internet of
        Things, Software & AI, Telecom, Network & Security of Web & Mobile Development. Ontdek
        hierna hoe de bacheloropleiding Elektronica-ICT bij Odisee eruit ziet, welke
        afstudeerrichtingen het biedt, welke vakken je mag verwachten, hoeveel stage je kunt volgen
        en in welke beroepen je terecht komt!
      </p>
    </div>
    <img src="/src/assets/imgs/frame1.svg" alt="odisee icon" />
  </section>

  <section class="details">
    <img class="frame" src="/src/assets/imgs/frame2.svg" alt="Odisee icon" />

    <div>
      <h2>2 afstudeerrichtingen</h2>
      <ul>
        <li>Elektronica</li>
        <li>ICT</li>
      </ul>
    </div>

    <div>
      <h2>5 specialisaties</h2>
      <ul>
        <li>Telecommunications Egineer (Elektronica)</li>
        <li>Internet of Things Developer (Elektronica)</li>
        <li>Network & Security Engineer (ICT)</li>
        <li>Software & AI Developer (ICT)</li>
        <li>Web Developer (ICT)</li>
      </ul>
      <AppButton @click="goToTest">Doe de test!</AppButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.intro {
  display: flex;
  flex-flow: row;
  gap: 10rem;

  .title {
    display: flex;
    flex-flow: column-reverse;
  }

  p {
    margin: 2rem 0;
  }
}

.details {
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  padding: 2rem;
  margin: 2rem 0;
  background-color: var(--bg2);
  color: var(--bg);

  .frame {
    position: absolute;
    top: 0px;
    left: 0px;
    transform: rotate(-90deg);
  }

  button {
    margin-top: 2rem;
  }
}
</style>
