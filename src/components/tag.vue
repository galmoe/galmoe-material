<template>
  <div class="tag-container">
    <v-chip small outline color="primary" v-for="t in desserts" :key="t.tag" @click="goToTag(t.tag)">{{ t.tag }}</v-chip>
    <v-dialog v-model="dialogEdit" width="500px" scrollable>
      <v-chip small outline slot="activator" color="primary">编辑&nbsp;<i aria-hidden="true" class="v-icon material-icons theme--light primary--text">add</i></v-chip>
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
            @click:append="handleClickSubmit"
          ></v-text-field>
        </div>
        <v-data-table
          :headers="headers"
          :items="desserts"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.tag }}</td>
            <td>
              <v-btn icon small class="red--text lighten-3" @click="remove(props.item)"><v-icon small title="删除">remove</v-icon></v-btn>
            </td>
            <td>
              <v-btn icon small class="red--text lighten-3"><v-icon small title="举报">flag</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <tagHis />
  </div>
</template>

<script>
import tagHis from '@/components/tag-history'

export default {
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
        { text: '操作', sortable: false },
        { text: '处理', sortable: false }
      ],
      desserts: [
        {
          value: false,
          tag: 'tag1'
        },
        {
          value: false,
          tag: 'tag2'
        },
        {
          value: false,
          tag: 'tag3'
        },
        {
          value: false,
          tag: 'tag4'
        },
        {
          value: false,
          tag: 'tag5'
        },
        {
          value: false,
          tag: 'tag6'
        }
      ]
    }
  },
  methods: {
    goToTag (t) {
      this.$router.push({ path: `/tag/${t}` })
    },
    handleClickSubmit () {
      if (this.tagIpt.length >= 20) return
      this.desserts.push({ value: false, tag: this.tagIpt })
      this.tagIpt = ''
    },
    handleSubmit () {
      if (this.tagIpt.length >= 20) return
      this.desserts.push({ value: false, tag: this.tagIpt })
      this.tagIpt = ''
    },
    remove (item) {
      this.desserts.splice(this.desserts.indexOf(item), 1)
    },
    report (item) {
      console.log(this.desserts.indexOf(item))
    }
  },
  components: {
    tagHis
  }
}
</script>
