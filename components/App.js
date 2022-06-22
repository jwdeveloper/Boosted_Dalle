new Vue(
    {
        el: '#app',
        data: {
            formData:
            {
                input: "Pope meets aliens",
                imagesCount: 1,
            },
            favorite:
            {
                images: []
            },
            batches: []
        },
        watch: {
           
        },
        mounted() {


            document.title = "Boosted dalle"

            let imagesJson = window.localStorage.getItem("Images");
            if(imagesJson == null)
            {
                return;
            }
            const images = JSON.parse(imagesJson);
            for (var image in images) {
                this.favorite.images.push(images[image]);
            }
        }
    })