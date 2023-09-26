import {
  getAmountListData,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAdressSale
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'
interface IAnalysisState {
  amountList: []
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAdressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAdressSale: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      getAmountListData()
        .then((res) => {
          this.amountList = res.data.data
        })
        .catch((err) => {})
      getGoodsCategoryCount()
        .then((res) => {
          this.goodsCategoryCount = res.data.data
          // console.log(this.goodsCategoryCount)
        })
        .catch((err) => {})
      getGoodsCategorySale()
        .then((res) => {
          this.goodsCategorySale = res.data.data
        })
        .catch((err) => {})
      getGoodsCategoryFavor()
        .then((res) => {
          this.goodsCategoryFavor = res.data.data
        })
        .catch((err) => {})
      getGoodsAdressSale().then((res) => {
        this.goodsAdressSale = res.data.data
      })
    }
  }
})

export default useAnalysisStore
