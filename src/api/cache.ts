export function getEditorPreference() {
  return sessionStorage.getItem('editorPreference')
}
  
export function setEditorPreference(preference = false) {
  if(!preference) sessionStorage.removeItem('editorPreference')
  else sessionStorage.setItem('editorPreference', JSON.stringify(preference))
}
  
export function setSelections(selections: string[]) {
  sessionStorage.setItem('selections', JSON.stringify(selections))
}
  
export function getSelected(): string[] {
  const selections = sessionStorage.getItem('selections')
  if(selections) return JSON.parse(selections)
  else return []
}
  
export function clearSelections() {
  sessionStorage.removeItem('selections')
}
