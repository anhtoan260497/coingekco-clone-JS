import axiosClient from "../axiosClient"

 const coinAPI = {
   getTrendingCoins : () => {
    const url = '/search/trending'
    return axiosClient.get(url)
   },
   getGlobal : () => {
    const url = '/global'
    return axiosClient.get(url)
   }
}

export default coinAPI
