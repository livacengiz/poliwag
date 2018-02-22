<script>
export default {
  name: 'Session',
  methods: {
    setSession (session) {
      localStorage.setItem('session', JSON.stringify(session))
    },
    setAuthor (author) {
      let session = this.getSession()
      session.author = author
      this.setSession(session)
    },
    setInspirers (inspirers) {
      let session = this.getSession()
      session.inspirers = inspirers
      this.setSession(session)
    },
    setTheme (theme) {
      document.body.className = theme
      let session = this.getSession()
      session.theme = theme
      this.setSession(session)
    },
    getAuthor () {
      let session = this.getSession()
      return session.author
    },
    getInspirers () {
      let session = this.getSession()
      return session.inspirers
    },
    getTheme () {
      let session = this.getSession()
      return session.theme
    },
    getSession () {
      return JSON.parse(localStorage.getItem('session'))
    }
  }
}
</script>
