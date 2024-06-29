
const url=window.location.href
const search = new URLSearchParams(url.split('?')[1])
const id=search.get('id');


async function getforedit() {
    
    const res =await fetch(`http://localhost:3000/api/getforedit/${id}`)
    const data  = await res.json()
   let str =``;

    str=`
        <div class="banner">
        <img class="bann" src="${data.banner}" alt="" width="12% " >
        <div class="container5">
            <div class="poster">
                

                <img id="photo" src="${data.profile}" alt="Ullozhukku Poster">
            </div>
            <div class="details">
                <h1 id="name">${data.name}</h1>
                <div class="rating">
                    <span id="likes">⭐${data.Likes} Likes</span>
                    <button class="rate-button">Rate now</button>
                </div>
                <div class="info">
                  
                    <span class="duration">2h 3m</span>
                    <span class="genre" id="category">${data.category}</span>
                    <span class="release-date">21 Jun, 2024</span>
                </div>
                  <a href="../pages/edit.html?id=${data._id}"><button class="book-button">Edit</button></a>
                
                <button class="book-button" onclick="deletemovie('${data._id}')">Delete</button>

            </div>
        </div>
    </div>`


document.getElementById('details').innerHTML=str

}

getforedit()


async function deletemovie(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/delete/${id}`, {
            method: 'DELETE',
        });
        console.log(res);
        if(res.status==200){
          const data = await res.json();
          alert(data.msg);
        window.location.href="../index.html"
        }
        
    } catch (error) {
        console.error(error);
        
    }
}
