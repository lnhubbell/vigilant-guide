var nutritionApp = new Vue({
    el: '#nutritionApp',
    data: {
        foods: [],
        selected_foods: [],
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


            this.$http.get('http://127.0.0.1:3000/search?search_term=' + fetch).then(response => {

                var someData = response.body;
                console.log(someData.list.item);
                nutritionApp.foods = someData.list.item;

            }, response => {
            });
        },
        selectFood: function(item) {
            this.selected_foods.push(item);
        }
    },

});



// var searchFoods = new Vue({
//     el: '#searchFoods',
//     data: {
//     },
// });



