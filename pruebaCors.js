fetch('https://siiisyw7zc.execute-api.us-east-1.amazonaws.com/carreras', {
  method: 'GET'
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('ERROR:', err));