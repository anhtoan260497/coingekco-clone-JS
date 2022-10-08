import axiosClient from "../axiosClient"

 const coinAPI = {
   getTrendingCoins : () => {
    const url = '/search/trending'
    return axiosClient.get(url)
   }
}

export default coinAPI
