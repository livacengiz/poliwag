<template>
<div>
    <header class="col-12">
      <div class="row">
        <div class="col-2 heading">
          <img src="static/img/logo.png" alt="" class="logo"> <br /> <a href="https://github.com/livacengiz/poliwag" target="_blank" class="app-name">Poliwag</a>
        </div>
        <div class="col-8">
          <div class="main-search-wrapper">
            <input type="text" class="main-search" v-model="authorName" @keyup.enter="getAuthor()" placeholder="search github user..">
          </div>
        </div>
        <div class="col-2 right">
          <span class="toggle-btn hand" @click=toggleTheme()>[ {{nextTheme}} ]</span>
        </div>
      </div>
    </header>
    <div class="row">
        <inspirers :author=session.author></inspirers>
    </div>
</div>

</template>

<script>
import Session from './components/Session'
import Inspirers from './components/Inspirers'
import axios from 'axios'

const AUTHOR_URL = 'https://api.github.com/users/:author'

export default {
  name: 'App',
  data () {
    return {
      session: {
        'author': [],
        'inspirers': [],
        'theme': 'poliwag-night'
      },
      authorName: '',
      themes: ['poliwag-day', 'poliwag-night'],
      errors: [],
      loading: false
    }
  },
  components: {
    Inspirers,
    Session
  },
  beforeMount () {
    if (Session.methods.getSession() !== null) {
      this.session = Session.methods.getSession()
      document.body.className = Session.methods.getTheme()
    }
  },
  created () {
    if (Session.methods.getSession() === null) {
      Session.methods.setSession(this.session)
    }
  },
  computed: {
    nextTheme: function () {
      let theme = this.themes.filter((theme) => { return theme !== this.session.theme })[0]
      return theme.replace('-', ' ').toUpperCase()
    }
  },
  methods: {
    getAuthor () {
      let url = AUTHOR_URL.replace(':author', this.authorName)
      axios.get(url)
        .then(res => {
          Session.methods.setAuthor(res.data)
          this.session = Session.methods.getSession()
        })
        .catch((e) => {
          this.errors.push(e)
          alert(this.errors)
        })
    },
    toggleTheme () {
      let theme = this.themes.filter((theme) => { return theme !== this.session.theme })[0]
      this.session.theme = theme
      Session.methods.setTheme(theme)
    }
  }
}
</script>
