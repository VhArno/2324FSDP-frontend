<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <a href="https://www.odisee.be/" target="_blank">Ga naar de Odisee-website</a>
    <a href="https://www.odisee.be/disclaimer" target="_blank">Privacybeleid</a>
    <RouterLink to="/">Cookievoorkeuren</RouterLink>
    <div class="socials">
      <span>Volg ons op: </span>

      <div class="socials-links">
        <a href="https://www.instagram.com/odisee" target="_blank" rel="noopener">
          <span class="visually-hidden">instagram (opens in a new window)</span>
          <img src="/src/assets/imgs/insta_logo.svg" alt="instagram logo" />
        </a>

        <a href="https://www.facebook.com/odiseehogeschool" target="_blank" rel="noopener">
          <span class="visually-hidden">facebook (opens in a new window)</span>
          <img src="/src/assets/imgs/facebook_logo.svg" alt="facebook logo" />
        </a>

        <a href="https://twitter.com/odiseehogesch" target="_blank" rel="noopener">
          <span class="visually-hidden">twitter (opens in a new window)</span>
          <img src="/src/assets/imgs/twitter_logo.svg" alt="twitter logo" />
        </a>

        <a
          href="https://www.youtube.com/channel/UCow3DbKphWyMrHbG5fBOBlg"
          target="_blank"
          rel="noopener"
        >
          <span class="visually-hidden">youtube (opens in a new window)</span>
          <img src="/src/assets/imgs/youtube_logo.svg" alt="youtube logo" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  flex-shrink: 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 5rem;
  gap: 1rem;

  a {
    font-size: 1.1em;
    text-decoration: none;
    color: var(--main);

    &:hover {
      text-decoration: underline;
    }
  }

  .socials {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    align-items: center;

    .socials-links {
      display: flex;
      flex-flow: row;

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
}

@media (min-width: 50em) {
  .footer {
    flex-flow: row wrap;
    gap: 3rem;

    
    .socials {
      flex-flow: row;
      gap: 0rem;
    }
  }
}
</style>
