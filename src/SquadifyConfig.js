const config = {

  apiUrl: "http://localhost:8080",
  clientUrl: "http://localhost:3000",
  clientId: "434ddce9aa094b19abf5aeced0a5b1d7",

  apiUrlEscaped() {
    return this.apiUrl.replaceAll(":", "%3A").replaceAll("/", "%2F")
  }

}



export default config;