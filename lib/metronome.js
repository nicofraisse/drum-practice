export const increaseTempo = (tempo, setTempo) => {
  if (tempo >= 40 && tempo < 240) {
    if (tempo >= 120) {
      setTempo(tempo + 8)
    } else {
      setTempo(tempo + 4)
    }
  }
}
export const decreaseTempo = (tempo, setTempo) => {
  if (tempo > 40 && tempo <= 240) {
    if (tempo > 120) {
      setTempo(tempo - 8)
    } else {
      setTempo(tempo - 4)
    }
  }
}
