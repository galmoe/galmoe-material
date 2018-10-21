<template>
  <v-dialog v-model="dialog" scrollable>
    <v-chip small outline slot="activator" color="primary">编辑历史&nbsp;<i aria-hidden="true" class="v-icon material-icons theme--light primary--text">history</i></v-chip>
    <!--<v-btn slot="activator" color="primary" dark>编辑Tag</v-btn>-->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="desserts"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.uname }}</td>
          <td>{{ props.item.time }}</td>
          <td v-if="props.item.action === 'add'">
            <v-icon small class="green--text lighten-3" title="添加">add</v-icon>
          </td>
          <td v-else>
            <v-icon small class="red--text lighten-3" title="删除">remove</v-icon>
          </td>
          <td>
            <v-chip small outline color="primary">{{ props.item.tag }}</v-chip>
          </td>
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
  data () {
    return {
      dialog: false,
      headers: [
        {
          text: '用户',
          sortable: false,
          value: 'uname'
        },
        { text: '时间', value: 'time', sortable: false },
        { text: '操作', value: 'action', sortable: false },
        { text: 'Tag', value: 'tag', sortable: false },
        { text: '处理', sortable: false }
      ],
      desserts: [
        {
          value: false,
          uname: 'Frozen Yogurt',
          time: 159,
          action: 'add',
          tag: 'added tag'
        },
        {
          value: false,
          uname: 'Ice cream sandwich',
          time: 237,
          action: 'add',
          tag: 'added tag'
        },
        {
          value: false,
          uname: 'Eclair',
          time: 262,
          action: 'add',
          tag: 'added tag'
        },
        {
          value: false,
          uname: 'Cupcake',
          time: 305,
          action: 'add',
          tag: 'added tag'
        },
        {
          value: false,
          uname: 'Gingerbread',
          time: 356,
          action: 'add',
          tag: 'added tag'
        },
        {
          value: false,
          uname: 'Jelly bean',
          time: 375,
          action: 'remove',
          tag: 'removed tag'
        },
        {
          value: false,
          uname: 'Lollipop',
          time: 392,
          action: 'remove',
          tag: 'removed tag'
        },
        {
          value: false,
          uname: 'Honeycomb',
          time: 408,
          action: 'remove',
          tag: 'removed tag'
        },
        {
          value: false,
          uname: 'Donut',
          time: 452,
          action: 'remove',
          tag: 'removed tag'
        },
        {
          value: false,
          uname: 'KitKat',
          time: 518,
          action: 'remove',
          tag: 'removed tag'
        }
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
