var mockData = {
    "words": [
        {
            "id": "1",
            "Year": "3",
            "type": "root",
            "english": "abdomin/o",
            "lao": "ພາສາ ລາວ"
        },
        {
            "id": "2",
            "Year": "3",
            "type": "root",
            "english": "bio",
            "lao": "ພາສາ ລາວ"
        },    
        {
            "id": "3",
            "Year": "3",
            "type": "root",
            "english": "aden/o",
            "lao": "ພາສາ ລາວ"
        },
        {
            "id": "4",
            "Year": "3",
            "type": "root",
            "english": "anter/o",
            "lao": "ພາສາ ລາວ"
        }
    ]
};

function getRecentStatusUpdates(callbackFn) {
	setTimeout(function(){ callbackFn(mockData)}, 100);
}

function displayStatusUpdates(data) {
    // for (index in data.words) {
	   // $('body').append(
    //     '<p>' + data.words[index].english + '</p>');
    // }
    data.words.forEach(function(word){ 
        $('body').append(
            '<p>' + word.english + '</p>');
    })
}



function getAndDisplayStatusUpdates() {
	getRecentStatusUpdates(displayStatusUpdates);
}

$(function() {
	getAndDisplayStatusUpdates();
})