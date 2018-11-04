<template>
  <v-dialog v-model="dialog" scrollable>
    <v-chip small outline slot="activator" color="primary">编辑历史&nbsp;<i aria-hidden="true" class="v-icon material-icons theme--light primary--text">history</i></v-chip>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="tags"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>
            <a :href="`/u/${props.item.uid}`" target="_blank"> {{ props.item.uid }} </a>
          </td>
          <td>{{ props.item.date | timeFilter }}</td>
          <td v-if="!props.item.type">
            <v-icon small class="green--text lighten-3" title="公开">add</v-icon>
          </td>
          <td v-else>
            <v-icon small class="red--text lighten-3" title="删除">remove</v-icon>
          </td>
          <td>
            <v-chip small outline color="primary">{{ props.item.tag }}</v-chip>
          </td>
          <td><a :href="`/u/${props.item.del}`" target="_blank"> {{ props.item.del }} </a></td>
          <td>
            <v-btn icon small class="red--text lighten-3"><v-icon small title="举报">flag</v-icon></v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array
    }
  },
  data () {
    return {
      dialog: false,
      headers: [
        {
          text: '创建',
          sortable: false,
          value: 'uname'
        },
        { text: '时间', value: 'time', sortable: false },
        { text: '状态', value: 'action', sortable: false },
        { text: 'Tag', value: 'tag', sortable: false },
        { text: '删除', value: 'tag', sortable: false },
        { text: '处理', sortable: false }
      ]
    }
  },
  methods: {
    report (item) {
      console.log(item)
    }
  }
}
</script>
