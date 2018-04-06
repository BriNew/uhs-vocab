$(document).ready(function() {
	let year, type_select;
	let englishInput, yearInput, typeSelectInput, laoInput, secret, pageNum;
	

	function getTerms(page) {
		let terms;
		$('#results').show();
		$('#user_student').hide();
		$('#user_teacher').hide();
		$('#user_select').hide();
		$('#results_static').hide();
		$('#form_post').hide();
		$('#select_container').hide();
		$('#page_button_container').show();
		$('#next_page_button').show();
		$('#no_results_message').hide();

		$.getJSON("/terms", {year: year, type_select: type_select, page: page},
			function(data) {
			  terms = data.terms.map((term, index) => showTerms(term));
  			$('#results').html(terms);
  			if(terms.length == 0){
					$('#no_results_message').show();
					$('#next_page_button').hide();
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
	};

	$('a[href="#next_page_button"]').click(function(){
		pageIncrement();
		getTerms(pageNum);
	})

	$('a[href="#previous_page_button"]').click(function(){
		pageDecrement();
		getTerms(pageNum);
		$('#next_page_button').show();
		$('#no_results_message').hide();
	})
	
	function pageIncrement() {
		pageNum += 1;
		$('#page').text(pageNum);

	}

	function pageDecrement() {
		pageNum -=1;
		if(pageNum < 1){
			pageNum = 1;
		}
		$('#page').text(pageNum);
	}

	function userChangePage(){
		$('#html').hide();
		$('#part_selected').text('Part');
		$('#class_selected').text('Class');
		$('#select_container').show();
		$('#results_static').show();
		$('#results').hide();
		$('#user_select').hide();
		$('#form_post').hide();
		$('#no_results_message').hide();
  	$('#page_button_container').hide();
		$('#html').delay(100).show(0);
	};

	$('a[href="#nav_user_teacher"]').click(function(){
		let cssLink = $('link[href*="index_student.css"]');
		cssLink.replaceWith('<link href="index.css" type="text/css" rel="stylesheet">');
		userChangePage();
		let user;
    $('#user').val('Teacher');
    user = $('#user').val();
    $('#nav_user_selected').text('User: ' + user);
    $('#user_student').hide();
		$('#user_teacher').show();
 	}); 

 	$('a[href="#nav_user_student"]').click(function(){
 		let cssLink = $('link[href*="index.css"]');
		cssLink.replaceWith('<link href="index_student.css" type="text/css" rel="stylesheet">');
		userChangePage();
		let user;
    $('#user').val('Student');
    user = $('#user').val();
    $('#nav_user_selected').text('User: ' + user);
    $('#user_student').show();
		$('#user_teacher').hide();
 	}); 

	$('a[href="#teacher_select"]').click(function(){
		let cssLink = $('link[href*="index_student.css"]');
		cssLink.replaceWith('<link href="index.css" type="text/css" rel="stylesheet">');
		$('#user_student').hide();
		$('#user_select').hide();
		$('#user_teacher').show();
 	}); 

 	$('a[href="#student_select"]').click(function(){
		$('#user_student').show();
		$('#user_select').hide();
 	}); 


     var mqlMobile = window.matchMedia("(max-width: 640px)");

     mediaqueryresponse(mqlMobile)

     mqlMobile.addListener(mediaqueryresponse)

     function mediaqueryresponse(mqlMobile, mqlDesktop) {
     	if(mqlMobile.matches) {
 		$('a[href="#mobile_dropdown_class_outer"]').click(function(){
	  		$('#mobile_dropdown_class_inner').toggle();
			}); 
	    $('a[href="#mobile_dropdown_part_outer"]').click(function(){
	  		$('#mobile_dropdown_part_inner').toggle();
		 	}); 
	    $('a[href="#mobile_dropdown_user_outer"]').click(function(){
	  		$('#mobile_dropdown_user_inner').toggle();
		 	}); 
	    $('a[href="#nav_part_all"]').click(function(){
	  		$('#mobile_dropdown_part_inner').toggle();
		 	}); 
	    $('a[href="#nav_part_prefix"]').click(function(){
	  		$('#mobile_dropdown_part_inner').toggle();
		 	}); 
	    $('a[href="#nav_part_root"]').click(function(){
	  		$('#mobile_dropdown_part_inner').toggle();
		 	}); 
	    $('a[href="#nav_part_suffix"]').click(function(){
	  		$('#mobile_dropdown_part_inner').toggle();
		 	}); 
	    $('a[href="#nav_year_all"]').click(function(){
	  		$('#mobile_dropdown_class_inner').toggle();
		 	}); 
	    $('a[href="#nav_year_1"]').click(function(){
	  		$('#mobile_dropdown_class_inner').toggle();
		 	}); 
	    $('a[href="#nav_year_2"]').click(function(){
	  		$('#mobile_dropdown_class_inner').toggle();
		 	}); 
	    $('a[href="#nav_year_3"]').click(function(){
	  		$('#mobile_dropdown_class_inner').toggle();
		 	}); 
	    $('a[href="#nav_user_teacher"]').click(function(){
	  		$('#mobile_dropdown_user_inner').toggle();
		 	}); 
	    $('a[href="#nav_user_student"]').click(function(){
	  		$('#mobile_dropdown_user_inner').toggle();
		 	});
     	}
     }


  $('a[href="#add_word"]').click(function(){
  	$('#results').hide();
    $('#form_post').show();
    $('#no_results_message').hide();
    $('#user_student').hide();
		$('#user_teacher').hide();
		$('#results_static').hide();
		$('#select_container').hide();
		$('#page_button_container').hide();
  }); 

  function displayYear(yearSelected) {
  	$('#year').val(yearSelected);
  	year = $('#year').val();
  };

  $('a[href="#nav_year_all"]').click(function(){
  	pageNum = 0;
  	$("form_all_years").submit();
    displayYear(null);
    $('#class_selected').text('Class: All');
    pageIncrement();
    getTerms(pageNum);
  }); 

  $('a[href="#nav_year_1"]').click(function(){
  	pageNum = 0;
    displayYear(1);
    $('#class_selected').text('Class: Year ' + year);
    pageIncrement();
    getTerms(pageNum);
  }); 
 
  $('a[href="#nav_year_2"]').click(function(){
  	pageNum = 0;
    displayYear(2);
    $('#class_selected').text('Class: Year ' + year);
    pageIncrement();
    getTerms(pageNum);
  }); 

  $('a[href="#nav_year_3"]').click(function(){
	  pageNum = 0;
	  displayYear(3);
	  $('#class_selected').text('Class: Year ' + year);
	  pageIncrement();
	  getTerms(pageNum);
  }); 

  function displayPart(partSelected) {
  	$('#part').val(partSelected);
  	type_select = $('#part').val();
  };

  $('a[href="#nav_part_all"]').click(function(){
  	pageNum = 0;
  	$("form_all_parts").submit();
    displayPart(null);
    $('#part_selected').text('Part: All');
    pageIncrement();
    getTerms(pageNum);
  }); 

	$('a[href="#nav_part_prefix"]').click(function(){
	  pageNum = 0;
	  displayPart('prefix');
      $('#part_selected').text('Part: ' + type_select);
      pageIncrement();  
      getTerms(pageNum);
  }); 
 
	$('a[href="#nav_part_root"]').click(function(){
	  pageNum = 0;
      displayPart('root');
      $('#part_selected').text('Part: ' + type_select);
      pageIncrement();
      getTerms(pageNum);
  }); 
 
  $('a[href="#nav_part_suffix"]').click(function(){
  	pageNum = 0;
    displayPart('suffix');
    $('#part_selected').text('Part: ' + type_select);
    pageIncrement();
    getTerms(pageNum);
  }); 

	$('#form_post').submit(event => {
	  event.preventDefault();
	  $('#year').val(null);
	  year = $('#year').val();
	  $('#part').val(null);
	  type_select = $('#part').val();
	  $('#class_selected').text('Class: All');
	  $('#part_selected').text('Part: All');
	  $('#form_post').hide();
	  $('#results_static').hide();
		$('#select_container').hide();

	  englishInput = $('#english_input').val();

	  yearInput = $('#year_input').val();

	  typeSelectInput = $('#type_select_input').val();

	  laoInput = $('#lao_input').val();

	  secret = $('#secret').val();

	  let payload = {
	  		english: englishInput, 
	  		year: yearInput, 
	  		type_select: typeSelectInput, 
	  		lao: laoInput,
	  		secret: secret
	  	};
	  $.ajax({
	  	type: "POST",
	  	url: "/terms",
	  	data: JSON.stringify(payload),
	  	dataType: "json",
	  	contentType: "application/json",
	  	statusCode: {
		    401: function() {
		    	$('#results').hide();
		       	$('#no_results_message').text('The provided secret is not correct');
		       	$('#no_results_message').show();
		    }
		  }
	  })
	   getTerms();
	   window.location.href = "/#nav_user_teacher";
	   // $('#results').show();
	   // location.reload();
	   // pageNum = 0;
	});

});

