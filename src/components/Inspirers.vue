<template>
    <div class="row">
      <div class="col-10">
        <feed :inspirer=inspirer v-for="inspirer in selected" v-bind:key="inspirer.id"></feed>
        <div v-show='selected.length == 0'>
          <h3>Please select some of the people you are inspired by.</h3>
          <h4>
            Why do we decide to follow people other than our friends? <br>
            Because these people inspire our mind. so, who are these people following? <br>
            Who are they inspired by? Poliwag shows the feed of the people you follow ( only the last 20 activities ). <br>
            and automatically saves  your inspiring people in your local storage <br>
          </h4>
          <h4>You can see this repository on github | <a href="https://github.com/livacengiz/poliwag" target="_blank">Link</a></h4>
        </div>
      </div>
      <div class="col-2 center" v-if="author.length !== 0">
        <h4><a :href=this.author.html_url target="_blank">{{this.author.login}}</a></h4>
        <img :src=this.author.avatar_url alt="Github profile picture" class="user-avatar">
          <h4><u>Inspirers {{this.author.following}}</u></h4>
          <div class="pagination" v-if="pagination">
            <span>Page:</span>
            <a class="hand" v-for="page in pagination_size" v-bind:key="page" @click="toPage(page)"> {{page}}</a>
          </div>
          <div class="inspirer-search-wrapper">
            <input type="text" v-model="search" placeholder="Search Inspirer" class="inspirer-search">
          </div>
          <ul class="inspirers left">
            <li v-for="inspirer in filtredInspirers" v-bind:key="inspirer.id" class="left">
              <input type="checkbox" :value="inspirer" :id="inspirer.id" v-model="selected"> - {{inspirer.login}}
            </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Session from './Session'
import Feed from './Feed'
import axios from 'axios'

const INSPIRER_URL = 'https://api.github.com/users/:author/following?page=:CURRENT_PAGE&per_page=100'
let currentPage = 1

export default {
  name: 'inspirers',
  props: {
    author: {
      required: true
    }
  },
  components: {
    Feed,
    Session
  },
  data () {
    return {
      selected: [],
      inspirers: [],
      pagination: false,
      search: '',
      errors: []
    }
  },
  watch: {
    selected: function (val) {
      if (val.length > 8) {
        alert('You can select max 8 user')
        this.selected.splice(-1, 1)
      }
      Session.methods.setInspirers(this.selected)
    },
    author: function (val) {
      if (val !== this.author.login) {
        this.getInspirers()
        this.removeFollowingInspirers()
      }
    }
  },
  computed: {
    filtredInspirers () {
      return this.inspirers.filter(inspirer => {
        return inspirer.login.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  beforeMount () {
    this.selected = Session.methods.getInspirers()
    this.getInspirers()
  },
  methods: {
    removeFollowingInspirers () {
      this.selected = []
      Session.methods.setInspirers(this.selected)
    },
    toPage (page) {
      currentPage = page
      this.getInspirers()
    },
    isPagination () {
      if (this.author.following > 100) {
        this.pagination = true
        this.pagination_size = Math.ceil(this.author.following / 100)
      } else {
        this.pagination = false
      }
    },
    getInspirers () {
      let url = INSPIRER_URL.replace(':author', this.author.login).replace(':CURRENT_PAGE', currentPage)
      axios.get(url)
        .then(res => {
          this.inspirers = res.data
          this.isPagination()
        })
        .catch(e => {
          this.errors.push(e)
          alert(this.errors)
        })
    }
  }
}
</script>
