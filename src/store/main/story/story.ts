import { defineStore } from 'pinia'
import { getStorysDate, postStorysDate } from '@/service/main/story/story'
interface storyType {
  story: any[]
  code: number
}
const useStoryStore = defineStore('story', {
  state: (): storyType => ({
    story: [],
    code: 0
  }),
  actions: {
    async fetchStoryDate() {
      getStorysDate().then((res) => {
        this.story = res.data.data
      })
    },
    async postStoryDateAction(data: any) {
      postStorysDate(data).then((res) => {
        this.code = res.data.code
      })
    }
  }
})
export default useStoryStore
