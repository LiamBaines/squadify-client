import config from "../SquadifyConfig";

function redirectToSpotifyLogin() {
  console.log("handling 401 @ " + window.location.pathname);
  window.location.href = "https://accounts.spotify.com/authorize"
  + "?client_id=" + config.clientId()
  + "&response_type=code"
  + "&scope=playlist-modify-public%20playlist-modify-private%20ugc-image-upload%20playlist-read-private%20playlist-read-collaborative%20user-library-read%20user-read-private%20user-top-read"
  + "&state=" + window.location.pathname 
  + "&redirect_uri=" + config.baseUrlEscaped() + "%3A8080%2Fauth%2Fcallback";
}   

export default redirectToSpotifyLogin;