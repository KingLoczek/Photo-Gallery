class PhotoGallery{
    constructor(){
      this.API_KEY = '';
      this.galleryDIv = document.querySelector('.gallery');
      this.eventHandle();
    }
    eventHandle(){
      document.addEventListener('DOMContentLoaded',()=>{
        this.getImg();
      });
    }
    async getImg(){
      const baseURL = `https://api.unsplash.com/photos/random/?client_id=${this.API_KEY}&count=8`;
      const data = await this.fetchImages(baseURL);
      this.generateHTML(data);
    }
    async fetchImages(baseURL){
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: this.API_KEY
        }
      });
      const data = await response.json();
      return data;
    }
    generateHTML(data){
      data.forEach(photo=>{
        const item = document.createElement('section');
        const publishedData = new Date(photo.created_at).toLocaleDateString('en-US');
        item.classList.add('photo');
        item.style.backgroundImage = `url('${photo.urls.regular}')`;
        this.descIsNull(photo, item, publishedData);
        this.galleryDIv.appendChild(item);
      })
    }
    descIsNull(photo, item, publishedData) {
      if (photo.description !== null) {
        item.innerHTML = `
            <article>
                <h5 class="desc">${photo.description}</h5>
                    <div class="info">
                        <sup>by</sup>
                        <a href="${photo.user.links.html}">${photo.user.first_name}</a>
                        <sup>on</sup>
                        <time datetime="${photo.created_at}">${publishedData}</time>
                    </div>
            </article>
            `;
      } else {
        item.innerHTML = `
            <article>
                <h5 class="desc"></h5>
                    <div class="info">
                        <sup>by</sup>
                        <a href="${photo.user.links.html}">${photo.user.first_name}</a>
                        <sup>on</sup>
                        <time datetime="${photo.created_at}">${publishedData}</time>
                    </div>
            </article>
            `;
      }
    }
}
  
  const gallery = new PhotoGallery;