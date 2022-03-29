const config = {

  baseUrl: "http://192.168.0.189",
  clientId: "434ddce9aa094b19abf5aeced0a5b1d7",

  baseUrlEscaped() {
    return this.baseUrl.replace("://", "%3A%2F%2F")
  }

}



export default config;