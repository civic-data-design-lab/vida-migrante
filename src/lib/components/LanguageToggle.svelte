<script>
  import { page } from '$app/stores';
  import { Languages } from '$types';

  $: currentLanguage = $page.data.language;

  const NORMAL = 300,
    BOLD = 600;
</script>

<form method="post">
  <button
    style:font-weight={currentLanguage == Languages.SPANISH ? BOLD : NORMAL}
    formaction="/?/setLanguage&language=es&redirectTo={$page.url.pathname}"
    title="Español">ES</button
  >
  <span>|</span>
  <button
    style:font-weight={currentLanguage == Languages.ENGLISH ? BOLD : NORMAL}
    formaction="/?/setLanguage&language=en&redirectTo={$page.url.pathname}"
    title="English">EN</button
  >
</form>

<style>
  button,
  span {
    font-family: var(--font-rubik);
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: var(--gray);
  }

  button:hover {
    cursor: pointer;
  }
</style>
