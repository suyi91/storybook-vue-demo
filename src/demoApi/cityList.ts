export const queryCityList = () => new Promise(resolve => {
    setTimeout(() => {
      resolve(cityList.map(v => ({
        ...v,
        value: v.cityID,
        label: v.city,
      })))
    }, 2000)
  })
  
  var cityList = [
    {
        "city": "城市1",
        "cityID": "11",
    },
    {
        "city": "城市2",
        "cityID": "22"
    }
  ]
  