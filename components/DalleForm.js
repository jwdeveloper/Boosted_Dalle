Vue.component('Dalleform', {
    props: ['data', 'batches'],
    methods: {
        addBatch() {
            console.log("adding batch", this.data);
            const bath = {
                input: this.data.input,
                isDone: false,
                images: [],
                imagesCount: this.data.imagesCount,
                currentCount: 0,
                error: "",
            }
            this.batches.push(bath);

            bath.images.push()
            for (var i = 0; i < this.data.imagesCount; i++) {
                sendRequestRandomDelay(bath)
            }
        },
    },
    template: `
  
            <div class="card favorite form dalle-form">
               <div class="form-group form-test">
                    <label>Input text</label>
                    <input class="form-control"  v-model="data.input"/>
                </div>
                <div class="form-group form-test">
                    <label >Images to render {{data.imagesCount * 9}} </label>
                    <input type="range"    class="form-range" min="1" max="10" v-model="data.imagesCount">
                </div>
                <div class="form-group form-test">
                    <button class="btn btn-primary btn-lg dalle-form-btn-fill"  v-on:click = "addBatch()">Generate</button>
                </div>
             </div>
             </div>
   `})




