/// FADE
document.body.style.opacity = 0;
window.onload = () => {
  document.body.style.transition = "0.4s";
  document.body.style.opacity = 1;
};

// NAV
function goHome(){ window.location.href="index.html"; }
function goBack(){ window.location.href="playlist.html"; }



// ================= SONG DATA =================
const songsData = {
  happy: [
    { name: "Singari", artist: "Sai Abhyankar", src: "music/Singari (Telugu)(KoshalWorld.Com).mp3", cover: "images/Singari-From-Dude-Tamil-2025-20251004190656-500x500.jpg" },
    { name: "Shape of You", artist: "Ed Sheeran", src: "music/Shape of You - Ed Sheeran.mp3", cover: "images/Shape-of-You-Remix--English-2017-20211105074006-500x500.jpg" },
    { name: "Vaathi Coming", artist: "Anirudh", src: "music/Master - Vaathi Coming Lyric  Thalapathy Vijay  Anirudh Ravichander  Lokesh Kanagaraj - Sony Music South (youtube).mp3", cover: "images/Master-Tamil-2020-20200316084627-500x500.jpg" },
    { name: "Pavazha Malli", artist: "Sai Abhyankar", src: "music/Pavazha Malli - SouthMelody.mp3", cover: "images/thumb_69ada5ae00349.jpg" },
    { name: "Arabic kuthu", artist: "Anirudh", src:"music/Arabic Kuthu Beast 128 Kbps.mp3", cover:"images/Beast-Tamil-2022-20220504184736-500x500.jpg" }
  ],
  sad: [
    { name: "Channa Mereya", artist: "Arijit Singh", src: "music/Channa Mereya-(SambalpuriStar.In).mp3", cover: "images/Channa-Mereya-From-Ae-Dil-Hai-Mushkil-Hindi-2016-500x500.jpg" },
    { name: "Yellipoke shyamala", artist: "Karthik", src: "music/5-Yellipoke Shyamala-SenSongsMp3.Co.mp3", cover: "images/A-Aa-Telugu-2016-500x500.jpg" },
    { name: "Moral of the Story", artist: "Ashe", src: "music/Moral-Of-The-Story.mp3", cover: "images/download.jpeg" },
    { name: "Luckanna maate nillu", artist: "Anirudh", src: "music/Luckkanna Mate Nillu - SenSongsMp3.Co.mp3", cover: "images/images.jpeg" },
    { name: "My love is gone", artist: "Devi Sri Prasad", src: "music/6-My Love Is Gone-SenSongsMp3.Co.mp3", cover: "images/640x360_Arya2_9999_ae6f7676-ffbb-49ea-84fe-8a38b478f8eb.jpg" }
  ],
  angry: [
    { name: "Vikram Title Song", artist: "Anirudh", src: "music/Vikram Title Track Anirudh Ravichander 128 Kbps.mp3", cover: "images/Vikram-Tamil-2022-20220515182605-500x500.jpg" },
    { name: "Aaya Sher", artist: "Jangi Reddy", src: "music/Aaya Sher.mp3", cover: "images/images (1).jpeg" },
    { name: "Fear", artist: "Anirudh", src: "music/Fear.mp3", cover: "images/Fear-Song-From-Devara-Part-1-Telugu-Telugu-2024-20240519131003-500x500.jpg" },
    { name: "Believer", artist: "Dan Reynolds", src: "music/Imagine Dragons - Believer (Audio).mp3", cover: "images/size_m.jpg" },
    { name: "Fire Strom", artist: "Thaman", src: "music/Fire Storm.mp3", cover: "images/Firestorm-From-They-Call-Him-OG-Hindi-Hindi-2025-20250809213159-500x500.jpg" }
  ],
  chill: [
    { name: "Golden Sparrow", artist: "Subhlashini", src: "music/Golden Sparrow From Jaabilamma Neeku Antha Kopama(PagaiWorld.com).mp3", cover: "images/233438-Nilavuku En Mel Ennadi Kobam First Single Dhanush Priyanka Mohan Golden Sparrow GV Prakash  .jpg" },
    { name: "Masakkali", artist: "Mohit Chauhan", src: "music/Masakali Delhi 6 128 Kbps.mp3", cover: "images/Masakali-Masakali.jpg" },
    { name: "Top lesi poddi", artist: "Sagar", src: "music/Top Lesi Poddi-SenSongsMp3.Com.mp3", cover: "images/Idharammayilatho-2013-500x500.jpg" },
    { name: "Rooba Rooba", artist: "Shail Hada", src: "music/6-Rooba Rooba-SenSongsMp3.Co.mp3", cover: "images/download (1).jpeg" },
    { name: "Closer", artist: "Halsey", src: "music/Closer The Chainsmokers 128 Kbps.mp3", cover: "images/So-Baby-Pull-Me-Closer.jpg" }
  ]
};
let songs = [];

// MOOD SELECT
function selectMood(mood){
  localStorage.setItem("mood", mood);
  window.location.href="playlist.html";
}

// DETECT MOOD
async function detectMood(){
  const text=document.getElementById("textInput").value.trim();
  if(!text){ alert("Enter mood"); return; }

  try{
    const res=await fetch("http://127.0.0.1:5000/detect",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({text})
    });

    const data=await res.json();
    const mood=(data.mood||"").toLowerCase();

    if(!["happy","sad","angry","chill"].includes(mood)){
      alert("Mood not detected");
      return;
    }

    localStorage.setItem("mood",mood);
    window.location.href="playlist.html";

  }catch{
    alert("Backend not connected");
  }
}

// ================= PLAYLIST =================
if(document.getElementById("songs")){
  const mood=localStorage.getItem("mood")||"happy";
  songs=songsData[mood];

  document.getElementById("title").innerText=mood.toUpperCase()+" VIBES";

  document.getElementById("songs").innerHTML =
    songs.map((s,i)=>`
      <div class="song" onclick="play(${i})">
        <div class="song-left">
          <img src="${s.cover}">
          <span>${s.name} - ${s.artist}</span>
        </div>
      </div>
    `).join("");
}

// PLAY
function play(i){
  localStorage.setItem("songIndex",i);
  localStorage.setItem("tempSongs",JSON.stringify(songs));
  window.location.href="player.html";
}

// ================= PLAYER =================
if(document.getElementById("audio")){

  let songs=JSON.parse(localStorage.getItem("tempSongs"))||[];
  let index=parseInt(localStorage.getItem("songIndex"))||0;

  const audio=document.getElementById("audio");
  const progress=document.getElementById("progress");
  const volume=document.getElementById("volume");

  function load(){
    let s=songs[index];
    document.getElementById("songName").innerText=s.name;
    document.getElementById("artist").innerText=s.artist;
    document.getElementById("cover").src=s.cover;
    audio.src=s.src;
    audio.play();
  }

  load();

  window.toggle=()=> audio.paused?audio.play():audio.pause();
  window.next=()=>{ index=(index+1)%songs.length; load(); };
  window.prev=()=>{ index=(index-1+songs.length)%songs.length; load(); };

  audio.ontimeupdate=()=>{
    if(audio.duration){
      progress.value=(audio.currentTime/audio.duration)*100;
    }
  };

  progress.oninput=()=>{
    audio.currentTime=(progress.value/100)*audio.duration;
  };

  // 🔊 VOLUME CONTROL
  if(volume){
    volume.value=1;
    volume.oninput=()=> audio.volume=volume.value;
  }
}