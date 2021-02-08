// //--Using Async & await --//
// //--serchSong--//
//// const searchSongs = async () => {
////     try{
////         const searchText = document.getElementById("search-input").value;
////     const url = ` https://api.lyrics.ovh/suggests/${searchText}`; //---Call API or Data Load--//
  
//    // --load Data --//
////     const response = await fetch(url) //--Use api in my website --//
////     const data = await response.json(); //--Server Response Data Format--//
////     displaySongs(data.data); //--Use Server Response Data in My Website --//
////     }
// //    catch(error){
// //        displayErrorMessage(error);
// //    }
// //  }
  


// --serchSong--//

const searchSongs = () => {
  const searchText = document.getElementById("search-input").value;
  const url = ` https://api.lyrics.ovh/suggest/${searchText}`; //---Call API or Data Load--//


  // --load Data --//
  fetch(url) //--Use api in my website --//
    .then((response) => response.json()) //--Server Response Data Format--//
    .then((data) => displaySongs(data.data)) //--Use Server Response Data in My Website --//
    .catch(error => displayErrorMessage(error));   //--For Error Handling --//
};



// --display song--//
const displaySongs = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = '';  //--For Cleaning previous Search Result --//
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
             <source src= "${song.preview}">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick= "getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>
         
         `;
    songContainer.appendChild(songDiv);
  });
};


// -- Display Lyrics --//

//// --Using async & await for get data from server ---//
//// --Display Lyrics --//
//// const getLyrics = async (artist,title) =>{
////     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
////    const response = await fetch(url)
////     const data = await response.json();
////     displayLyrics(data.lyrics);
//// }


// --Display Lyrics --//
const getLyrics = (artist,title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayErrorMessage(error));  //--For Error Handling --//
}

const displayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById("lyrics-container");
    lyricsDiv.innerText = lyrics;
}


// --Display Error --//
const displayErrorMessage = error =>{
    const errorTag = document.getElementById("error-message");
    errorTag.innerText = error;
    errorTag.style.display = "block";
}