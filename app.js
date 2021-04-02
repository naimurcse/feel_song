const searchSong = async() =>{
    const searchText = document.getElementById('search-field').value;
    console.log(searchText);

    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    console.log(url);

    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
}

const displaySongs = songs =>{
    console.log(songs);
    const songContainer = document.getElementById("song-container");

    songContainer.innerHTML = "";

    songs.forEach(song => {
        // console.log(song)
        console.log(song.title)
        const songDiv = document.createElement("div");
        
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `       
            <div class="col-md-9">
                <h3 id="song-title" class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.title}','${song.artist.name}')" class="btn btn-success">Get Lyrics</button>
            </div>        
        `;
        songContainer.appendChild(songDiv);
    });
}

const getLyric = async(title, artist) => {
    // console.log(title, artist);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    console.log(url);
    // fetch(url)
    // .then(res => res.json())
    // .then( data => {
    //     console.log(data);
    //     const lyricsContainer = document.getElementById("lyricsContainer");
    //     lyricsContainer.innerText = data.lyrics;
    // })


    const res = await fetch(url);
    const data = await res.json();
    displayLyric(data.lyrics);
}

const displayLyric = lyrics => {
    console.log(lyrics);
    const lyricsContainer = document.getElementById("lyricsContainer");
    lyricsContainer.innerText = lyrics;
}
