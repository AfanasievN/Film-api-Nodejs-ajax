$(function(){
    // It will get & read
    $('#get-button').on('click', function(){
      $.ajax({
        url: '/films',
        contentType: 'application/JSON',
        success: function(response){
          var tbodyEl = $('tbody');

          tbodyEl.html('');

          response.films.forEach(function(film){
            tbodyEl.append('\
                <tr>\
                    <td class="id">' + film.id + '</td>\
                    <td><input type="text" class="title" value="' + film.title + '"></td>\
                    <td><input type="text" class="descr" value="' + film.descr + '"></td>\
                    <td><input type="number" class="rating" value="' + film.rating + '" min="1" max="5"></td>\
                    <td><input type="number" class="released" value="' + film.released + '" min="1930" max="2017"></td>\
                    <td >\
                    <button class="update-button btn btn-default" type="button" name="button">Update/PUT</button>\
                    <button class="delete-button btn btn-default" type="button" name="button">Delete</button>\
                    </td>\
                </tr>\
            ');
          });
        }
      });
    });

    // CREATE/POST

    $('#create-form').on('submit', function(event){
      event.preventDefault();

      var createInput = $('#create-input');
      var createInputDes = $('#create-inputDes');
      var createInputRate = $('#create-inputRate');
      var createInputRelease = $('#create-inputRelease');

      $.ajax({
        url: '/films',
        method:'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          title: createInput.val(),
          descr: createInputDes.val(),
          rating: Number(createInputRate.val()),
          released: createInputRelease.val()
                             }),
        success: function(response) {
          console.log(response);
          createInput.val('');
          createInputDes.val('');
          createInputRate.val('');
          createInputRelease.val('');
          $('#get-button').click();
        }
      });
    });

    //UPDATE/put

    $('table').on('click', '.update-button', function(){
      var rowEl = $(this).closest('tr');
      var id = rowEl.find('.id').text();
      var newTitle = rowEl.find('.title').val();
      var newDesc = rowEl.find('.descr').val();
      var newRating = rowEl.find('.rating').val();
      var newRelease = rowEl.find('.released').val();

      $.ajax({
        url: '/films/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
        newTitle: newTitle,
        newDesc: newDesc,
        newRating: newRating,
        newRelease: newRelease
      }),
      success: function(response) {
        console.log(response);
        $('#get-button').click();
      }
      });
    });

    // Delete
    $('table').on('click', '.delete-button', function() {
      var rowEl = $(this).closest('tr');
      var id = rowEl.find('.id').text();

      $.ajax({
        url: '/films/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(response) {
          console.log(response);
          $('#get-button').click();
        }
      });
    });
});
