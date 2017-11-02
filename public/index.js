$(document).ready(function() {
	let year, type_select;
	let englishInput, yearInput, typeSelectInput, laoInput;
	

	function getTerms() {
		let terms;
		$.getJSON("/terms", {year: year, type_select: type_select},
			function(data) {
				console.log(data);
			  terms = data.terms.map((term, index) => showTerms(term));
  			$('#results').html(terms);
  			console.log(terms.length);
  			if(terms.length == 0){
					$('#no_results_message').show();
					console.log("please search again");
				}
			});
			
	};	



	function showTerms(term) {
	  return `

		          <div class="frame">
		            <div class="card" id="card1">
		              <div class="card_title" id="title1">
		                <h3 class="word">${term.english}</h3>
		              </div>
		              <div class="card_content" id="content1">
		                <p class="definition" id="year">Year ${term.year}</p>
		                <p class="definition">${term.type_select}</p>
		                <p class="definition">${term.lao}</p>
		              </div>
		            </div>
		          </div>


      `;
	}

	// $('#target')
 //      .click(function(event) {
 //        alert('Hello!');
 //      })
 //      .click(function(event) {
 //        alert('Hello again!');
 //      })
 //      .click(function(event) {
 //        alert('Hello yet again!');
 //      });

  $('a[href="#mobile_dropdown_class_outer"]').click(function(){
	  		$('#mobile_dropdown_class_inner').show();
 	}); 


  $('a[href="#mobile_dropdown_part_outer"]').click(function(){
  	$('#mobile_dropdown_part_inner').show();
 }); 

  $('a[href="#add_word"]').click(function(){
  	$('#results').hide();
    $('#form_post').show();
    $('#no_results_message').hide();
 }); 

  $('a[href="#nav_year_all"]').click(function(){
  	$("form_all_years").submit();
    // event.preventDefault();
  	$('#year').val(null);
  	year = $('#year').val();
  	$('#mobile_dropdown_class_inner').hide();
    $('#results').show();
    $('#form_post').hide();
    $('#no_results_message').hide();
    getTerms();
    // $('#year').val();
    // year = $('#year').val();
    // console.log(year);
 }); 

  $('a[href="#nav_year_1"]').click(function(){
    $('#year').val(1);
    year = $('#year').val();
    $('#mobile_dropdown_class_inner').hide();
    $('#no_results_message').hide();
    getTerms();
    console.log(year);
 }); 
 
  $('a[href="#nav_year_2"]').click(function(){
    $('#year').val(2);
    year = $('#year').val();
    $('#mobile_dropdown_class_inner').hide();
    $('#no_results_message').hide();
    getTerms();
    console.log(year);
 }); 
 
  $('a[href="#nav_year_3"]').click(function(){
    $('#year').val(3);
    year = $('#year').val();
    $('#mobile_dropdown_class_inner').hide();
    $('#no_results_message').hide();
    getTerms();
    console.log(year);
 }); 

  $('a[href="#nav_part_all"]').click(function(){
  	$("form_all_parts").submit();
  	$('#part').val(null);
  	type_select = $('#part').val();
  	$('#mobile_dropdown_part_inner').hide();
    $('#results').show();
    $('#form_post').hide();
    $('#no_results_message').hide();
    getTerms();
 }); 

	$('a[href="#nav_part_prefix"]').click(function(){
    $('#part').val('prefix');
    type_select = $('#part').val();
    $('#mobile_dropdown_part_inner').hide();
    $('#no_results_message').hide();
    getTerms();
    console.log(type_select);
 }); 
 
	$('a[href="#nav_part_root"]').click(function(){
    $('#part').val('root');
    type_select = $('#part').val();
    $('#mobile_dropdown_part_inner').hide();
    $('#no_results_message').hide();
    getTerms();
    console.log(type_select);
 }); 
 
  $('a[href="#nav_part_suffix"]').click(function(){
    $('#part').val('suffix');
    type_select = $('#part').val();
    $('#mobile_dropdown_part_inner').hide();
    $('#no_results_message').hide();
    getTerms();
    console.log(type_select);
 }); 

	$('.subtitles_nav_part').change(function(event) {
		type_select = $(this).val();
		console.log(type_select);
	})

	$('#form_post').submit(event => {
	  event.preventDefault();
	  $('#form_post').hide();
	  

	  englishInput = $('#english_input').val();
	  // $('#english_new').text(englishInput);
	  console.log(englishInput);

	  yearInput = $('#year_input').val();
	  // $('#year_new').text(yearInput);
	  console.log(yearInput);

	  typeSelectInput = $('#type_select_input').val();
	  // $('#type_select_new').text(typeSelectInput);
	  console.log(typeSelectInput);

	  laoInput = $('#lao_input').val();
	  // $('#lao_new').text(laoInput);
	  console.log(laoInput);

	  let payload = {
	  		english: englishInput, 
	  		year: yearInput, 
	  		type_select: typeSelectInput, 
	  		lao: laoInput
	  	};
	  console.log(payload);
	  $.ajax({
	  	type: "POST",
	  	url: "/terms",
	  	data: JSON.stringify(payload),
	  	dataType: "json",
	  	contentType: "application/json",
	  	success: function(res){
	  		console.log("Hey it worked");
	  		console.log(res);
	  	}
	  })
	   getTerms();
	   $('#results').show();
	});

 //  $('#find_terms').submit(function(event) {
 //    event.preventDefault();
 //    getTerms();
	// });



  $('a[href="#find_terms"]').click(function(){
    event.preventDefault();
    $('#results').show();
    $('#form_post').hide();
    getTerms();
 }); 

 //   $('a[href="#find_terms"]').click(function(){
 //    event.preventDefault();
 //    $("#form_get").submit();
 //    $('#form_post').hide();
 //    $('#results').show();
 //    getTerms();
 //    return false;
 // }); 

//    $("selector_for_the_anchor").click(function() {
//     $("selector_for_the_form").submit();
//     return false;
// });


 //   $('#form_get').submit(function(){
 //    event.preventDefault();
 //    $('#results').show();
 //    $('#form_post').hide();
 //    getTerms();
 // }); 

});
