
// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// })

// var app2 = new Vue({
//   el: '#app-2',
//   data: {
//     message: 'You loaded this page on ' + new Date()
//   }
// })

            // fetchV1IntermediaryUsers: function()
            // {
            //     this.$http.get('/api/v1_users', function(v1users)
            //     {
            //         this.$set('v1_user',v1users);
            //     });
            // },

var nutritionApp = new Vue({
    el: '#nutritionApp',
    data: {
        meals: [
            { 
                name: 'breakfast',
                foods: [
                    {name:'apple',serving:1},
                    {name:'egg',serving:2},
                    {name:'coffee',serving:1}
                ],
            },
            { 
                name: 'lunch',
                foods: [
                    {name:'apple',serving:1},
                    {name:'egg',serving:2},
                    {name:'coffee',serving:1}
                ],
            },
            { 
                name: 'dinner',
                foods: [
                    {name:'apple',serving:1},
                    {name:'egg',serving:2},
                    {name:'coffee',serving:1}
                ],
            },
            { 
                name: 'snacks',
                foods: [
                    {name:'apple',serving:1},
                    {name:'egg',serving:2},
                    {name:'coffee',serving:1}
                ],
            }
        ],
        myfoods: [
            // example data array
            // {
            //     name: undefined,
            //     meal: undefined,
            // },
        ],
        newfood: undefined,
    },
    methods: {
        addNewFood: function () {
            console.log(currentDay.myfoods)
            console.log(this.newfood)
        },
        fetchFoodData: function(fetch) {
            this.$http.get('/api/xxxx/' + fetch )
                .success(function(response){
                   this.foodSources = response;
                })
                .error(function(){

                });
        },        
    },

});

// var searchFoods = new Vue({
//     el: '#searchFoods',
//     data: {
//     },    
// });



