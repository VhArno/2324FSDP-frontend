<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <RouterLink to="/">Ga naar de Odisee-website</RouterLink>
    <RouterLink to="/">Privacybeleid</RouterLink>
    <RouterLink to="/">Cookievoorkeuren</RouterLink>
    <div class="socials">
      <span>Volg ons op: </span>

      <a href="https://www.instagram.com/odisee" target="_blank" rel="noopener">
        <span class="visually-hidden">instagram (opens in a new window)</span>
        <img src="/src/assets/imgs/insta_logo.svg" />
      </a>

      <a href="https://www.facebook.com/odiseehogeschool" target="_blank" rel="noopener">
        <span class="visually-hidden">facebook (opens in a new window)</span>
        <img src="/src/assets/imgs/facebook_logo.svg" />
      </a>

      <a href="https://twitter.com/odiseehogesch" target="_blank" rel="noopener">
        <span class="visually-hidden">twitter (opens in a new window)</span>
        <img src="/src/assets/imgs/twitter_logo.svg" />
      </a>

      <a
        href="https://www.youtube.com/channel/UCow3DbKphWyMrHbG5fBOBlg"
        target="_blank"
        rel="noopener"
      >
        <span class="visually-hidden">youtube (opens in a new window)</span>
        <img src="/src/assets/imgs/youtube_logo.svg" />
      </a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  a {
    text-decoration: none;
    color: var(--main);
  }

  .socials {
    display: flex;
    flex-flow: row;
    align-items: center;

    a {
      content: '';
      width: fit-content;
      margin: 0 0.5rem;

      img {
        display: block;
      }
    }
  }
}
</style>
