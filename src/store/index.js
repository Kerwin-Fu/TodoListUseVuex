import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '123',
    nextId: 5
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem(state, id) {
      const index = state.list.findIndex(x => x.id === id)
      if (index !== -1) state.list.splice(index, 1)
    }
  },
  actions: {
    async getList(context) {
      const { data } = await Axios.get('/list.json')
      context.commit('initList', data)
    }
  },
  modules: {}
})
