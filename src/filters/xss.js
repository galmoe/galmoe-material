export const contentFilter = {
  whiteList: {
    a: ['href', 'title', 'target'],
    br: [''],
    img: ['src', 'title'],
    p: [''],
    span: [''],
    blockquote: [''],
    iframe: ['src', 'scrolling', 'border', 'frameborder', 'framespacing', 'allowfullscreen']
  }
}

export const commentFilter = {
  whiteList: {
    a: ['href', 'title', 'target'],
    br: [''],
    p: [''],
    span: [''],
    img: ['src', 'class']
  }
}

export const replyFilter = {
  whiteList: {
    a: ['href', 'title', 'target'],
    br: [''],
    p: ['']
  }
}
