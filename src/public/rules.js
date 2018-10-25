const Rules = {
  required: v => !!v || '内容不能为空',
  email: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || '邮箱格式错误',
  blank: v => !(v || '').match(/^\s*$/) || '输入内容为空',
  hasBlank: v => !/\s/.test(v) || '含有非法字符',
  length: (len) => v => (v || '').length === len || `输入长度必需为${len}`,
  pwd: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    'Password must contain an upper case letter, a numeric character, and a special character',
  min: len => v => (v || '').length >= len || `字数至少为${len}`,
  max: len => v => (v || '').length <= len || `字数必需小于${len}`
}

export default Rules
