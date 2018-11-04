<template>
  <div class="tag-container">
    <v-chip small outline color="primary" v-for="t in tags" :key="t.tag" @click="goToTag(t.tag)" v-if="!t.type">{{ t.tag }}</v-chip>
    <v-dialog v-model="dialogEdit" width="500px" scrollable>
      <v-chip small outline slot="activator" color="primary">编辑&nbsp;<i aria-hidden="true" class="v-icon material-icons">add</i></v-chip>
      <v-card>
        <div style="padding: 10px">
          <v-text-field
            v-model="tagIpt"
            append-icon="send"
            :autofocus="true"
            height="30"
            counter="20"
            placeholder="按回车添加Tag"
            @keyup.enter="handleSubmit"
            @click:append="handleSubmit"
          ></v-text-field>
        </div>
        <v-data-table
          :headers="headers"
          :items="tags"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td v-if="!props.item.type">{{ props.item.tag }}</td>
            <td v-if="!props.item.type">
              <v-btn icon small class="red--text lighten-3" @click="remove(props.item)"><v-icon small title="删除">remove</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <tagHis :tags="tags"/>
  </div>
</template>

<script>
import tagHis from '@/components/tag-history'
import api from '../../api'
// import { timeFilter } from '../public/utils'
import { mapState } from 'vuex'

export default {
  props: {
    tags: {
      type: Array
    }
  },
  data () {
    return {
      tagIpt: '',
      dialogEdit: false,
      headers: [
        {
          text: 'Tag',
          sortable: false,
          value: 'tag'
        },
        { text: '操作', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState({
      uid_s: state => state.session.uid_s
    })
  },
  methods: {
    goToTag (t) {
      let routeData = this.$router.resolve({ name: 'tag', params: { tname: t } })
      window.open(routeData.href, '_blank')
    },
    handleSubmit () {
      if (this.tagIpt.length >= 20) return
      const data = {
        tag: this.tagIpt
      }
      api.post.addTag(this.$route.params.pid, data).then(res => {
        if (res.type === 'success') {
          this.tags.push({
            date: Date.now(),
            del: null,
            tag: this.tagIpt,
            type: 0,
            uid: this.uid_s
          })
          this.tagIpt = ''
        }
      })
    },
    remove (item) {
      const index = this.tags.indexOf(item)
      confirm('确定删除这个tag吗?')
      const data = {
        tag: this.tags[index].tag
      }
      api.post.removeTag(this.$route.params.pid, data).then(res => {
        if (res.type === 'success') {
          this.tags.splice(index, 1)
        }
      })
    },
    report (item) {
      console.log(this.tags.indexOf(item))
    }
  },
  components: {
    tagHis
  }
}
</script>
