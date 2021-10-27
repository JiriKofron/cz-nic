<template>
  <section class="domain__details">
    <h2>{{ domainDetail.fqdn }}</h2>
    <button v-on:click="verboseButton()" class="domain__details__button">
      <i class="fas fa-toggle-on icon"></i
      ><span class="domain__details__button__text">Verbose view</span>
    </button>
    <section class="domain__details__container">
      <section class="domain__details__left">
        <article class="domain__details__left__articles">
          <table class="domain__details__tables">
            <tbody>
              <tr>
                <td class="domain__details__tables__description">Authinfo:</td>
                <td>
                  <span
                    class="domain__details__tables__password"
                    v-if="showPassword"
                    >{{ password }}</span
                  ><button
                    class="domain__details__tables__button uppercase"
                    v-on:click="passwordButton"
                  >
                    Show
                  </button>
                </td>
              </tr>
              <tr>
                <td class="domain__details__tables__description">
                  Expires at:
                </td>
                <td>
                  {{ formatDate(domainDetail.expires_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </article>
        <article class="domain__details__left__articles">
          <table class="domain__details__tables">
            <thead>
              <th colspan="4">Events:</th>
            </thead>
            <tbody>
              <tr>
                <td class="domain__details__tables__description">
                  Create date:
                </td>
                <td>
                  {{ formatDate(domainDetail.events.registered.timestamp) }}
                </td>
                <td class="domain__details__tables__description">Registrar:</td>
                <td v-if="domainDetail.events.registered != null">
                  <a href="#">
                    {{ domainDetail.events.registered.registrar_handle }}</a
                  >
                </td>
              </tr>
              <tr>
                <td class="domain__details__tables__description">
                  Update date:
                </td>
                <td v-if="domainDetail.events.updated != null">
                  {{ formatDate(domainDetail.events.updated.timestamp) }}
                </td>
                <td class="domain__details__tables__description">Registrar:</td>
                <td>
                  <a href="#">{{
                    domainDetail.events.updated.registrar_handle
                  }}</a>
                </td>
              </tr>
              <tr>
                <td class="domain__details__tables__description">
                  Transfer date:
                </td>
                <td v-if="domainDetail.events.transferred != null">
                  {{ formatDate(domainDetail.events.transferred.timestamp) }}
                </td>
                <td class="domain__details__tables__description">Registrar:</td>
                <td>
                  <a href="#">{{
                    domainDetail.events.transferred.registrar_handle
                  }}</a>
                </td>
              </tr>
              <tr>
                <td class="domain__details__tables__description">
                  Delete date:
                </td>
                <td v-if="domainDetail.events.unregistered != null">
                  {{ formatDate(domainDetail.events.unregistered.timestamp) }}
                </td>
              </tr>
            </tbody>
          </table>
        </article>
        <StateFlag />
      </section>
      <aside class="domain__details__aside">
        <table class="domain__details__tables">
          <thead>
            <th colspan="3">Owner:</th>
          </thead>
          <tbody>
            <tr>
              <td class="domain__details__tables__visible"></td>
              <td class="domain__details__tables__description">Handle:</td>
              <td>
                <a href="#">{{ domainDetail.owner.handle }}</a>
              </td>
            </tr>
            <tr>
              <td class="domain__details__tables__visible">
                <i
                  v-if="domainDetail.owner.publish.organization === true"
                  class="fas fa-eye"
                ></i
                ><i v-else class="fas fa-eye-slash"></i>
              </td>
              <td class="domain__details__tables__description">
                Organization:
              </td>
              <td>{{ domainDetail.owner.organization }}</td>
            </tr>
            <tr>
              <td class="domain__details__tables__visible">
                <i
                  v-if="domainDetail.owner.publish.name === true"
                  class="fas fa-eye"
                ></i
                ><i v-else class="fas fa-eye-slash"></i>
              </td>
              <td class="domain__details__tables__description">Name:</td>
              <td>{{ domainDetail.owner.name }}</td>
            </tr>
          </tbody>
        </table>
        <TheAdministrativeContact />
        <table class="domain__details__tables">
          <thead>
            <th colspan="2">NSSet:</th>
          </thead>
          <tbody>
            <tr>
              <td class="domain__details__tables__description">Handle:</td>
              <td>
                <a href="#">{{ domainDetail.nsset.handle }}</a>
              </td>
            </tr>
            <tr>
              <td class="domain__details__tables__description">Registrar:</td>
              <td>
                <a href="#">{{ domainDetail.nsset.registrar }}</a>
              </td>
            </tr>
            <tr>
              <td class="domain__details__tables__description">DNS:</td>
              <td class="domain__details__tables__dns">
                <ul>
                  <li
                    v-for="item in domainDetail.nsset.dns"
                    v-bind:key="item.name"
                  >
                    {{
                      `
                      ${item.name} (
                        ${item.ip_address}
                      )
                    `
                    }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="domain__details__tables">
          <thead>
            <th colspan="2">KeySet:</th>
          </thead>
          <tbody>
            <tr>
              <td class="domain__details__tables__description">Handle:</td>
              <td>
                <a href="#">{{ domainDetail.keyset.handle }}</a>
              </td>
            </tr>
            <tr>
              <td class="domain__details__tables__description">Registrar:</td>
              <td>
                <a href="#">{{ domainDetail.keyset.registrar }}</a>
              </td>
            </tr>
            <tr>
              <td class="domain__details__tables__description">DNS keys:</td>
              <td class="domain__details__tables__dns-keys">
                <p
                  v-for="dns_key in domainDetail.keyset.dns_keys"
                  v-bind:key="dns_key.id"
                >
                  {{ dns_key }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </aside>
    </section>
  </section>
</template>

<script>
import StateFlag from './StateFlag.vue';
import TheAdministrativeContact from './TheAdministrativeContact.vue';
import { mapState } from 'vuex';
import moment from 'moment-timezone';

export default {
  name: 'TheDomain',
  components: { StateFlag, TheAdministrativeContact },
  data() {
    return {
      toggleOn: false,
    };
  },
  methods: {
    toggle: function() {
      this.toggleOn = !this.toggleOn;
    },
    formatDate: (date) => {
      let formatedDate = moment
        .tz(date, 'Europe/Prague')
        .utc()
        .format('MMM D, YYYY hh:mm:ss A');
      return formatedDate;
    },
    verboseButton: function() {
      this.$store.commit('changeVerbose');
    },
    passwordButton: function() {
      this.$store.commit('showPassword');
    },
  },
  computed: {
    ...mapState(['domainDetail', 'showPassword', 'password', 'verboseView']),
  },
  watch: {
    verboseView() {
      return this.verboseView;
    },
  },
};
</script>

<style lang="scss">
// * {
//  border: 1px solid red;
// }

.domain__details {
  width: 100%;

  &__left {
    width: 65%;
    margin-right: 2.5rem;

    @media screen and (max-width: $breakpoint) {
      width: 90%;
    }

    &__articles:first-child {
      table {
        border-radius: 0;
      }
    }
  }

  &__button {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: $darkish-gray;

    .icon {
      font-size: 1.6rem;
      color: $primary-blue;
    }

    span {
      padding: 0 0.6rem;
    }
  }

  &__aside {
    width: 35%;
    margin-right: 1.5rem;

    @media screen and (max-width: $breakpoint) {
      width: 90%;
    }
  }
  &__container {
    display: flex;

    @media screen and (max-width: $breakpoint) {
      flex-direction: column;
    }
  }
  &__tables {
    width: 100%;
    background: white;
    margin: 1rem 0;
    box-shadow: 0 0.2rem 5px $darkish-gray;
    box-sizing: border-box;
    border-radius: 0.5rem 0.5rem 0 0;

    &__password {
      padding: 0 1rem;
    }

    &__button {
      background: $primary-blue;
      width: 6rem;
      height: 1.5rem;
      font-size: 1rem;
      border-radius: 3px;
      color: white;
      border: none;
      outline: none;
      padding: 0 auto;
    }

    &__visible {
      display: flex;
      align-items: center;
      justify-content: center;

      .fa-eye {
        color: green;
      }
      .fa-eye-slash {
        color: red;
      }
    }

    a {
      text-decoration: none;
    }

    &__description {
      font-weight: 500;
      width: 25%;
      padding: 0 1.2rem 0 0.6rem;
    }

    tr {
      height: 1.6rem;
    }
    thead {
      background: $gray-header;
      text-align: left;
      height: 2rem;
      box-sizing: border-box;

      th {
        padding-left: 0.6rem;
      }
    }

    &__dns {
      padding: 0.2rem 0;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          padding: 0.2rem 0;
        }
      }
    }

    &__dns-keys {
      font-size: 0.7rem;
      max-width: 15rem;
      word-wrap: break-word;
      p {
        padding: 0;
        margin: 0.2rem 0;
      }
    }
  }
}
</style>
