<template>
  <section v-if="this.verboseView">
    <table
      class="domain__details__tables"
      v-for="contact in domainDetail.administrative_contacts"
      v-bind:key="contact.id"
    >
      <thead>
        <th colspan="3">Administrative contact:</th>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td class="domain__details__tables__description">Handle:</td>
          <td>
            <a href="#">{{ contact.handle }}</a>
          </td>
        </tr>
        <tr>
          <td class="domain__details__tables__visible">
            <i
              v-if="contact.publish.organization === true"
              class="fas fa-eye"
            ></i
            ><i v-else class="fas fa-eye-slash"></i>
          </td>
          <td class="domain__details__tables__description">Organization:</td>
          <td>{{ contact.organization }}</td>
        </tr>
        <tr>
          <td class="domain__details__tables__visible">
            <i v-if="contact.publish.name === true" class="fas fa-eye"></i
            ><i v-else class="fas fa-eye-slash"></i>
          </td>
          <td class="domain__details__tables__description">Name:</td>
          <td>{{ contact.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-else>
    <table class="domain__details__tables">
      <thead>
        <th colspan="2">Administrative contacts:</th>
      </thead>
      <tbody>
        <tr
          v-for="contact in domainDetail.administrative_contacts"
          v-bind:key="contact.id"
        >
          <td class="domain__details__tables__description">
            {{ contact.name }}:
          </td>
          <td>
            <a href="#">{{ contact.handle }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'TheAdministrativeContact',
  data() {
    return {};
  },
  computed: {
    ...mapState(['domainDetail', 'verboseView']),
  },
  watch: {
    verboseView() {
      return this.verboseView;
    },
  },
};
</script>
