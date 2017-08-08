console.log('Javascript ready to go...')

$('input').focus()

$('.remove').on('click', function(e) {
  var id = $(this).attr('data-id')

  $.ajax({
    url: '/tasks/' + id,
    method: 'DELETE'
  })
  .then( data => {
    console.log(data);
    window.location.reload()
  } )

})

$('.done').on('click', function(e) {
  var id = $(this).attr('data-id')

  $.ajax({
    url: '/tasks/completed/' + id,
    method: 'PUT'
  })
  .then( data => {
    console.log(data);
    window.location.reload()
  } )

})

$('.doneAll').on('click', function(e) {

  $.ajax({
    url: '/tasks/done-all',
    method: 'PUT'
  })
  .then( data => {
    window.location.reload()
  } )

})