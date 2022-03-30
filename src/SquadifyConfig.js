const config = {

  apiUrl: "http://squadify-dev-api.eu-west-2.elasticbeanstalk.com",
  clientUrl: "https://move-urls-to-config.d2dhqwsqhvf2b5.amplifyapp.com",
  clientId: "434ddce9aa094b19abf5aeced0a5b1d7",

  apiUrlEscaped() {
    return this.apiUrl.replaceAll(":", "%3A").replaceAll("/", "%2F")
  }

}



export default config;