# Youtube Playlist Duration App Online
**Live: https://playlist-calculator.vercel.app/**

[![Screen Shot](img/screenshot.png)](https://playlist-calculator.vercel.app/)

This app is a Youtube playlist duration. Uses Youtube Api v3 when calculating.Coded with ReactJS.   
## How Does It Work?
- Send a request to the [PaylistItems](https://developers.google.com/youtube/v3/docs/playlistItems/list) endpoint.
- Get video ids from returned data
- Send video ids to the [Videos](https://developers.google.com/youtube/v3/docs/videos/list) endpoint.
- Duration values are taken from the contentDetails parameter and summed.
- See [Youtube Api v3 documentation](https://developers.google.com/youtube/v3) for more details.