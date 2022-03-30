const config = {

  apiUrl: process.env.SQUADIFY_DEV_API_URL,
  clientUrl: process.env.SQUADIFY_DEV_CLIENT_URL,
  clientId: "434ddce9aa094b19abf5aeced0a5b1d7",

  apiUrlEscaped() {
    return this.apiUrl.replaceAll(":", "%3A").replaceAll("/", "%2F")
  }

}



export default config;