<template>
  <section class="state-flags">
    <table class="domain__details__tables">
      <thead>
        <th colspan="3">State flag:</th>
      </thead>
      <tbody v-if="!this.verboseView" class="state-flags">
        <div class="state-flags__column--short">
          <ul>
            <div v-for="item in domainDetail.state_flags.flags" :key="item.id">
              <li class="state-flags__column__list" v-if="item.active">
                <span class="active list__description"
                  ><i class="fas fa-check-circle"></i>
                  <p>{{ item.description }}</p></span
                >
              </li>
            </div>
          </ul>
        </div>
      </tbody>
      <tbody v-else>
        <div class="state-flags__column">
          <ul>
            <li
              class="state-flags__column__list"
              v-for="item in findTasks(domainDetail.state_flags.groups[0])"
              v-bind:key="item.id"
            >
              <span
                class="list__description"
                v-bind:class="{ active: item.active }"
                ><i v-if="item.active === true" class="fas fa-check-circle"></i
                ><i v-else class="fas fa-times-circle"></i>
                <p>{{ item.description }}</p></span
              >
            </li>
          </ul>
        </div>
        <div class="state-flags__column">
          <ul>
            <li
              class="state-flags__column__list"
              v-for="item in findTasks(domainDetail.state_flags.groups[1])"
              v-bind:key="item.id"
            >
              <span
                class="list__description"
                v-bind:class="{ active: item.active }"
                ><i v-if="item.active" class="fas fa-check-circle"></i
                ><i v-else class="fas fa-times-circle"></i>
                <p>{{ item.description }}</p></span
              >
            </li>
          </ul>
        </div>
        <div class="state-flags__column">
          <ul>
            <li class="state-flags__column__list">{{ flagsWithGroup }}</li>
          </ul>
        </div>
      </tbody>
    </table>
  </section>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'StateFlag',
  data() {
    return {
      id: '',
      flagsWithGroup: [],
    };
  },
  computed: {
    ...mapState(['domainDetail', 'verboseView']),
  },
  methods: {
    findTasks(groupArray) {
      const taskGroup = [];
      const tasksArray = this.domainDetail.state_flags.flags;
      groupArray.forEach((element) => {
        tasksArray.forEach((flag) => {
          if (flag.name === element) {
            taskGroup.push(flag);
          }
        });
      });
      return taskGroup;
    },
  },
  watch: {
    verboseView() {
      return this.verboseView;
    },
  },
};
</script>

<style lang="scss" scoped>
tbody {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;

  .state-flags__column {
    width: 33%;
    display: flex;
    flex-direction: column;

    &--short {
      width: 45%;
    }

    &__list {
      list-style: none;
      font-size: 0.8rem;
      padding: 3px 0;

      .active {
        color: green;
      }
      color: red;
    }
  }

  .list__description {
    display: flex;
    align-items: flex-start;

    p {
      padding-left: 0.2rem;
      margin: 0;
      margin-left: 0.4rem;
      padding: 0;
    }
  }
}
</style>
