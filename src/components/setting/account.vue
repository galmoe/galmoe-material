<template>
<v-card>
  <div class="v-card__text"><h4>账户</h4></div>
  <v-card ref="form">
    <v-card-text>
      <div class="avatar-upload-container clearfix">
        <img src="https://avatars0.githubusercontent.com/u/29087203?s=460&v=4" style="width: 150px; height: 150px;" alt="">
        <!--<label class="btn button-change-avatar text-center" @click="changeAvator">-->
          <!--Upload-->
          <!--<input id="upload-profile-picture" type="file" class="file-chooser">-->
        <!--</label>-->
        <v-dialog v-model="dialog" width="500px">
          <v-chip small outline slot="activator" color="primary" class="btn button-change-avatar text-center">编辑&nbsp;</v-chip>
          <v-card style="height: 600px">
            <upload />
          </v-card>
        </v-dialog>
      </div>
      <v-text-field
        ref="name"
        v-model="name"
        :rules="[Rules.required, Rules.hasBlank, Rules.min(3), Rules.max(10)]"
        label="昵称"
      ></v-text-field>
      <v-text-field
        ref="sign"
        :rules="[Rules.required, Rules.min(3), Rules.max(35)]"
        v-model="sign"
        label="签名"
        counter="35"
      ></v-text-field>
      <v-text-field
        ref="email"
        v-model="email"
        :rules="[Rules.required, Rules.email]"
        label="邮箱"
      ></v-text-field>
    </v-card-text>
    <v-divider class="mt-5"></v-divider>
    <v-card-actions>
      <v-btn flat>Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</v-card>
</template>

<script>
import Rules from '../../public/rules'
import upload from '@/components/upload'

export default {
  name: 'account',
  data: () => ({
    name: null,
    sign: '',
    email: '',
    Rules,
    dialog: false
  }),
  computed: {
    form () {
      return {
        name: this.name,
        sign: this.sign,
        email: ''
      }
    }
  },
  methods: {
    submit () {
      window.alert('submit')
    },
    changeAvator () {

    }
  },
  components: {
    upload
  }
}
</script>
<style scoped>
  .avatar-upload-container {
    width: 150px;
    overflow: hidden;
  }
  .btn {
    position: relative;
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-repeat: repeat-x;
    background-position: -1px -1px;
    background-size: 110% 110%;
    border: 1px solid rgba(27,31,35,0.2);
    border-radius: 0.25em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: #24292e;
    background-color: #eff3f6;
    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
  }
  .btn:hover {
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);
    background-position: -0.5em;
    border-color: rgba(27,31,35,0.35);
  }
  .button-change-avatar {
    margin-top: 16px;
    width: 150px;
    overflow: hidden;
  }
  .file-chooser {
    position: absolute;
    top: 0;
    left: 0;
    height: 34px;
    width: 100%;
    padding: 0;
    cursor: pointer;
    opacity: 0.0001;
  }
  .cropper {
    width: 100%;
    height: 500px;
  }
</style>
