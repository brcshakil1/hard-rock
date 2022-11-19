document.getElementById('btn').addEventListener('click', ()=>{
    const songTitle = document.getElementById('song-title').value;
    fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
        .then(res => res.json())
        .then(data => {
            let arrayData = data.data;
            console.log(arrayData)
            arrayData = arrayData.slice(0, 10);
            const songDetails = document.getElementById('song-details');
            songDetails.innerHTML = '';
            for(let i = 0; i< arrayData.length; i++){
                const song = arrayData[i];
                
                songDetails.innerHTML += `
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title} (${song.artist.name})</h3>
                        <p class="author lead">Album by <span>${song.album.title}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onClick="getLyrics(${song.artist.name}, ${song.title})" class="btn btn-success">Get Lyrics</button>
                    </div>
                    <audio controls>
                        <source src= "${song.preview}" type="audio/mpeg">
                    </audio>
                </div>
                `;
            }
            
        })
        .catch(error => displayError('Something Went Wrong!! Please try again later!'));
})

const getLyrics = (artist, title) => {
    // const lyrics = document.getElementById('lyrics');
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}