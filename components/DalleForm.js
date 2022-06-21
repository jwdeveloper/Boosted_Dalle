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

            for(var i =0;i<this.data.imagesCount;i++)
            {
                SendDalleGenerateRequest(bath)
            }
        },
    },
    template: `
    <div class="row dalle-form">
       <div class="col-sm-3 "/>
       <div class="col-sm-6 ">
            <div class="card favorite form">
               <div class="form-group form-test">
                    <label lass="form-label">Input text</label>
                    <input class="form-control"  v-model="data.input"/>
                </div>
                <div class="form-group form-test">
                    <label class="form-label">Images to render {{data.imagesCount}} </label>
                    <input type="range"    class="form-range" min="1" max="10" v-model="data.imagesCount">
                </div>
                <div class="form-group form-test">
                    <button class="btn btn-secondary btn-lg dalle-form-btn-fill"  v-on:click = "addBatch()">Generate</button>
                </div>
             </div>
             </div>
        <div class="col-sm-3"/>
    </div>`})




