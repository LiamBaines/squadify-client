const config = {

  baseUrl: "http://192.168.0.183",

  baseUrlEscaped() {
    return this.baseUrl.replace("://", "%3A%2F%2F")
  }

}



export default config;