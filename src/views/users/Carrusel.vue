<template>
    <div>
        <!-- <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            fade
            indicators
            img-weight="400"
            img-height="250">
            <b-carousel-slide caption="First slide"
            @click="showMenu()"
            >

            </b-carousel-slide>
            <b-carousel-slide
            caption="Second Slide"
            >34</b-carousel-slide>
            <b-carousel-slide
            caption="Third Slide"
            >56</b-carousel-slide>
        </b-carousel>   -->
        <CCard>
            <!-- <CCardHeader> -->
                <b-button variant="ligth" class="btn-block" @click="showMenu()">¿Quieres ganar dinero?</b-button>
            <!-- </CCardHeader> -->
        </CCard>
    </div>

</template>

<script>
  // optional style for arrows & dots
    // import rqstin from "@/views/windowmodal/requestin";
    // import rqst from "@/views/windowmodal/requestsend";
    // import requestfriend from "@/views/windowmodal/requestfriend";

  export default {
    // components: {rqstin,rqst,requestfriend },
    data() {
        return {
            settings:{
                "dots": true,
                "dotsClass": "slick-dots custom-dot-class",
                "edgeFriction": 0.35,
                "infinite": false,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1,
            }
        }
    },
    methods: {
        showMenu(){
            this.$router.push({path: 'profile'});
        }
    }
  }
</script>
