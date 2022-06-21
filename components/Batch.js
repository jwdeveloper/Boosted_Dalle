Vue.component('Batch', {
    props: ['batch', 'favorite','batches'],
    methods: {
        changeImagesVisibility() {
            this.showImages = !this.showImages;
        },
        addToFavorites(base64) {
            if (this.favorite.images.indexOf(base64) != -1)
                return;
            this.favorite.images.push(base64);
        },
        getImageLink(base64) {
            return "data:image/png;base64," + base64;
        }, 
        removeBatch(batch)
        {
            this.batches.splice(this.batches.indexOf(batch), 1);
        }
    },
    data: function () {
        return {
            showImages: true,
            imageSize: 170
        }
    },
    template: `
    <div class="card batch">
 
        <div class="card-header " v-on:click = "changeImagesVisibility()">
          <div class="col-sm-2">
            <h5 class="modal-title">{{batch.input}}</h5>
          </div>

          <div class="col-sm-7">
            <h5 class="modal-title float-right">{{batch.error}}</h5>
          </div>

          <div class="col-sm-1">
          <h5 class="modal-title float-right">{{batch.currentCount}}/{{batch.imagesCount}}</h5>
        </div>

          <div class="col-sm-1">
          <div v-if="batch.isDone === false" class="spinner-border float-right " role="status"/>
           </div>
        
          <div class="col-sm-1 ">
            <button class="btn btn-danger float-right" v-on:click ="removeBatch(this)">X</button>
          </div>
          
        </div>

        <div v-if="showImages === true" class="card-body" >
          <img  v-for="image in batch.images" :width = "imageSize"
             :src="getImageLink(image)"
             v-on:click = "addToFavorites(image)"
             class="img-thumbnail">   
         </div>
         
     </div>          
     `})
