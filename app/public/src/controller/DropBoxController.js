class DropBoxController {
  constructor () {
    this.btnSendFilesEl = document.querySelector('#btn-send-file')
    this.inputFilesEl = document.querySelector('#files')
    this.snakeModalEl = document.querySelector('#react-snackbar-root')
    this.initEvents()
  }

  initEvents() {
    this.btnSendFilesEl.addEventListener('click', () => {
      this.inputFilesEl.click()
    })
    this.inputFilesEl.addEventListener('change', event => {
      this.uploadTasks(event.target.files)
      this.snakeModalEl.style.display = 'block'
    })
  }

  uploadTasks(files){
    const promises = []
    files = [...files]
    files.forEach(file => 
      promises.push(new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest()
        ajax.open('POST', '/upload')
        
        ajax.onload = () => {
          try {
            resolve(JSON.parse(ajax.responseText))
          } catch (error) {
            reject(error)
          }
        }

        ajax.onerror = error => {
          reject(error)
        }

        let formData = new FormData()
        formData.append('input-file', file)
        ajax.send(formData)

      }))
    )
    return Promise.all(promises)
  }
}