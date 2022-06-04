const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    fetch(baseURL + `?type=track&q=${term}`)
            .then(response => {
                return response.json()
            })
            .then(tracks => {
                document.querySelector("#tracks").innerHTML = '';
                console.log(`Load first five tracks for ${term} into #tracks section`);
                if (tracks.length == 0) {
                    console.log(`No tracks found for ${term}`);
                    document.querySelector("#tracks").innerHTML += `
                    <h2>No tracks found</h2>`
                }
                else {
                for (let i = 0; i < 5; i++) {
                    document.querySelector("#tracks").innerHTML += `
                    <button class="track-item preview" data-preview-track="${tracks[i].preview_url}" data-preview-image="${tracks[i].album.image_url}" data-track-name="${tracks[i].name}" data-artist-name="${tracks[i].artist.name}" onclick="handleTrackClick(event);">
    <img src="${tracks[i].album.image_url}" alt="Album art for ${tracks[i].name}">
    <i class="fas play-track fa-play" aria-hidden="true"></i>
    <div class="label">
        <h2>${tracks[i].name}</h2>
        <p>
            ${tracks[i].artist.name}
        </p>
    </div>
</button>`
                  }
             } })
    
};

const getAlbums = (term) => {
    fetch(baseURL + `?type=album&q=${term}`)
        .then(response => {
            return response.json()
        })
        .then(albums => {
            document.querySelector("#albums").innerHTML = '';
            console.log(`Load albums for ${term} into #albums section`);
            if (albums.length == 0) {
                console.log(`No albums found for ${term}`);
                document.querySelector("#albums").innerHTML += `
                <h2>No albums found</h2>`
            }
            else {
            for (const al of albums) {
                document.querySelector("#albums").innerHTML += `
                <button class="album-card" id="${al.id}" data-name="${al.name}" data-cover="${al.image_url}" onclick="handleAlbumClick(event)">
    <div>
        <img src="${al.image_url}" alt="Album art for ${al.name}">
        <h2>${al.name}</h2>
        <div class="footer">
            <a href="${al.preview_url}" target="_blank">
                view on spotify
            </a>
        </div>
    </div>
</button>`
            }

        } 
        })
};

const getArtist = (term) => {
    fetch(baseURL + `?type=artist&q=${term}`)
            .then(response => {
               return response.json()
            })
            .then(artists => {
                document.querySelector("#artist").innerHTML = '';
                console.log(`Load artist card for ${term} into #artist section`);
                if (artists.length == 0) {
                    console.log(`No artists found for ${term}`);
                    document.querySelector("#artist").innerHTML += `
                    <h2>No artists found</h2>`
                }
                else {
                document.querySelector("#artist").innerHTML += `
                <section class="artist-card" id="${artists[0].id}">
                <div>
        <img src="${artists[0].image_url}" alt="picture of ${artists[0].name}">
        <h2>${artists[0].name}</h2>
        <div class="footer">
            <a href="${artists[0].spotify_url}" target="_blank">
                view on spotify
            </a>
        </div>
    </div>
</section>`
                  
            }}
            );
};

const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    const previewImage = ev.currentTarget.getAttribute('data-preview-image');
    const trackName = ev.currentTarget.getAttribute('data-track-name');
    const artistName = ev.currentTarget.getAttribute('data-artist-name');
    console.log(previewUrl);
    document.querySelector('#current-track').innerHTML = '';
    document.querySelector('#current-track').innerHTML += `
    <img src="${previewImage}" alt="Album art for ${trackName}">
    <div id="trackLabel">
    <h2>${trackName}</h2>
    <p>${artistName}</p> </div>`
    audioPlayer.setAudioFile(previewUrl);
    audioPlayer.play();
}

const handleAlbumClick = (ev) => {
    const albumID = ev.currentTarget.getAttribute('id');
    const albumName = ev.currentTarget.getAttribute("data-name");
    const albumImage = ev.currentTarget.getAttribute("data-cover");
    console.log(albumID);
    fetch(`https://www.apitutor.org/spotify/v1/albums/${albumID}/tracks`)
        .then(response => {
            return response.json()
        })
        .then(albumTracks => {
            document.querySelector("#tracks").innerHTML = '';
            console.log(albumTracks);
            console.log(`Load first five tracks of ${albumName}`);
            for (let i=0; i < 5;i++) {
                const previewURL  = albumTracks.items[i].preview_url;
                const name = albumTracks.items[i].name;
                const artistName = albumTracks.items[i].artists[0].name;
                document.querySelector("#tracks").innerHTML += `
                    <button class="track-item preview" data-preview-track="${previewURL}" data-preview-image="${albumImage}" data-track-name="${name}" data-artist-name="${artistName}" onclick="handleTrackClick(event);">
    <img src="${albumImage}" alt="Album art for ${name}">
    <i class="fas play-track fa-play" aria-hidden="true"></i>
    <div class="label">
        <h2>${name}</h2>
        <p>
            ${artistName}
        </p>
    </div>
</button>`
            }
        })
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};