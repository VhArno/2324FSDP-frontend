<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'
</script>

<template>
  <section class="results">
    <div class="frame-top">
      <img src="/src/assets/imgs/frame3.svg" alt="odisee icon" />
    </div>

    <h1>Resultaat</h1>

    <div class="text">
      <p>
        Bedankt voor je deelname aan onze studiekeuzetest. Deze test is ontworpen door de Arno Van
        hee, student van hogeschool Odisee. Deze elektronica-ICT specialisatie matcht het best bij
        jouw profiel:
      </p>
      <h2 class="result">Software & AI Developer</h2>
      <p>
        Ben je verrast, of helemaal niet? Check zeker ook de andere opleidingen die aansluiten bij
        jouw interesses. Zo mis je geen enkele kans in je zoektocht naar een goede opleiding.
      </p>
    </div>

    <div class="save">
      <div class="save-result">
        <label for="name">Naam resultaat</label>
        <AppInput type="text" id="name" name="name"></AppInput>
        <AppButton>Sla op</AppButton>
      </div>

      <span></span>

      <div class="send-result">
        <label for="email">Email</label>
        <AppInput type="email" id="email" name="email"></AppInput>
        <AppButton>Verstuur via email</AppButton>
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
      flex: 1;
      width: 50%;
      max-width: 10em;
    }

    :nth-child(2) {
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
