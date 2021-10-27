<template>
  <nav class="side-navigation">
    <h4 class="uppercase">Applications</h4>
    <div class="side-navigation__registry">
      <i class="fas fa-globe-europe side-navigation__registry__icon"></i>
      <p>Registry</p>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheSidebar',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.side-navigation {
  h4 {
    padding-left: 1.5rem;
    font-size: 0.8rem;
    font-weight: 400;
    color: $dark-gray;
    margin: 1rem auto;
  }

  &__registry {
    margin: 0;
    display: flex;
    align-items: center;
    height: 2.4rem;
    background: orange;
    color: $dark-gray;

    &__icon {
      font-size: 1.5rem;
      padding: 0 1rem;
    }

    p {
      padding-left: 1rem;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
}
</style>
