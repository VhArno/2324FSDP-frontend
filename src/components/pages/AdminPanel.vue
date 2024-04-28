<script setup lang="ts">
import AppButton from '../atoms/AppButton.vue';
</script>

<template>
  <section class="admin-panel">
    <div class="side-menu">
      <h2>Menu</h2>
      <div>
        <button>Vragen</button>
        <button>Resultaten</button>
        <button>Accounts</button>
      </div>
    </div>

    <div class="content">
      <h1>Edit vragen</h1>

      <div class="questions">
        <div class="question-div">
          <div class="question">
            <span>1.</span>
            <span>Wat is jouw favoriete aspect van informatica?</span>
            <div class="icons">
              <span><i class="fa-solid fa-pen"></i></span>
              <span><i class="fa-solid fa-trash"></i></span>
              <span><i class="fa-solid fa-chevron-down"></i></span>
            </div>
          </div>

          <div class="answers">
            <div class="answer">
              <span>Webontwikkeling</span>
              <div class="icons">
                <span>1</span>
                <span><i class="fa-solid fa-pen"></i></span>
              </div>
            </div>

            <div class="answer">
              <span>Infrastructuur</span>
              <div class="icons">
                <span>1</span>
                <span><i class="fa-solid fa-pen"></i></span>
              </div>
            </div>

            <div class="answer">
              <span>Softwareontwikkeling</span>
              <div class="icons">
                <span>1</span>
                <span><i class="fa-solid fa-pen"></i></span>
              </div>
            </div>

            <div class="answer">
              <span>Kunstmatige intelligentie & machine learning</span>
              <div class="icons">
                <span>1</span>
                <span><i class="fa-solid fa-pen"></i></span>
              </div>
            </div>

            <AppButton>+</AppButton>
          </div>
        </div>

        <AppButton>Voeg toe +</AppButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.admin-panel {
  display: flex;
  flex-flow: column;

  .side-menu {
    background-color: var(--bg-accent);
    padding: 1rem;
    border-radius: 10px;

    div {
      display: flex;
      flex-flow: column;
      gap: 0.5rem;
      padding: 0.5rem 1rem;

      button {
        font-size: 1.1em;
        text-align: left;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }

  .content {
    width: 100%;

    .questions {
      display: flex;
      flex-flow: column;
      gap: 2rem;

      .question-div {
        .question {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          padding: 0.5rem;
          background-color: var(--main-light);
          border-radius: 10px;
        }

        .answers {
          display: flex;
          flex-flow: column;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding-left: 1rem;

          .answer {
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            padding: 0.5rem;
            background-color: var(--bg-accent);
            border-radius: 10px;
          }

          button {
            width: fit-content;
          }
        }

        .icons {
          display: flex;
          flex-flow: row;
          gap: 0.5rem;
        }
      }
    }
  }
}

@media (min-width: 45em) {
  .admin-panel {
    flex-flow: row;
    gap: 3rem;

    .side-menu {
      
    }

    .content {

    }
  }
}
</style>
