$(document).ready(function() {
	let year, type_select;

	function getTerms() {
		$.getJSON("/terms", {year: year, type_select: type_select},
			function(data) {
				console.log(data);
				const terms = data.terms.map((term, index) => showTerms(term));
  			$('#results').html(terms);
			});
	};	



	function showTerms(term) {
	  return `
		      	<div class="col-4">
		          <div class="frame">
		            <div class="card" id="card1">
		              <div class="card_title" id="title1">
		                <h3 class="word">${term.english}</h3>
		              </div>
		              <div class="card_content" id="content1">
		                <p class="definition" id="year">${term.year}</p>
		                <p class="definition">${term.type_select}</p>
		                <p class="definition">${term.lao}</p>
		              </div>
		            </div>
		          </div>
		        </div>

      `;
	}

	$('#year').change(function(event) {
		year = $(this).val();
		console.log(year);
	})

	$('#type_select').change(function(event) {
		type_select = $(this).val();
		console.log(type_select);
	})

  $('#find_terms').submit(function(event) {
    event.preventDefault();
    getTerms();
	});



	
	


});
