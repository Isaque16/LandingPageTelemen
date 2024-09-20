const time = new Date();
function setCurrentTime() {
  let hours   = time.getHours()   < 10 ? 
  time.getHours().toString().padStart(2, '0')   : time.getHours();
  let minutes = time.getMinutes() < 10 ? 
  time.getMinutes().toString().padStart(2, '0') : time.getMinutes();
  
  return `${hours}:${minutes}`;
}

function setCurrentDate() {
  let day   = time.getDate()  < 10 ? 
  time.getDate().toString().padStart(2, '0')  : time.getDate();
  let month = (time.getMonth() + 1) < 10 ? 
  (time.getMonth() + 1).toString().padStart(2, '0') : (time.getMonth() + 1);
  let year  = time.getFullYear();
  
  return `${ year }-${ month }-${ day }`;
}

module.exports = { setCurrentTime, setCurrentDate }
