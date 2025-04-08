export default function removeHTMLTags(text: string) {
  return text.replace(/<[^>]*>?/gm, '')
}
