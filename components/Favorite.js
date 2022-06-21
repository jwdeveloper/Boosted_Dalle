Vue.component('Favorite', {
    props: ['favorite'],
    methods: {
        getImageLink(base64) {
            return "data:image/png;base64," + base64;
        },
        removeImage(base64)
        {
            this.favorite.images.splice(this.favorite.images.indexOf(base64), 1);
            console.log( this.favorite.images);
        }
    },
    data: function () {
        return {
            imageSize: 170
        }
    },
    template: `
    <div class="card favorite">
    <div class="card-body">
        <div class="row">
            <div class="col-sm-6 ">
                <h5 class="card-title">Favorite images </h5>
            </div>
            
            <div class="col-sm-6 ">
                <label class="form-label">Image size {{imageSize}}</label>
                <input type="range" v-model="imageSize" class="form-range" min="50" max="500">
            </div>
        </div>

        <div class="card-body" >
        <img  v-for="image in favorite.images" :width = "imageSize"
             :src="getImageLink(image)"
             v-on:click = "removeImage(image)"
             class="img-thumbnail"
             >    
       </div>
    </div>
</div>
     `})
