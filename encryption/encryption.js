const serverSalt = '9yXruyv2L7PQzmAWHYQmcmNS'
const clientSalt = 'KSd7zZ9bCKgxBvPcPJXUBgHV'

function caesarCipherEncryptHex(text, key) {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    let char = text[i]
    if (char.match(/[0-9a-f]/i)) {
      let code = parseInt(char, 16)
      code = (code + key) % 16
      char = code.toString(16)
    }
    result += char
  }
  return result
}

function generatePrimaryKey(caeserOffset) {
    const now = Date.now()

    const hours = now.getUTCHours()
    const date = now.getUTCDate()
    const day = now.getUTCDay()
    
    const keyNum = hours * date * day
    const keyHex = keyNum.toString(16)

    const key = caesarCipherEncryptHex(keyHex, caeserOffset)

    return key
}

function generatePrimaryServerKey() {
    const key = generatePrimaryKey(3) + generatePrimaryKey(7) + serverSalt
    return key
}

function generatePrimaryClientKey() {
    const key = generatePrimaryKey(5) + generatePrimaryKey(11) + clientSalt
    return key
}