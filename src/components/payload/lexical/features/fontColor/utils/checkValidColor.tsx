'useClient'

export function checkValidColor(color: string) {
  let e = document.getElementById('divValidColor')
  if (!e) {
    e = document.createElement('div')
    e.id = 'divValidColor'
  }
  e.style.borderColor = ''
  e.style.borderColor = color
  const tmpcolor = e.style.borderColor
  if (tmpcolor.length == 0) {
    return false
  }
  return true
}
