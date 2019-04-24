prepZeroToDate = (t) => ( '0'+t.toString() ).slice(-2)

datetimeStr = () => {
  let d = new Date();
  let yr  = d.getFullYear()
  let mo  = prepZeroToDate(d.getMonth())
  let dat = prepZeroToDate(d.getMonth())
  let hr  = prepZeroToDate(d.getHours())
  let min = prepZeroToDate(d.getMinutes())
  let sec = prepZeroToDate(d.getSeconds())
  return yr+'-'+mo+'-'+dat+'_'+hr+min+sec
}

convertSvgPpi = (elementId, ppi) => {

  let svgElem = document.getElementById(elementId).innerHTML
  let tmp_copy = JSON.parse(JSON.stringify(svgElem))
  let tmp_parsed = new DOMParser().parseFromString(tmp_copy, "text/xml")
  let svgCopy = tmp_parsed.childNodes[0]

  let scaler = ppi / 25.4

  svgCopy.setAttribute('width',  scaler * svgCopy.getAttribute('width'))
  svgCopy.setAttribute('height', scaler * svgCopy.getAttribute('height'))

  // does not seem to work:
  let svgNodes = svgCopy.childNodes
  for(var i=0; i < svgNodes.length; i++) {
    svgNodes[i].setAttribute('width',  scaler * svgNodes[i].getAttribute('width'))
    svgNodes[i].setAttribute('height', scaler *  svgNodes[i].getAttribute('height'))
  }

  return (new XMLSerializer).serializeToString(svgCopy)
}

exportSVG = (elementId) => {
  let fileName = document.getElementById('inputFileName').value
  let ppi = document.getElementById('inputDpi').value

  let svgScaled = convertSvgPpi(elementId, ppi)
  let svgScaledBlob = new Blob([svgScaled])
  download(svgScaledBlob, datetimeStr()+'_'+fileName+'.svg', 'image/svg+xml;charset=utf-8')

}

exportClickHandler = (e) => {
  exportSVG('sketch')
}

var exportButton = document.getElementById('buttonSvgExport')
exportButton.onclick = exportClickHandler
