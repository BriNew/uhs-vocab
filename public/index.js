$(document).ready(function() {
	console.log("Hello World");

	function getTerms() {
		$.getJSON("/terms", {"type" : "root"},
			function(data) {
				console.log(data);
				// const termsTitle = data.terms.map((term, index) => showTitle(term));
				// $('#title').html(termsTitle);
				const terms = data.terms.map((term, index) => showTerms(term));
  			$('#results').html(terms);
			});
	};	

	// function showTitle(term) {
	//   return `
 //          <h2>${term.english}</h2>
 //      `;
	// }

	// function showDef(term) {
	//   return `
 //        <li>
	// 	  <h2>${term.english}</h2>
 //          <p>${term.year}</p>
 //          <p>${term.type}</p>
 //          <p>${term.lao}</p>
 //        </li>
 //      `;
	// }

	function showTerms(term) {
	  return `
		      	<div class="col-6">
		          <div class="frame">
		            <div class="card" id="card1">
		              <div class="card_title" id="title1">
		                <h2 class="word">${term.english}</h2>
		              </div>
		              <div class="card_content" id="content1">
		                <p class="definition">${term.year}</p>
		                <p class="definition">${term.type}</p>
		                <p class="definition">${term.lao}</p>
		              </div>
		            </div>
		          </div>
		        </div>

        
      `;
	}


          // <div class="frame">
          //   <div class="card" id="card1">
          //     <div class="card_title" id="title1">
          //       <h2 class="word">${term.english}</h2>
          //     </div>
          //     <div class="card_content" id="content1">
          //       <p class="definition">${term.year}</p>
          //       <p class="definition">${term.type}</p>
          //       <p class="definition">${term.lao}</p>
          //     </div>
          //   </div>
          // </div>

	getTerms();


});
