<template>
<div class="col-6">
  <div class="row">
    <div class="col-2 inspirer-avatar"><img :src=inspirer.avatar_url alt="" class="inspirer-avatar"></div>
    <div class="col-10 right"><span class="inspirer-name">{{inspirer.login}}'s Feed</span></div>
  </div>
    <div class="feed">
      <div class="event row" v-for="events in mutableInspirer" v-bind:key="events.id">
        <div class="col-1">
          <a :href=generateUserLink(events.actor.url) target="_blank">
            <img class="feed-avatar" :src=events.actor.avatar_url :alt=events.actor.login>
          </a>
        </div>
        <div class="col-11">
          <span class="action">
            {{events.actor.login}}
            {{fixRepoAction(events.payload.action) ||
            fixRepoAction(events.type)}} this repo
            <a :href=generateRepoLink(events.repo.name) target="_blank"> {{events.repo.name}} </a>
          </span>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Feed',
  props: {
    inspirer: {
      required: true
    }
  },
  data () {
    return {
      mutableInspirer: [],
      errors: []
    }
  },
  methods: {
    fixRepoAction (action) {
      if (action === 'started') { return 'starred' }
      if (action === 'ForkEvent') { return 'forked' }
      if (action === 'CreateEvent') { return 'created' }
    },
    generateRepoLink (repoName) {
      return 'https://github.com/' + repoName
    },
    generateUserLink (apiUrl) {
      return apiUrl.replace('api.', '').replace('users/', '')
    }
  },
  beforeMount () {
    axios.get(this.inspirer.received_events_url)
      .then(res => {
        /* eslint-disable */
        this.mutableInspirer = res.data.filter((events) => { return events.type === 'CreateEvent' ||
                                                                    events.type === 'ForkEvent' ||
                                                                    events.type === 'WatchEvent' })
      })
      .catch(e => {
        this.errors.push(e)
        console.log(this.errors)
      })
  }
}
</script>
