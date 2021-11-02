<template>
  <div>
    <header>
      <nav class="navbar">
        <div class="navbar__brand">
          <i class="fas fa-bars"></i>
          <a class="navbar__brand__name" href="#">Ferda</a>
        </div>
        <div class="user navbar__item uppercase" v-on:click="showProfile">
          <i class="fas fa-user-circle user__icon "></i>
          <p>{{ user.name }}</p>
        </div>
        <div class="user__details" v-if="!isHidden">
          <div class="user__details__wrap">
            <i class="fas fa-user-circle user__icon "></i>
            <div class="user__details__profile">
              <div class="user__details__profile__name">{{ user.name }}</div>
              <div class="user__details__profile__role">{{ user.role }}</div>
            </div>
          </div>
          <div class="user__details__logout">
            <hr />
            <div class="user__details__logout__wrap">
              <i class="fas fa-sign-out-alt user__icon"></i>
              <a href="#">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <TheSidebar class="sidebar" />
      <TheDomain class="domain" />
    </main>
  </div>
</template>

<script>
import TheSidebar from './components/TheSidebar.vue';
import TheDomain from './components/TheDomain.vue';

export default {
  name: 'App',
  components: { TheSidebar, TheDomain },
  data() {
    return {
      isHidden: true,
      user: {
        name: 'Jan Musílek',
        role: 'admin',
      },
    };
  },
  methods: {
    showProfile: function() {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>

<style lang="scss">
main {
  display: flex;
  width: 100%;

  @media screen and (max-width: $breakpoint) {
    flex-direction: column;
  }
}

.navbar {
  height: 3.5rem;
  background-color: $primary-blue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 2rem;

  &__brand {
    color: white;
    font-size: 1.2rem;
    padding-left: 1rem;

    &__name {
      color: white;
      font-size: 1.4rem;
      text-decoration: none;
      padding-left: 3rem;
    }
  }
}

.sidebar {
  width: 20%;

  @media screen and (max-width: $mobile) {
    width: 100%;
  }
}

.domain {
  width: 100%;
  background: rgba($gray, 0.2);
  padding: 0 3rem;
  height: 100vh;

  @media screen and (max-width: $mobile) {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
}
.user {
  color: white;
  position: relative;
  display: flex;
  align-items: center;

  &__details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: absolute;
    width: 20rem;
    height: 8rem;
    background: white;
    box-shadow: 0 0 2rem gray;
    color: $dark-gray;
    right: 1rem;
    top: 5%;
    padding-left: 1rem;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 0.2rem;

    &__wrap {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
    }

    &__profile {
      width: 80%;
      display: flex;
      flex-direction: column;

      &__role {
        color: $darkish-gray;
      }
    }

    &__logout {
      width: 100%;

      hr {
        margin-left: -1rem;
        height: 2px;
        background-color: $darkish-gray;
        border: none;
        opacity: 0.2;
      }

      &__wrap {
        display: flex;
        padding-top: 0.5rem;
        align-items: center;

        a {
          color: $dark-gray;
          text-decoration: none;
        }
      }
    }
  }

  &__icon {
    padding-right: 1rem;
    font-size: 1.6rem;
  }
}
</style>
